import React, { useState, useEffect } from 'react';
import '../App.css'; // Importa el archivo CSS

const TemaOscuro = ({ children }) => {
  const [temaOscuro, setTemaOscuro] = useState(false);

  const toggleTema = () => {
    setTemaOscuro(!temaOscuro);
  };

  useEffect(() => {
    // Aplicar estilos al cuerpo del documento cuando el tema cambia
    document.body.style.backgroundColor = temaOscuro ? '#1a1a1a' : '#fff';
    document.body.style.color = temaOscuro ? '#fff' : '#333';
  }, [temaOscuro]);

  return (
    <div style={{ position: 'relative' }}>
      {children(toggleTema, temaOscuro)}
      <button
        id="temaOscuroBoton"
        className={temaOscuro ? 'temaOscuro' : 'temaClaro'}
        onClick={toggleTema}
      >
        {temaOscuro ? 'Tema Claro' : 'Tema Oscuro'}
      </button>
    </div>
  );
};

export default TemaOscuro;

