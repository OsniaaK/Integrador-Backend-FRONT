import styled from "./styledFormC.module.css";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'El nombre es muy corto')
    .max(50, 'El nombre es muy largo')
    .required('El nombre es requerido'),
  lastName: Yup.string()
    .min(2, 'El apellido es muy corto')
    .max(50, 'El apellido es muy largo')
    .required('El apellido es requerido'),
  email: Yup.string()
    .email('Email inválido')
    .required('El email es requerido'),
  subject: Yup.string()
    .min(5, 'El asunto es muy corto')
    .required('El asunto es requerido')
});

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('Formulario enviado:', values);
    setSubmitting(false);
    resetForm();
    toast.success('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.', {
      duration: 4000,
      position: 'bottom-left',
      style: {
        background: '#333',
        color: '#fff',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
      }
    });
  };

  return (
    <main className={styled.contactMain}>
      <Toaster />
      <header className={styled.contactHeader}>
        <h1 className={styled.contactTitle}>Contacto</h1>
        <p className={styled.contactIntro}>
          ¿Aún tenés dudas, sugerencias o querés hacer un pedido especial? Completá el formulario y nuestro equipo te responderá a la brevedad.
        </p>
      </header>
      <section className={styled.contactSection} aria-label="Formulario de contacto">
        <Formik
          initialValues={{
            name: '',
            lastName: '',
            email: '',
            subject: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className={styled.contactForm} autoComplete="off">
              <div className={styled.formGroup}>
                <label className={styled.contactLabel}>
                  Nombre
                  <Field
                    type="text"
                    name="name"
                    className={`${styled.contactInput} ${errors.name && touched.name ? styled.errorInput : ''}`}
                    placeholder="Tu nombre"
                  />
                  <ErrorMessage name="name" component="div" className={styled.errorMessage} />
                </label>
              </div>
              
              <div className={styled.formGroup}>
                <label className={styled.contactLabel}>
                  Apellido
                  <Field
                    type="text"
                    name="lastName"
                    className={`${styled.contactInput} ${errors.lastName && touched.lastName ? styled.errorInput : ''}`}
                    placeholder="Tu apellido"
                  />
                  <ErrorMessage name="lastName" component="div" className={styled.errorMessage} />
                </label>
              </div>
              
              <div className={styled.formGroup}>
                <label className={styled.contactLabel}>
                  Email
                  <Field
                    type="email"
                    name="email"
                    className={`${styled.contactInput} ${errors.email && touched.email ? styled.errorInput : ''}`}
                    placeholder="tu@email.com"
                    autoComplete="email"
                  />
                  <ErrorMessage name="email" component="div" className={styled.errorMessage} />
                </label>
              </div>
              
              <div className={styled.formGroup}>
                <label className={styled.contactLabel}>
                  Asunto
                  <Field
                    as="textarea"
                    name="subject"
                    className={`${styled.contactTextarea} ${errors.subject && touched.subject ? styled.errorInput : ''}`}
                    rows="5"
                    placeholder="Escribí el asunto de tu mensaje..."
                  />
                  <ErrorMessage name="subject" component="div" className={styled.errorMessage} />
                </label>
              </div>
              
              <button 
                type="submit" 
                className={styled.contactButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
              </button>
              
            </Form>
          )}
        </Formik>
      </section>
      <aside className={styled.contactBgEffect} aria-hidden="true"></aside>
    </main>
  );
};

export default ContactForm;