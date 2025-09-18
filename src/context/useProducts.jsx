import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";

const Catalog = createContext(null);
const API_URL = import.meta.env.VITE_BACKEND_API || "http://localhost:3001/api/products";

// --- INICIO DEL CAMBIO PARA DIAGNÓSTICO ---
console.log("Valor de VITE_BACKEND_API:", import.meta.env.VITE_BACKEND_API);
console.log("API_URL final que se usará:", API_URL);
// --- FIN DEL CAMBIO PARA DIAGNÓSTICO ---

export const ProductsProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(8);
  const [category, setCategory] = useState("todos");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(() => {
    setLoading(true);
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error('La respuesta de la red no fue exitosa');
        return res.json();
      })
      .then(data => {
        if (!Array.isArray(data)) throw new Error("Los datos recibidos no son un array.");
        setAllProducts(data);
        setError(null);
      })
      .catch(err => {
        console.error("Error al cargar productos:", err);
        setError("No se pudieron cargar los productos.");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = useCallback(async (productData) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error('Falló la creación del producto');
    fetchProducts();
  }, [fetchProducts]);

  const updateProduct = useCallback(async (id, productData) => {
    const response = await fetch(`${API_URL.replace('/api/products', '')}/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error('Falló la actualización del producto');
    fetchProducts();
  }, [fetchProducts]);

  const deleteProduct = useCallback(async (id) => {
    const response = await fetch(`${API_URL.replace('/api/products', '')}/api/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok && response.status !== 204) throw new Error('Falló la eliminación del producto');
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = useMemo(() => {
    if (!Array.isArray(allProducts)) return [];
    let products = [...allProducts];
    if (category !== "todos") {
      products = products.filter(product => product.category === category);
    }
    if (search.trim().length > 1) {
      products = products.filter(product =>
        (product.search || product.title || '').toLowerCase().includes(search.toLowerCase())
      );
    }
    return products;
  }, [allProducts, category, search]);

  const next = useCallback(() => setCount(current => Math.min(current + 8, filteredProducts.length)), [filteredProducts.length]);
  const previus = useCallback(() => setCount(current => Math.max(current - 8, 8)), []);
  const all = useCallback(() => setCount(filteredProducts.length), [filteredProducts.length]);

  useEffect(() => {
    setCount(8);
  }, [category, search]);

  const value = useMemo(() => ({
    products: filteredProducts,
    allProducts,
    count,
    next,
    previus,
    all,
    search,
    setSearch,
    category,
    setCategory,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
  }), [
    filteredProducts, allProducts, count, next, previus, all, search, 
    category, loading, error, addProduct, updateProduct, deleteProduct
  ]);

  return <Catalog.Provider value={value}>{children}</Catalog.Provider>;
};

const useProducts = () => {
  const context = useContext(Catalog);
  if (context === undefined) {
    throw new Error('useProducts debe ser usado dentro de un ProductsProvider');
  }
  return context;
};

export default useProducts;