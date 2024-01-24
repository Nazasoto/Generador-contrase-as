// Importaciones
import React, { useState, useEffect } from 'react';
import { FaCopy, FaSyncAlt } from 'react-icons/fa';
import TemaOscuro from './TemaOscuro';
import Swal from 'sweetalert2';
import '../App.css';

// Componente GeneradorContraseñas
const GeneradorContraseñas = () => {
  const [contraseña, setContraseña] = useState('');
  const [longitudContraseña, setLongitudContraseña] = useState(12);
  const [opciones, setOpciones] = useState({
    tipoOpcion: 'todosCaracteres', // Inicialmente seleccionada 'todosCaracteres'
    mayusculas: true,
    minusculas: true,
    numeros: true,
    simbolos: true,
  });

  // Función para generar una contraseña aleatoria
  const generarContraseña = () => {
    const caracteres = generateCharacterSet();
    let nuevaContraseña = '';

    for (let i = 0; i < longitudContraseña; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      nuevaContraseña += caracteres.charAt(indice);
    }

    setContraseña(nuevaContraseña);
  };

  // Función para generar el conjunto de caracteres basado en las opciones seleccionadas
  const generateCharacterSet = () => {
    let caracteres = '';

    if (opciones.tipoOpcion === 'facilDecir') {
      caracteres += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    } else {
      if (opciones.mayusculas) {
        caracteres += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      }
      if (opciones.minusculas) {
        caracteres += 'abcdefghijklmnopqrstuvwxyz';
      }
      if (opciones.numeros) {
        caracteres += '0123456789';
      }
      if (opciones.simbolos) {
        caracteres += '!@#$%^&*()_+';
      }
    }

    return caracteres;
  };

  // Función para copiar la contraseña al portapapeles
  const copiarContraseña = () => {
    navigator.clipboard.writeText(contraseña);
    Swal.fire('Contraseña Copiada');
  };

  // Función para manejar el cambio de tipo de opción (Radio)
  const handleTipoOpcionChange = (tipo) => {
    setOpciones({ ...opciones, tipoOpcion: tipo });
  };

  // Generar una contraseña por defecto al cargar la página
  useEffect(() => {
    generarContraseña();
  }, [longitudContraseña, opciones]);

  return(
    <TemaOscuro>
      {(toggleTema, temaOscuro) => (
        <div className='container'>
          <h2>Generador de Contraseñas</h2>

          {/* Área de personalización */}
          <div className='personalizacion'>
            <div className='opciones'>
              <h3>Personalice su contraseña</h3>
              <div className="opcion">
                <label htmlFor="longitudContraseña">Longitud de la Contraseña:</label>
                <input
                  type="number"
                  id="longitudContraseña"
                  value={longitudContraseña}
                  onChange={(e) => setLongitudContraseña(parseInt(e.target.value, 10))}
                  min="6"
                  className="inputLongitud"
                />
              </div>

              {/* Opciones de personalización (Radio) */}
              <div className="opcionRadio">
                <input
                  type="radio"
                  id="todosCaracteres"
                  checked={opciones.tipoOpcion === 'todosCaracteres'}
                  onChange={() => handleTipoOpcionChange('todosCaracteres')}
                />
                <label htmlFor="todosCaracteres">Todos los caracteres</label>
              </div>
              <div className="opcionRadio">
                <input
                  type="radio"
                  id="facilLeer"
                  checked={opciones.tipoOpcion === 'facilLeer'}
                  onChange={() => handleTipoOpcionChange('facilLeer')}
                />
                <label htmlFor="facilLeer">Fácil de leer</label>
              </div>
              <div className="opcionRadio">
                <input
                  type="radio"
                  id="facilDecir"
                  checked={opciones.tipoOpcion === 'facilDecir'}
                  onChange={() => handleTipoOpcionChange('facilDecir')}
                />
                <label htmlFor="facilDecir">Fácil de decir</label>
              </div>

              {/* Opciones de personalización (Checkbox) */}
              <div className="opcionCheckbox">
                <input
                  type="checkbox"
                  id="mayusculas"
                  checked={opciones.mayusculas}
                  onChange={() => setOpciones({ ...opciones, mayusculas: !opciones.mayusculas })}
                />
                <label htmlFor="mayusculas">Mayúsculas</label>
              </div>
              <div className="opcionCheckbox">
                <input
                  type="checkbox"
                  id="minusculas"
                  checked={opciones.minusculas}
                  onChange={() => setOpciones({ ...opciones, minusculas: !opciones.minusculas })}
                />
                <label htmlFor="minusculas">Minúsculas</label>
              </div>
              <div className="opcionCheckbox">
                <input
                  type="checkbox"
                  id="numeros"
                  checked={opciones.numeros}
                  onChange={() => setOpciones({ ...opciones, numeros: !opciones.numeros })}
                />
                <label htmlFor="numeros">Números</label>
              </div>
              <div className="opcionCheckbox">
                <input
                  type="checkbox"
                  id="simbolos"
                  checked={opciones.simbolos}
                  onChange={() => setOpciones({ ...opciones, simbolos: !opciones.simbolos })}
                />
                <label htmlFor="simbolos">Símbolos</label>
              </div>
            </div>

            {/* Línea separadora */}
            <div className="separador"></div>

            {/* Contraseña generada */}
            <div className="contraseña-generada">
              <h3>Contraseña generada</h3>
              <p className="etiquetaP" style={{ opacity: contraseña ? 1 : 0 }}>
            {contraseña}
              <span style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={copiarContraseña}>
        <FaCopy title="Copiar contraseña" />
            </span>
            </p>
            </div>
          </div>

          {/* Botones de generación y cambio de tema */}
          <button onClick={generarContraseña}>
            Generar Contraseña <FaSyncAlt style={{ marginLeft: '5px' }} />
          </button>
          <button onClick={toggleTema} id="temaOscuroBoton" className={temaOscuro ? 'temaOscuro' : 'temaClaro'}>
            {temaOscuro ? 'Tema Claro' : 'Tema Oscuro'}
          </button>
        </div>
      )}
    </TemaOscuro>
  );
};

export default GeneradorContraseñas;
