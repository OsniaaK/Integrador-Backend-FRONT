import styled from "./styledHeroAbout.module.css";

const About = () => {
  return (
    <section
      id={styled.heroAboutSection}
      aria-labelledby={styled.heroAboutTitle}
      className={styled.heroAboutSection}
    >
      <header>
        <h1 id={styled.heroAboutTitle} className={styled.heroAboutTitle}>
          ¿Quiénes somos?
        </h1>
        <p>
          Somos una tienda dedicada a ofrecerte la mejor selección de calzado,
          indumentaria deportiva, urbana y accesorios. Trabajamos con las marcas
          más reconocidas y nos esforzamos por brindarte una experiencia de
          compra cómoda, segura y personalizada.
        </p>
      </header>
      <figure>
        <a href="https://instagram.com/laugsuarezz" target="_blank">
          <img
            src="/assets/About/CEOIG.jpeg"
            alt="Equipo de la empresa"
            className={styled.heroAboutImg}
          />
        </a>
        <figcaption className={styled.heroAboutFigcaption}>
          CEO: @Laugsuarezz
        </figcaption>
      </figure>
      <aside className={styled.heroAboutAside}>
        <h2 className={styled.heroAboutSubtitle}>Nuestro trabajo</h2>
        <p>
          Nos apasiona la moda y el deporte. Por eso, seleccionamos
          cuidadosamente cada producto para que encuentres calidad, estilo y
          comodidad en un solo lugar. Nuestro equipo está siempre listo para
          asesorarte y ayudarte a encontrar lo que buscás.
        </p>
        <ul>
          <li>Calzado para todas las edades</li>
          <li>Ropa deportiva y urbana</li>
          <li>Accesorios exclusivos</li>
          <li>Atención personalizada</li>
          <li>Envíos rápidos y seguros</li>
        </ul>
      </aside>
      <footer>
        <small className={styled.heroAboutFooter}>
          ¡Gracias por confiar en nosotros para acompañar tu estilo y tus
          actividades!
        </small>
      </footer>
    </section>
  );
};

export default About;
