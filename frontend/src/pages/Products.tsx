
import { useEffect, useState } from "react";

interface Product {
  id_produto: number;
  nome: string;
  categoria: string;
  preco: number;
  estoque: number;
  estoque_minimo: number;
}

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/produtos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar produtos");
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch(() => setError("Não foi possível carregar os produtos."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="main-content">
      <h2>Produtos</h2>
      <p>Consulte os produtos e acompanhe seu estoque.</p>

      {loading ? (
        <p>Carregando produtos...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="sales-table">
          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Categoria</th>
                <th>Preço</th>
                <th>Estoque</th>
                <th>Situação</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id_produto}>
                  <td>{product.nome}</td>
                  <td>{product.categoria}</td>
                  <td>
                    {Number(product.preco).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td>{product.estoque}</td>
                  <td>
                    {product.estoque <= product.estoque_minimo
                      ? "Estoque baixo"
                      : "Disponível"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && <p>Nenhum produto encontrado.</p>}
        </div>
      )}
    </main>
  );
}

export default Products;
