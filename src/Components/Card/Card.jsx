import React, { useState } from "react"; // Importa React y el hook useState para manejar el estado del modal
import "./styles.css"; // Importa los estilos CSS
import { useNavigate } from "react-router-dom"; // Importa useNavigate para manejar la navegación de rutas
import EditModal from "./EditModal"; // Importa el componente EditModal para editar juegos
import DetalleModal from "./DetalleModal"; // Importa el componente DetalleModal para mostrar detalles de la mascota

// Función asíncrona para eliminar una mascota por su ID
const deletePets = async (id) => {
  const petDelete = await fetch("http://localhost:3005/api/pets/" + id, {
    method: "DELETE", // Utiliza el método DELETE para eliminar la mascota
  });

  return petDelete; // Retorna la respuesta de la eliminación
};

// Componente Card para mostrar los detalles de la mascota y ofrecer opciones de edición/eliminación
const Card = ({
  name, // Nombre de la mascota
  id, // ID de la mascota
  refreshPets, // Función para refrescar la lista de mascotas después de una modificación
  age, // Edad de la mascota
  description, // Descripción de la mascota
  type, // Tipo de mascota
  characteristics, // Características de la mascota
  photo, // Foto de la mascota
}) => {
  const navigate = useNavigate(); // Hook para navegar entre páginas
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar si el modal de edición está abierto
  const [isModalOpen2, setIsModalOpen2] = useState(false); // Estado para controlar si el modal de detalles está abierto

  // Función para manejar el clic en "Detalle", navega a la página de detalles de la mascota
  const handleDetailsClick = () => {
    setIsModalOpen2(true);
  };

  // Función para manejar el clic en "Borrar", elimina la mascota y actualiza la lista
  const handleDeleteClick = async () => {
    const response = await deletePets(id); // Llama a deletePets para eliminar la mascota
    if (response.ok) {
      refreshPets(); // Si la respuesta es exitosa, refresca la lista de mascotas
    }
  };

  // Función para abrir el modal de edición
  const handleEditClick = () => {
    setIsModalOpen(true); // Cambia el estado para abrir el modal
  };

  // Función para cerrar los modales
  const closeModal = () => {
    setIsModalOpen(false); // Cambia el estado para cerrar el modal de edición
    setIsModalOpen2(false); // Cambia el estado para cerrar el modal de detalles
  };

  return (
    <div className="card">
      <img src={photo} alt={name} className="pet-photo" />{" "}
      {/* Muestra la foto de la mascota */}
      <div className="card-content">
        <h2 className="card-title">{name}</h2>{" "}
        {/* Muestra el nombre de la mascota */}
        <p className="card-title">{age}</p>{" "}
        {/* Muestra la edad de la mascota */}
        <p className="card-title">{description}</p>{" "}
        {/* Muestra la descripción de la mascota */}
        <div className="card-wrapp-buttons">
          {/* Botón para ver los detalles de la mascota */}
          <button className="card-button" onClick={handleDetailsClick}>
            Detalle
          </button>
          {/* Botón para borrar la mascota */}
          <button className="card-button" onClick={handleDeleteClick}>
            Borrar
          </button>
          {/* Botón para editar la mascota */}
          <button className="card-button" onClick={handleEditClick}>
            Editar
          </button>
        </div>
      </div>
      {/* Si el modal está abierto, renderiza el componente EditModal */}
      {isModalOpen && (
        <EditModal
          id={id} // Pasa el ID de la mascota al modal de edición
          currentName={name} // Pasa el nombre actual de la mascota
          currentAge={age}
          currentDescription={description} // Pasa la descripción actual de la mascota
          currentType={type} // Pasa el tipo actual de la mascota
          currentCharacteristics={characteristics} // Pasa las características actuales de la mascota
          refreshPets={refreshPets} // Función para refrescar la lista de mascotas
          closeModal={closeModal} // Función para cerrar el modal
        />
      )}
      {isModalOpen2 && (
        <DetalleModal
          id={id}
          currentName={name} // Pasa el nombre actual de la mascota
          currentAge={age}
          currentDescription={description} // Pasa la descripción actual de la mascota
          currentType={type} // Pasa el tipo actual de la mascota
          currentCharacteristics={characteristics} // Pasa las características actuales de la mascota
          closeModal={closeModal} // Función para cerrar el modal
        />
      )}
    </div>
  );
};

export default Card; // Exporta el componente Card como predeterminado
