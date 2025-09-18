import style from "./styledProducts.module.css";
import React, { useRef, useEffect, useState } from "react";
import useCart from "../../../../context/useCart";
import useProducts from "../../../../context/useProducts";

const PRODUCTS_PER_PAGE = 8;

const ProductsSect = () => {
  const { addItem } = useCart();
  const {
    products,
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
  } = useProducts();

  const [addedBtnId, setAddedBtnId] = useState(null);
  const [sortType, setSortType] = useState("popularity");
  const [focusedProduct, setFocusedProduct] = useState(null);
  const focusedRef = useRef(null);

  useEffect(() => {
    if (!focusedProduct) return;
    const handleClickOutside = (event) => {
      if (focusedRef.current && !focusedRef.current.contains(event.target) && !event.target.closest(`.${style.openInfo}`)) {
        setFocusedProduct(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [focusedProduct]);

  useEffect(() => {
    document.body.classList.toggle("body-blur", !!focusedProduct);
    return () => document.body.classList.remove("body-blur");
  }, [focusedProduct]);

  if (loading) {
    return <section id={style.prodsSection}><h1>Cargando productos...</h1></section>;
  }

  if (error) {
    return <section id={style.prodsSection}><h1>Error: {error}</h1></section>;
  }

  const handleAddToCart = (product) => {
    addItem(product);
    setAddedBtnId(product.id);
    setTimeout(() => setAddedBtnId(null), 1500);
  };

  const handleFilterCategory = (cat) => {
    setSearch("");
    setCategory(cat);
  };

  const getFinalPrice = (product) => product.discount ? product.price * (1 - product.discount / 100) : product.price;

  const sortProducts = (prods) => {
    const sorted = [...prods];
    switch (sortType) {
      case "asc":
        return sorted.sort((a, b) => getFinalPrice(a) - getFinalPrice(b));
      case "desc":
        return sorted.sort((a, b) => getFinalPrice(b) - getFinalPrice(a));
      case "discounts":
        return sorted.sort((a, b) => (b.discount || 0) - (a.discount || 0));
      default:
        return sorted.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }
  };

  const sortedProducts = sortProducts(products);
  const productsToShow = sortedProducts.slice(0, count);

  return (
    <section id={style.prodsSection}>
      <h1>{category === "todos" ? "Productos Populares" : `Productos de ${category}`}</h1>
      
      <form id={style.filterButtons}>
        <fieldset>
          {["Todos", "Ropa", "Calzado", "Accesorios", "Deporte"].map(cat => (
            <button
              key={cat}
              type="button"
              className={category.toLowerCase() === cat.toLowerCase() ? style.active : ""}
              onClick={() => handleFilterCategory(cat === 'Todos' ? 'todos' : cat)}
            >
              {cat}
            </button>
          ))}
        </fieldset>
        <select id={style.sortSelect} value={sortType} onChange={(e) => setSortType(e.target.value)}>
          <option value="popularity">Popularidad</option>
          <option value="discounts">Con descuento</option>
          <option value="asc">Precio: menor a mayor</option>
          <option value="desc">Precio: mayor a menor</option>
        </select>
      </form>
      
      {productsToShow.length === 0 && !loading && (
        <p className={style.noProducts}>No se encontraron productos que coincidan con tu búsqueda.</p>
      )}

      <ul>
        {productsToShow.map((product) => (
          <li key={product.id}>
            <picture>
              {product.discount && <span>-{product.discount}%</span>}
              <img src={product.image} alt={product.title} />
            </picture>
            <article>
              <h2>{product.title}</h2>
              <p>
                <span style={product.discount ? { textDecoration: "line-through" } : {}}>${product.price}</span>
                {product.discount && <strong> ${getFinalPrice(product).toFixed(2)}</strong>}
              </p>
            </article>
            <fieldset>
              <button type="button" onClick={() => handleAddToCart(product)} className={addedBtnId === product.id ? style.added : ""}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart-icon lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
              </button>
              <button type="button" className={style.openInfo} onClick={() => setFocusedProduct(product)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info-icon lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              </button>
            </fieldset>
          </li>
        ))}
      </ul>

      {focusedProduct && (
        <dialog ref={focusedRef} id={style.focusedItem} open>
          <picture><img src={focusedProduct.image} alt={focusedProduct.title} /></picture>
          <strong>
            <h3>{focusedProduct.title}</h3>
            <p>{focusedProduct.description}</p>
          </strong>
        </dialog>
      )}

      <form id={style.pagination}>
        <button type="button" onClick={previus} disabled={count <= PRODUCTS_PER_PAGE}>Mostrar menos</button>
        <button type="button" onClick={next} disabled={count >= products.length}>Mostrar más</button>
        <button type="button" onClick={all} disabled={count >= products.length}>Mostrar todo</button>
      </form>
    </section>
  );
};

export default ProductsSect;
