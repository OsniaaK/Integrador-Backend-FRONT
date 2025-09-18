import React from "react";
import style from "./styledHero.module.css";
import { useNavigate } from "react-router";
import useProducts from "../../../../context/useProducts.jsx";

const HeroHome = () => {
  const navigate = useNavigate();
  const { setCategory, setSearch } = useProducts();
  const onClick = (e, category) => {
    e.preventDefault();
    setCategory(category);
    setSearch("");
    navigate("/products");
  };

  return (
    <>
      <main id={style.heroHome}>
        <article>
          <h1>Nuevos Modelos</h1>
          <p>¡Sé el primero en tener lo más nuevo en productos!</p>
        </article>
        <nav>
          <a onClick={(e) => onClick(e, "todos")}>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M18 8L22 12L18 16" />
                <path d="M2 12H22" />
              </svg>
            </span>
            Ver Novedades
          </a>
        </nav>
      </main>
    </>
  );
};

export default HeroHome;
