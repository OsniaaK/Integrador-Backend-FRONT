import React, { useState, useEffect } from 'react';
import style from './ProductForm.module.css';

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Ropa',
    description: '',
    image: '',
    discount: 0,
  });
  const [imageType, setImageType] = useState('url');
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (product) {
      const initialData = {
        name: product.title || '',
        price: product.price || '',
        category: product.category || 'Ropa',
        description: product.description || '',
        image: product.image || '',
        discount: product.discount || 0,
      };
      setFormData(initialData);
      setImagePreview(initialData.image);
    }
  }, [product]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, image: value }));
    setImagePreview(value);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      discount: parseInt(formData.discount, 10) || 0,
    };
    onSubmit(dataToSubmit);
  };

  return (
    <div className={style.modalBackdrop} onClick={onCancel}>
      <div className={style.modalContent} onClick={e => e.stopPropagation()}>
        <h2>{product ? 'Editar Producto' : 'Añadir Producto'}</h2>
        <form onSubmit={handleSubmit}>
          <div className={style.formGrid}>
            <div className={style.formGroup}>
              <label>Nombre:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className={style.formGroup}>
              <label>Precio:</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} required step="0.01" />
            </div>
            <div className={style.formGroup}>
              <label>Categoría:</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                <option value="Ropa">Ropa</option>
                <option value="Calzado">Calzado</option>
                <option value="Accesorios">Accesorios</option>
                <option value="Deporte">Deporte</option>
              </select>
            </div>
            <div className={style.formGroup}>
              <label>Descuento (%):</label>
              <input type="number" name="discount" value={formData.discount} onChange={handleChange} />
            </div>
          </div>

          <div className={style.formGroup}>
            <label>Descripción:</label>
            <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
          </div>

          <div className={style.formGroup}>
            <label>Imagen:</label>
            <div className={style.imageTypeSelector}>
              <label><input type="radio" name="imageType" value="url" checked={imageType === 'url'} onChange={() => setImageType('url')} /> URL</label>
              <label><input type="radio" name="imageType" value="file" checked={imageType === 'file'} onChange={() => setImageType('file')} /> Archivo</label>
            </div>
            {imageType === 'url' ? (
              <input type="text" placeholder="https://ejemplo.com/imagen.jpg" value={formData.image} onChange={handleUrlChange} />
            ) : (
              <input type="file" accept="image/*" onChange={handleFileChange} />
            )}
            {imagePreview && <img src={imagePreview} alt="Vista previa" className={style.imagePreview} />}
          </div>
          
          <div className={style.buttons}>
            <button type="button" onClick={onCancel} className={style.cancelButton}>Cancelar</button>
            <button type="submit" className={style.saveButton}>Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;