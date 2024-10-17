import { useState } from "react"; // Importa el hook useState para manejar el estado de los inputs
import "./EditModal.css"; // Importa los estilos específicos para el modal

// Función asíncrona para actualizar los datos de un juego
const updatedPets = async (id, name,age, description, type, characteristics) => {
  const petEdit = await fetch("http://localhost:3005/api/pets/" + id, {
    method: "PUT", // Método PUT para actualizar un juego existente
    headers: {
      "Content-Type": "application/json", // Define que se envía JSON
    },
    body: JSON.stringify({
      name, // Pasa el título actualizado
      age,
      type, // Pasa la descripción actualizada
      description, // Pasa la cantidad de jugadores actualizada
      characteristics, // Pasa las categorías actualizadas
    }),
  });
  return petEdit; // Retorna la respuesta de la solicitud
};

// Componente EditModal para editar la información de un juego
const EditModal = ({
  currentName, // Título actual del juego
  id, // ID del juego
  refreshPets, // Función para refrescar la lista de juegos tras la actualización
  currentAge,
  currentDescription, // Descripción actual del juego
  currentType, // Cantidad de jugadores actual del juego
  currentCharacteristics, // Categorías actuales del juego
  closeModal, // Función para cerrar el modal
}) => {
  // Estados para almacenar los nuevos valores introducidos por el usuario
  const [newName, setNewName] = useState(currentName); // Estado para el nuevo título
  const [newDescription, setNewDescription] = useState(currentDescription); // Estado para la nueva descripción
  const [newType, setNewType] = useState(currentType); // Estado para la nueva cantidad de jugadores
  const [newCharacteristics, setNewCharacteristics] = useState(currentCharacteristics); // Estado para las nuevas categorías
  const [newAge, setNewAge] = useState(currentAge);

  // Función para manejar el clic en "Guardar cambios"
  const handleEditClick = async () => {
    const response = await updatedPets(
      id, // ID del juego a actualizar
      newName, // Nuevo título
      newDescription, // Nueva descripción
      newType, // Nueva cantidad de jugadores
      newAge, // Nuevas categorías
      newCharacteristics
    );
    if (response.ok) {
      refreshPets(); // Refresca la lista de juegos si la actualización fue exitosa
      closeModal(); // Cierra el modal
    }
  };

  return (
    <div className="modal-overlay">
      {" "}
      {/* Capa superpuesta del modal */}
      <div className="modal-content">
        {" "}
        {/* Contenido del modal */}
        <h2>Editar Juego</h2> {/* Título del modal */}
        {/* Input para el nuevo título */}
        <input
          type="text"
          placeholder="Nombre"
          value={newName} // Muestra el nuevo título o el actual
          onChange={(e) => setNewName(e.target.value)} // Actualiza el estado del título cuando el usuario escribe
        />
        {/* Input para la nueva descripción */}
        <input
          type="text"
          placeholder="Descripción"
          value={newDescription} // Muestra la nueva descripción o la actual
          onChange={(e) => setNewDescription(e.target.value)} // Actualiza el estado de la descripción
        />
        <input
          type="number"
          placeholder="Age"
          value={newAge} // Muestra la cantidad de jugadores actual o nueva
          onChange={(e) => setNewType(e.target.value)}
        />
        {/* Input para la nueva cantidad de jugadores */}
        <input
          type="number"
          placeholder="Tipo"
          value={newType} // Muestra la cantidad de jugadores actual o nueva
          onChange={(e) => setNewType(e.target.value)}
        />
        {/* Input para las nuevas categorías */}
        <input
          type="text"
          placeholder="Characteristics"
          value={newCharacteristics} // Muestra las categorías actuales o nuevas
          onChange={(e) => setNewCharacteristics(e.target.value)} // Actualiza el estado de las categorías
        />
        {/* Botón para guardar los cambios y actualizar el juego */}
        <button onClick={handleEditClick}>Guardar cambios</button>
        {/* Botón para cerrar el modal sin guardar cambios */}
        <button onClick={closeModal}>Cancelar</button>
      </div>
    </div>
  );
};

export default EditModal; // Exporta el componente EditModal como predeterminado
