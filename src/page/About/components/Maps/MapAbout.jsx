import styles from "./styledMap.module.css";

const MapAbout = () => {
  return (
    <section
      className={styles.mapAboutSection}
      aria-labelledby="ubicacion-titulo"
    >
      <header className={styles.mapAboutHeader}>
        <h2 id="ubicacion-titulo" className={styles.mapAboutTitle}>
          ¿Dónde encontrarnos?
        </h2>
        <p className={styles.mapAboutDesc}>
          Nuestra tienda física está ubicada en el corazón de la ciudad, para
          que puedas ver, probar y elegir tus productos favoritos con la mejor
          atención. ¡Te esperamos para que vivas la experiencia completa!
        </p>
      </header>
      <div className={styles.mapAboutContent}>
        <div className={styles.mapAboutEmbed}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26262.13646494181!2d-58.47821438619591!3d-34.63532645778999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc9801c92ef47%3A0xc93f0b1dc41d41ee!2sFlores%2C%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1749442115055!5m2!1ses!2sar"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <aside className={styles.mapAboutInfo}>
          <h3 className={styles.mapAboutSubtitle}>Datos de contacto</h3>
          <ul>
            <li>
              <strong>Dirección:</strong> Av. Principal 1234, Centro, Ciudad
            </li>
            <li>
              <strong>Teléfono:</strong> (011) 1234-5678
            </li>
            <li>
              <strong>Email:</strong> contacto@tiendafalsa.com
            </li>
            <li>
              <strong>Horarios:</strong> Lunes a Sábado de 10 a 20 hs
            </li>
          </ul>
        </aside>
      </div>
      <footer className={styles.mapAboutFooter}>
        <small>¡Visítanos y descubrí todo lo que tenemos para vos!</small>
      </footer>
    </section>
  );
};

export default MapAbout;
