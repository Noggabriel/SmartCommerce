
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Sales from "./pages/Sales";
import Stock from "./pages/Stock";
import Freight from "./pages/Freight";
import "./App.css";

function App() {
  const [page, setPage] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "sales", label: "Vendas" },
    { id: "products", label: "Produtos" },
    { id: "stock", label: "Estoque" },
    { id: "freight", label: "Fretes" },
  ];

  return (
    <div>
      <header className="header">
        <div>
          <h1>SmartCommerce</h1>
          <p>Inteligência Comercial</p>
        </div>
        <span className="header-label">Painel Administrativo</span>
      </header>

      <div className="dashboard-content">
        <aside className="sidebar">
          <h2>Menu</h2>

          <nav>
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={page === item.id ? "active" : ""}
                onClick={() => setPage(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {page === "dashboard" && <Dashboard />}
        {page === "sales" && <Sales />}
        {page === "products" && <Products />}
        {page === "stock" && <Stock />}
        {page === "freight" && <Freight />}
      </div>
    </div>
  );
}

export default App;
