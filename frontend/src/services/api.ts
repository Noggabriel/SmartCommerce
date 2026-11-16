
const API_URL = "http://127.0.0.1:5000/api";

export async function getVendas() {
  const response = await fetch(`${API_URL}/vendas`);

  if (!response.ok) {
    throw new Error("Erro ao buscar vendas");
  }

  return response.json();
}

export async function getHealth() {
  const response = await fetch(`${API_URL}/health`);

  if (!response.ok) {
    throw new Error("Erro ao conectar com a API");
  }

  return response.json();
}
