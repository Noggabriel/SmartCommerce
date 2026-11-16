
import { useState } from "react";

function FreightQuote() {
  const [cep, setCep] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function calculateFreight() {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/frete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cep_destino: cep,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.erro || "Erro ao consultar frete");
      }

      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao consultar frete"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="freight-quote">
      <h2>Cotação de Frete</h2>
      <p>Consulte opções de entrega para seus clientes.</p>

      <div className="freight-form">
        <input
          type="text"
          placeholder="Digite o CEP de destino"
          value={cep}
          onChange={(event) => setCep(event.target.value)}
          maxLength={9}
        />

        <button
          onClick={calculateFreight}
          disabled={loading || cep.replace(/\D/g, "").length !== 8}
        >
          {loading ? "Consultando..." : "Consultar Frete"}
        </button>
      </div>

      {error && <p className="freight-error">{error}</p>}

      {result && (
        <div className="freight-results">
          <h3>Opções de entrega</h3>

          {(result.ShippingSevicesArray || []).map(
            (service: any, index: number) => (
              <div className="freight-option" key={index}>
                <strong>{service.ServiceDescription}</strong>
                <span>
                  {Number(service.ShippingPrice).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
                <p>Prazo: {service.DeliveryTime} dias</p>
              </div>
            )
          )}
        </div>
      )}
    </section>
  );
}

export default FreightQuote;
