
import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import SalesTable from "../components/SalesTable";
import FreightQuote from "../components/FreightQuote";
import { getVendas } from "../services/api";

interface Sale {
  id_venda: number;
  id_produto: number;
  nome_produto: string;
  quantidade: number;
  valor_total: number;
}

function Dashboard() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getVendas()
      .then((data) => setSales(data))
      .catch(() => setError("Não foi possível carregar as vendas."))
      .finally(() => setLoading(false));
  }, []);

  const totalVendas = sales.reduce(
    (total, sale) => total + Number(sale.valor_total), 0
  );

  const totalProdutos = sales.reduce(
    (total, sale) => total + Number(sale.quantidade), 0
  );

  return (
    <main className="main-content">
      <h2>Dashboard</h2>
      <p>Visão geral do seu comércio</p>

      {loading ? (
        <p>Carregando dados...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <div className="stats-container">
            <StatCard
              title="Total de vendas"
              value={totalVendas.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
              description="Valor total vendido"
            />

            <StatCard
              title="Pedidos"
              value={String(sales.length)}
              description="Vendas registradas"
            />

            <StatCard
              title="Produtos vendidos"
              value={String(totalProdutos)}
              description="Unidades comercializadas"
            />
          </div>

          <SalesTable sales={sales} />
          <FreightQuote />
        </>
      )}
    </main>
  );
}

export default Dashboard;
