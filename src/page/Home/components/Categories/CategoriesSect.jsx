import React from "react";
import style from "./styledCategories.module.css";
import useProducts from "../../../../context/useProducts.jsx";
import {useNavigate} from "react-router"
const CategoriesSection = () => {
  const { category, setCategory , setSearch} = useProducts();
  const navigate = useNavigate()
  const onClick = (category) => {
    setCategory(category)
    setSearch("")
    navigate("/products")
  }
  return (
    <>
      <section id={style.categoriesSection}>
        <article>
          <h1>Categorias Destacadas</h1>
          <a onClick={() => onClick("todos")}>Ver todas</a>
        </article>
        <ul>
          <li onClick={ () => onClick("Ropa") }>
            <figure>
              <img src="/assets/Categories/clothes.webp" alt="clothes" />
            </figure>
            <figcaption>Ropa</figcaption>
          </li>
          <li onClick={ () => onClick("Calzado")}>
            <figure>
              <img src="/assets/Categories/shoes.webp" alt="shoes" />
            </figure>
            <figcaption>Calzado</figcaption>
          </li>
          <li onClick={ () => onClick("Accesorios")}>
            <figure>
              <img src="/assets/Categories/accesories.webp" alt="accessories" />
            </figure>
            <figcaption>Accesorios</figcaption>
          </li>
          <li onClick={ () => onClick("Deporte")}>
            <figure>
              <img src="/assets/Categories/sports.webp" alt="sports" />
            </figure>
            <figcaption>Deporte</figcaption>
          </li>
        </ul>
      </section>
    </>
  );
};

export default CategoriesSection;
