import React, { useEffect, useState } from "react"; // Importa React y los hooks useEffect y useState
import "./styles.css"; // Importa los estilos CSS
import { useNavigate, useParams } from "react-router-dom"; // Importa useNavigate para la navegación y useParams para obtener parámetros de la URL

// Función asíncrona para obtener un juego por su ID desde la API
const getPetByID = async (id) => {
  const petFetch = await fetch(`http://localhost:3005/api/pets/${id}`); // Realiza una solicitud fetch con el ID del juego
  const pet = await petFetch.json(); // Convierte la respuesta a formato JSON
  return pet; // Retorna el juego obtenido
};

// Componente Details para mostrar los detalles de un juego
const Details = () => {
  const [pet, setPets] = useState(); // Estado para almacenar el juego que se obtiene de la API
  const { id } = useParams(); // Obtiene el parámetro 'id' desde la URL
  const navigate = useNavigate(); // Hook para redirigir al usuario

  // useEffect que se ejecuta al cargar el componente o cuando cambia el id
  useEffect(() => {
    getPetByID(id).then((pet) => setPets(pet[0])); // Llama a getGameByID y actualiza el estado con el primer juego obtenido
  }, [id]); // El efecto se ejecuta cada vez que cambia el id

  return (
    <div className="container">
      <h1>Detalle</h1> {/* Título de la página de detalles */}
      {pet && ( // Renderiza los detalles del juego si el estado 'game' no está vacío
        <div>
          <div className="detail">
            <span className="detail-title">Nombre: </span>
            <span className="detail-content">{pet.name}</span>{" "}
            {/* Muestra el título del juego */}
          </div>
          <div className="detail">
            <span className="detail-title">Descripción: </span>
            <span className="detail-content">{pet.description}</span>{" "}
            {/* Muestra la descripción del juego */}
          </div>
          <div className="detail">
            <span className="detail-title">Cantidad jugadores: </span>
            <span className="detail-content">{pet.type}</span>{" "}
            {/* Muestra la cantidad de jugadores */}
          </div>
          <div className="detail">
            <span className="detail-title">Categoría: </span>
            <span className="detail-content">{pet.characteristics}</span>{" "}
            {/* Muestra la categoría del juego */}
          </div>
        </div>
      )}
      {/* Botón para volver a la página anterior */}
      <button onClick={() => navigate(-1)} className="back-button">
        Volver {/* Texto del botón */}
      </button>
    </div>
  );
};

export default Details; // Exporta el componente Details como predeterminado
