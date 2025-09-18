import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App.jsx";
import "./index.css";
import { CartProvider } from "./context/useCart.jsx";
import { ProductsProvider } from "./context/useProducts.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductsProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ProductsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
