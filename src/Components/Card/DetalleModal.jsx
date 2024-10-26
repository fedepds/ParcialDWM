import React, { useEffect, useState } from "react"; // Importa React y los hooks useEffect y useState
import "./styles.css"; // Importa los estilos CSS
import "./DetalleModal.css"; // Importa los estilos específicos del modal
import { useParams } from "react-router-dom"; // Importa useParams para obtener parámetros de la URL

// Función asíncrona para obtener una mascota por su ID desde la API
const getPetByID = async (id) => {
  const petFetch = await fetch(`http://localhost:3005/api/pets/${id}`); // Realiza una solicitud fetch con el ID de la mascota
  if (!petFetch.ok) {
    throw new Error("Error al obtener la mascota"); // Lanza un error si la respuesta no es exitosa
  }
  const pet = await petFetch.json(); // Convierte la respuesta a formato JSON
  return pet; // Retorna la mascota obtenida
};

// Función asíncrona para adoptar (eliminar) una mascota
const adoptPet = async (id) => {
  const response = await fetch(`http://localhost:3005/api/pets/${id}`, {
    method: "DELETE", // Método DELETE para eliminar una mascota
  });
  return response; // Retorna la respuesta de la solicitud
};

const DetalleModal = ({ closeModal, refreshPets }) => {
  const [pet, setPet] = useState(null); // Inicializa el estado con null
  const { id } = useParams(); // Obtiene el ID de la URL

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const petData = await getPetByID(id); // Llama a la función para obtener la mascota
        setPet(petData); // Actualiza el estado con los datos de la mascota
      } catch (error) {
        console.error(error); // Maneja el error
        setPet(null); // Si hay un error, establece pet como null
      }
    };

    fetchPet(); // Ejecuta la función para obtener la mascota
  }, [id]);

  // Función para manejar la adopción de la mascota
  const handleAdoptClick = async () => {
    const response = await adoptPet(id); // Envía solicitud para adoptar la mascota
    if (response.ok) {
      refreshPets(); // Refresca la lista de mascotas si la adopción fue exitosa
      closeModal(); // Cierra el modal
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h1>Detalle</h1> {/* Título de la página de detalles */}
        {pet ? ( // Renderiza los detalles de la mascota si pet no es null
          <div>
            <img src={pet.photo} alt={pet.name} className="pet-photo" />{" "}
            {/* Muestra la foto de la mascota */}
            <div className="detail">
              <span className="detail-title">Nombre: </span>
              <span className="detail-content">{pet.name}</span>
            </div>
            <div className="detail">
              <span className="detail-title">Descripción: </span>
              <span className="detail-content">{pet.description}</span>
            </div>
            <div className="detail">
              <span className="detail-title">Tipo: </span>
              <span className="detail-content">{pet.type}</span>
            </div>
            <div className="detail">
              <span className="detail-title">Características: </span>
              <span className="detail-content">
                {pet.characteristics.join(", ")}
              </span>
            </div>
            {/* Botón para editar la mascota */}
            <button
              onClick={() => {
                /* Aquí debes abrir el modal de edición */
              }}
            >
              Editar
            </button>
            {/* Botón para adoptar la mascota */}
            <button onClick={handleAdoptClick}>Adoptar</button>
            {/* Botón para cerrar el modal */}
            <button onClick={closeModal}>Cancelar</button>
          </div>
        ) : (
          <p>Cargando...</p> // Mensaje de carga si la mascota aún no se ha recuperado
        )}
      </div>
    </div>
  );
};

export default DetalleModal; // Exporta el componente DetalleModal como predeterminado
