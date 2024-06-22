import React, { useState } from 'react';
import axios from 'axios';
import './react-contacto.css'; 

function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formError, setFormError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.fullName && formData.email && formData.subject && formData.message) {
      try {
        await axios.post('https://jsonplaceholder.typicode.com/posts', formData);
        setFormSubmitted(true);
        setFormData({
          fullName: '',
          email: '',
          subject: '',
          message: ''
        });
        setFormError(''); // Limpiar cualquier mensaje de error anterior
      } catch (error) {
        setFormError('Hubo un problema al enviar el formulario. Inténtelo más tarde.');
      }
    } else {
      setFormError('Por favor complete todos los campos.');
    }
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Formulario de Contacto</h1>
      {formError && <p className="error-message">{formError}</p>}
      {formSubmitted ? (
        <p className="success-message">El mensaje fue enviado sin problemas.</p>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="fullName">Nombre Completo:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Asunto:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Mensaje:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="form-control"
              rows="5"
              required
            />
          </div>
          <button type="submit" className="submit-btn">Enviar Mensaje</button>
        </form>
      )}
    </div>
  );
}

export default App;
// funciona
