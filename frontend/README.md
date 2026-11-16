# SmartCommerce – Inteligência Comercial

Sistema de inteligência comercial desenvolvido para pequenos e médios comércios, com o objetivo de centralizar informações de vendas, produtos, estoque e fretes por meio da integração de diferentes fontes de dados.

## 1. Sobre o projeto

Pequenos e médios comércios frequentemente utilizam diferentes sistemas para controlar seus produtos, vendas e estoques. Essa separação dificulta a análise das informações e a tomada de decisões.

O **SmartCommerce** foi desenvolvido para integrar essas informações em uma única aplicação, permitindo que o comerciante visualize dados consolidados e acompanhe indicadores importantes para a gestão do negócio.

## 2. Objetivos

- Centralizar informações comerciais de diferentes fontes.
- Integrar dados de produtos e vendas.
- Facilitar o acompanhamento do estoque.
- Apresentar indicadores comerciais em um dashboard.
- Consultar opções e valores de frete por meio de uma API externa.

## 3. Tecnologias utilizadas

| Tecnologia | Utilização |
|---|---|
| Python | Desenvolvimento do backend |
| Flask | Criação da API REST |
| React | Desenvolvimento da interface |
| TypeScript | Tipagem e organização do frontend |
| MySQL | Armazenamento de produtos e estoque |
| PostgreSQL | Armazenamento de vendas |
| MongoDB Atlas | Armazenamento dos dados consolidados e cotações |
| Apache Hop | Integração e processamento dos dados (ETL) |
| Frenet API | Consulta de cotações de frete |
| Vite | Ambiente de desenvolvimento do frontend |

## 4. Arquitetura da solução

O SmartCommerce utiliza diferentes tecnologias de armazenamento e integração para reunir informações comerciais.

### Fluxo de integração

1. Os produtos e informações de estoque são armazenados no MySQL.
2. As vendas são armazenadas no PostgreSQL.
3. O Apache Hop realiza a extração dos dados das duas fontes.
4. Os dados são relacionados pelo identificador do produto.
5. As informações consolidadas são armazenadas no MongoDB Atlas.
6. O backend desenvolvido em Python e Flask disponibiliza os dados por meio de uma API REST.
7. O frontend em React e TypeScript consome a API e apresenta as informações ao usuário.
8. A API da Frenet é utilizada para consultar cotações de frete.

## 5. Funcionalidades

### Dashboard
Apresenta indicadores gerais do comércio, incluindo informações sobre vendas e produtos.

### Vendas
Exibe os registros de vendas consolidados, incluindo produtos, quantidades e valores.

### Produtos
Apresenta os produtos cadastrados, suas categorias e preços.

### Estoque
Permite acompanhar as quantidades disponíveis e identificar produtos que atingiram ou estão abaixo do estoque mínimo.

### Fretes
Permite informar um CEP de destino e consultar opções de envio, valores e prazos por meio da API da Frenet.

## 6. Estrutura do projeto

```text
SmartCommerce/
│
├── backend/
│   ├── app.py
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── index.html
│
├── integration/
│   ├── pipelines/
│   └── workflows/
│
├── database/
│   ├── mysql/
│   └── postgresql/
│
└── documentation/
```

## 7. Como executar o projeto

### Pré-requisitos

- Python instalado.
- Node.js e npm instalados.
- MySQL configurado.
- PostgreSQL configurado.
- Conta e cluster no MongoDB Atlas.
- Apache Hop instalado.

### 7.1. Backend

Abra um terminal e acesse a pasta do backend:

```bash
cd backend
```

Crie e ative um ambiente virtual, caso ainda não exista:

```bash
python -m venv venv
```

No Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

Instale as dependências:

```bash
pip install flask flask-cors pymongo python-dotenv requests
```

Configure as variáveis de ambiente no arquivo `.env`:

```env
MONGO_URI=sua_string_de_conexao
MONGO_DATABASE=smartcommerce_analytics
FRENET_TOKEN=seu_token_da_frenet
```

Inicie o backend:

```bash
python app.py
```

A API estará disponível em:

```text
http://127.0.0.1:5000
```

### 7.2. Frontend

Em outro terminal, acesse a pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Inicie a aplicação:

```bash
npm run dev
```

A interface estará disponível em:

```text
http://localhost:5173
```

### 7.3. Integração de dados

Abra o Apache Hop, carregue o pipeline `etl_smartcommerce.hpl` e