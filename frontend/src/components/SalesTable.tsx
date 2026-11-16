
interface Sale {
  id_venda?: number;
  id_produto: number;
  nome_produto: string;
  quantidade: number;
  valor_total: number;
}

interface SalesTableProps {
  sales: Sale[];
}

function SalesTable({ sales }: SalesTableProps) {
  return (
    <div className="sales-table">
      <h2>Vendas recentes</h2>

      <table>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Valor total</th>
          </tr>
        </thead>

        <tbody>
          {sales.map((sale, index) => (
            <tr key={sale.id_venda ?? index}>
              <td>{sale.nome_produto}</td>
              <td>{sale.quantidade}</td>
              <td>
                {Number(sale.valor_total).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {sales.length === 0 && <p>Nenhuma venda encontrada.</p>}
    </div>
  );
}

export default SalesTable;
