# Proyecto Integrador Backend - FRONT (E-commerce)

Este es el Frontend de la aplicación LAMM, desarrollado con **React** y **Vite**. La aplicación ofrece una experiencia de compra completa, desde la visualización de productos hasta un panel de administración funcional.

## Características Principales

*   **Catálogo de Productos**: Visualización de productos con filtros por categoría y sistema de búsqueda.
*   **Paginación Dinámica**: Carga de productos por lotes para una mejor performance.
*   **Carrito de Compras**: Funcionalidad completa para añadir, eliminar y gestionar la cantidad de productos en el carrito, con persistencia en `localStorage`.
*   **Panel de Administración**: Una ruta `/admin` que permite:
    *   Ver todos los productos en una tabla.
    *   Crear nuevos productos.
    *   Editar productos existentes.
    *   Eliminar productos.
*   **Diseño Responsivo**: Interfaz adaptada para una correcta visualización en dispositivos móviles y de escritorio.

## Tecnologías Utilizadas

*   **React**: Para la construcción de la interfaz de usuario.
*   **Vite**: Como herramienta de desarrollo y empaquetado de alta velocidad.
*   **React Router**: Para la gestión de rutas en la aplicación.
*   **Context API**: Para el manejo de estados globales (productos y carrito).
*   **CSS Modules**: Para estilos encapsulados y específicos por componente.