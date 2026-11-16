
import { useEffect, useState } from "react";

interface Product {
  id_produto: number;
  nome: string;
  categoria: string;
  estoque: number;
  estoque_minimo: number;
}

function Stock() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/produtos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar estoque");
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch(() => setError("Não foi possível carregar o estoque."))
      .finally(() => setLoading(false));
  }, []);

  const totalEstoque = products.reduce(
    (total, product) => total + Number(product.estoque),
    0
  );

  const estoqueBaixo = products.filter(
    (product) => product.estoque <= product.estoque_minimo
  ).length;

  return (
    <main className="main-content">
      <h2>Controle de Estoque</h2>
      <p>Acompanhe os níveis de estoque dos seus produtos.</p>

      {loading ? (
        <p>Carregando estoque...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <div className="stats-container">
            <div className="stat-card">
              <h3>Total em estoque</h3>
              <strong>{totalEstoque}</strong>
              <p>Unidades disponíveis</p>
            </div>

            <div className="stat-card">
              <h3>Produtos com estoque baixo</h3>
              <strong>{estoqueBaixo}</strong>
              <p>Precisam de reposição</p>
            </div>
          </div>

          <div className="sales-table">
            <h2>Situação do estoque</h2>

            <table>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Categoria</th>
                  <th>Quantidade</th>
                  <th>Estoque mínimo</th>
                  <th>Situação</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => {
                  const baixo =
                    product.estoque <= product.estoque_minimo;

                  return (
                    <tr key={product.id_produto}>
                      <td>{product.nome}</td>
                      <td>{product.categoria}</td>
                      <td>{product.estoque}</td>
                      <td>{product.estoque_minimo}</td>
                      <td>
                        <span className={baixo ? "stock-low" : "stock-ok"}>
                          {baixo ? "Estoque baixo" : "Disponível"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </main>
  );
}

export default Stock;
