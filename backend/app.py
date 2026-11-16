import requests
from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
from flask import request
from datetime import datetime, timezone
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

mongo_uri = os.getenv("MONGO_URI")
database_name = os.getenv("MONGO_DATABASE")

client = MongoClient(mongo_uri)
db = client[database_name]


@app.route("/api/health", methods=["GET"])
def health():
    try:
        client.admin.command("ping")
        return jsonify({
            "status": "ok",
            "database": "connected"
        })
    except Exception as error:
        return jsonify({"error": str(error)}), 500


@app.route("/api/vendas", methods=["GET"])
def vendas():
    documentos = list(
        db.vendas_consolidadas.find({}, {"_id": 0})
    )
    return jsonify(documentos)


@app.route("/api/produtos", methods=["GET"])
def produtos():
    pipeline = [
        {
            "$group": {
                "_id": "$id_produto",
                "nome": {"$first": "$nome_produto"},
                "categoria": {"$first": "$categoria"},
                "preco": {"$first": "$preco_produto"},
                "estoque": {"$first": "$quantidade_estoque"},
                "estoque_minimo": {"$first": "$estoque_minimo"}
            }
        },
        {
            "$project": {
                "_id": 0,
                "id_produto": "$_id",
                "nome": 1,
                "categoria": 1,
                "preco": 1,
                "estoque": 1,
                "estoque_minimo": 1
            }
        },
        {"$sort": {"id_produto": 1}}
    ]

    documentos = list(
        db.vendas_consolidadas.aggregate(pipeline)
    )

    return jsonify(documentos)

@app.route("/api/frete", methods=["POST"])
def calcular_frete():
    try:
        token = os.getenv("FRENET_TOKEN")

        if not token:
            return jsonify({"erro": "Token Frenet não configurado"}), 500

        dados = request.get_json() or {}
        cep_destino = "".join(
            c for c in str(dados.get("cep_destino", ""))
            if c.isdigit()
        )

        if len(cep_destino) != 8:
            return jsonify({"erro": "Informe um CEP válido"}), 400

        url = "https://api.frenet.com.br/shipping/quote"

        payload = {
            "SellerCEP": "13711250",
            "RecipientCEP": cep_destino,
            "ShipmentInvoiceValue": 3500.00,
            "RecipientCountry": "BR",
            "ShippingItemArray": [
                {
                    "Weight": 1,
                    "Height": 10,
                    "Width": 20,
                    "Length": 30,
                    "Quantity": 1
                }
            ]
        }

        headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "token": token
        }

        resposta = requests.post(
            url,
            json=payload,
            headers=headers,
            timeout=30
        )

        resposta.raise_for_status()
        resultado = resposta.json()

        registro = {
            "cep_origem": "13711250",
            "cep_destino": cep_destino,
            "produto": "Notebook",
            "valor_produto": 3500.00,
            "resultado": resultado,
            "data_consulta": datetime.now(timezone.utc)
        }

        db.cotacoes_frete.insert_one(registro)

        return jsonify(resultado)

    except requests.exceptions.RequestException as error:
        return jsonify({
            "erro": "Falha ao consultar a Frenet",
            "detalhes": str(error)
        }), 502

    except Exception as error:
        return jsonify({"erro": str(error)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
