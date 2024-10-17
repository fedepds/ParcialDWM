import React, { useState } from "react"; // Importa React y el hook useState para manejar el estado del modal
import "./styles.css"; // Importa los estilos CSS
import { useNavigate } from "react-router-dom"; // Importa useNavigate para manejar la navegación de rutas
import EditModal from "./EditModal"; // Importa el componente EditModal para editar juegos
import DetalleModal from "./DetalleModal";

// Función asíncrona para eliminar un juego por su ID
const deletePets = async (id) => {
  const petDelete = await fetch("http://localhost:3005/api/pets/" + id, {
    method: "DELETE", // Utiliza el método DELETE para eliminar el juego
  });

  return petDelete; // Retorna la respuesta de la eliminación
};


// Componente Card para mostrar los detalles del juego y ofrecer opciones de edición/eliminación
const Card = ({
  name, // Título del juego
  id, // ID del juego
  refreshPets, // Función para refrescar la lista de juegos después de una modificación
  age,
  description, // Descripción del juego
  type, // Cantidad de jugadores del juego
  characteristics, // Categoría del juego
}) => {
  const navigate = useNavigate(); // Hook para navegar entre páginas
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar si el modal de edición está abierto
const [isModalOpen2, setIsModalOpen2] = useState(false);

  // Función para manejar el clic en "Detalle", navega a la página de detalles del juego
  const handleDetailsClick = () => {
    setIsModalOpen2(true); 
  };

  // Función para manejar el clic en "Borrar", elimina el juego y actualiza la lista
  const handleDeleteClick = async () => {
    const response = await deletePets(id); // Llama a deleteGame para eliminar el juego
    if (response.ok) {
      refreshPets(); // Si la respuesta es exitosa, refresca la lista de juegos
    }
  };

  // Función para abrir el modal de edición
  const handleEditClick = () => {
    setIsModalOpen(true); // Cambia el estado para abrir el modal
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false); // Cambia el estado para cerrar el modal
  setIsModalOpen2(false);
  };

  return (
    <div className="card">
      <div className="card-content">
        <h2 className="card-title">{name}</h2>{" "}
        {/* Muestra el título del juego */}
        <p className="card-title">{age}</p> 
        <p className="card-title">{description}</p>{" "}
        <div className="card-wrapp-buttons">
          {/* Botón para ver los detalles del juego */}
          <button className="card-button" onClick={handleDetailsClick}>
            Detalle
          </button>
          {/* Botón para borrar el juego */}
          <button className="card-button" onClick={handleDeleteClick}>
            Borrar
          </button>
          {/* Botón para editar el juego */}
          <button className="card-button" onClick={handleEditClick}>
            Editar
          </button>
        </div>
      </div>
      {/* Si el modal está abierto, renderiza el componente EditModal */}
      {isModalOpen && (
        <EditModal
          id={id} // Pasa el ID del juego al modal de edición
          currentName={name} // Pasa el título actual del juego
          currentAge={age}
          currentDescription={description} // Pasa la descripción actual del juego
          currentType={type} // Pasa la cantidad de jugadores actual
          currentCharacteristics={characteristics} // Pasa las categorías actuales del juego
          refreshPets={refreshPets} // Función para refrescar la lista de juegos
          closeModal={closeModal} // Función para cerrar el modal
        />
      )}
      {isModalOpen2 && (
        <DetalleModal
          id={id}
          currentName={name} // Pasa el título actual del juego
          currentAge={age}
          currentDescription={description} // Pasa la descripción actual del juego
          currentType={type} // Pasa la cantidad de jugadores actual
          currentCharacteristics={characteristics}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default Card; // Exporta el componente Card como predeterminado
