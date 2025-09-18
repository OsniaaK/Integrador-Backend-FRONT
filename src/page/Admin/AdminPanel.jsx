import React, { useState } from 'react';
import useProducts from '../../context/useProducts';
import ProductForm from './components/ProductForm';
import style from './AdminPanel.module.css';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  const { allProducts, addProduct, updateProduct, deleteProduct, loading } = useProducts();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleOpenForm = (product = null) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setEditingProduct(null);
    setIsFormOpen(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await deleteProduct(id);
        alert('Producto eliminado con éxito');
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleFormSubmit = async (productData) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        alert('Producto actualizado con éxito');
      } else {
        await addProduct(productData);
        alert('Producto añadido con éxito');
      }
      handleCloseForm();
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) return <div className={style.adminPanel}><p>Cargando panel de administración...</p></div>;

  return (
    <div className={style.adminPanel}>
      <header className={style.header}>
        <h1>Panel de Administración</h1>
        <Link to="/" className={style.backLink}>Volver a la tienda</Link>
      </header>
      <button onClick={() => handleOpenForm()} className={style.addButton}>Añadir Nuevo Producto</button>
      
      <div className={style.tableContainer}>
        <table className={style.productTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map(product => (
              <tr key={product.id}>
                <td data-label="ID">{product.id}</td>
                <td data-label="Nombre">{product.title}</td>
                <td data-label="Categoría">{product.category}</td>
                <td data-label="Precio">${product.price}</td>
                <td data-label="Acciones" className={style.actions}>
                  <button onClick={() => handleOpenForm(product)} className={style.editButton}>Editar</button>
                  <button onClick={() => handleDelete(product.id)} className={style.deleteButton}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isFormOpen && (
        <ProductForm
          product={editingProduct}
          onSubmit={handleFormSubmit}
          onCancel={handleCloseForm}
        />
      )}
    </div>
  );
};

export default AdminPanel;