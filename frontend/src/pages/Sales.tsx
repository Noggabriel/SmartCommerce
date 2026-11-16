
import { useEffect, useState } from "react";
import SalesTable from "../components/SalesTable";
import { getVendas } from "../services/api";

interface Sale {
  id_venda: number;
  id_produto: number;
  nome_produto: string;
  quantidade: number;
  valor_total: number;
}

function Sales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getVendas()
      .then(setSales)
      .catch(() => setError("Erro ao carregar vendas."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="main-content">
      <h2>Vendas</h2>
      <p>Histórico de vendas registradas no sistema.</p>

      {loading ? (
        <p>Carregando vendas...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <SalesTable sales={sales} />
      )}
    </main>
  );
}

export default Sales;
