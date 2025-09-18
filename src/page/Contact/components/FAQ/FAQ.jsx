import style from "./styledFAQ.module.css";

const FAQ = () => (
  <main className={style.faqMain}>
    <header className={style.faqHeader}>
      <h1 className={style.faqTitle}>Preguntas Frecuentes</h1>
      <p className={style.faqIntro}>
        ¿Tenés dudas? Acá respondemos las consultas más comunes sobre envíos,
        cambios, pagos y mucho más. Si tu pregunta no está aquí, ¡contactanos!
      </p>
    </header>
    <section className={style.faqSection} aria-label="Preguntas frecuentes">
      <dl className={style.faqList}>
        <dt className={style.faqQuestion}>¿Cuáles son los métodos de pago?</dt>
        <dd className={style.faqAnswer}>
          Aceptamos tarjetas de crédito, débito, transferencias bancarias y
          pagos en efectivo a través de Rapipago y Pago Fácil.
        </dd>

        <dt className={style.faqQuestion}>¿Realizan envíos a todo el país?</dt>
        <dd className={style.faqAnswer}>
          Sí, enviamos a todo el país mediante correo certificado. El costo y
          tiempo de entrega varían según la localidad.
        </dd>

        <dt className={style.faqQuestion}>
          ¿Puedo cambiar o devolver un producto?
        </dt>
        <dd className={style.faqAnswer}>
          Sí, tenés hasta 15 días para realizar cambios o devoluciones. El
          producto debe estar en perfectas condiciones y con su packaging
          original.
        </dd>

        <dt className={style.faqQuestion}>
          ¿Cómo sé si mi compra fue confirmada?
        </dt>
        <dd className={style.faqAnswer}>
          Te enviaremos un email de confirmación apenas se procese tu compra. Si
          no lo recibís, revisá tu carpeta de spam o contactanos.
        </dd>

        <dt className={style.faqQuestion}>
          ¿Qué hago si el producto tiene un defecto?
        </dt>
        <dd className={style.faqAnswer}>
          Comunicate con nuestro equipo de atención al cliente y te ayudaremos a
          gestionar el cambio o devolución sin costo.
        </dd>
      </dl>
    </section>
    <footer className={style.faqFooter}>
      <small>
        ¿No encontraste tu respuesta? Completa el formulario de debajo o escribinos a:{" "}
        <a href="mailto:contacto@tiendafalsa.com" className={style.faqMail}>
          contacto@tiendafalsa.com
        </a>
      </small>
    </footer>
    <aside className={style.faqBgEffect} aria-hidden="true"></aside>
  </main>
);

export default FAQ;
