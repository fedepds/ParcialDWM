import { useState } from "react"; // Importa el hook useState para manejar el estado de los inputs
import "./EditModal.css"; // Importa los estilos específicos para el modal

// Función asíncrona para actualizar los datos de una mascota
const updatedPets = async (
  id,
  name,
  age,
  description,
  type,
  characteristics
) => {
  const petEdit = await fetch("http://localhost:3005/api/pets/" + id, {
    method: "PUT", // Método PUT para actualizar una mascota existente
    headers: {
      "Content-Type": "application/json", // Define que se envía JSON
    },
    body: JSON.stringify({
      name, // Pasa el nombre actualizado
      age,
      type, // Pasa el tipo actualizado
      description, // Pasa la descripción actualizada
      characteristics, // Pasa las características actualizadas
    }),
  });
  return petEdit; // Retorna la respuesta de la solicitud
};

// Componente EditModal para editar la información de una mascota
const EditModal = ({
  currentName, // Nombre actual de la mascota
  id, // ID de la mascota
  refreshPets, // Función para refrescar la lista de mascotas tras la actualización
  currentAge,
  currentDescription, // Descripción actual de la mascota
  currentType, // Tipo actual de la mascota
  currentCharacteristics, // Características actuales de la mascota
  closeModal, // Función para cerrar el modal
}) => {
  // Estados para almacenar los nuevos valores introducidos por el usuario
  const [newName, setNewName] = useState(currentName); // Estado para el nuevo nombre
  const [newDescription, setNewDescription] = useState(currentDescription); // Estado para la nueva descripción
  const [newType, setNewType] = useState(currentType); // Estado para el nuevo tipo
  const [newCharacteristics, setNewCharacteristics] = useState(
    currentCharacteristics
  ); // Estado para las nuevas características
  const [newAge, setNewAge] = useState(currentAge); // Estado para la nueva edad

  // Función para manejar el clic en "Guardar cambios"
  const handleEditClick = async () => {
    const response = await updatedPets(
      id, // ID de la mascota a actualizar
      newName, // Nuevo nombre
      newDescription, // Nueva descripción
      newType, // Nuevo tipo
      newAge, // Nueva edad
      newCharacteristics // Nuevas características
    );
    if (response.ok) {
      refreshPets(); // Refresca la lista de mascotas si la actualización fue exitosa
      closeModal(); // Cierra el modal
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Mascota</h2> {/* Título del modal */}
        {/* Input para el nuevo nombre */}
        <input
          type="text"
          placeholder="Nombre"
          value={newName} // Muestra el nuevo nombre o el actual
          onChange={(e) => setNewName(e.target.value)} // Actualiza el estado del nombre cuando el usuario escribe
        />
        {/* Input para la nueva descripción */}
        <input
          type="text"
          placeholder="Descripción"
          value={newDescription} // Muestra la nueva descripción o la actual
          onChange={(e) => setNewDescription(e.target.value)} // Actualiza el estado de la descripción
        />
        {/* Selector para la nueva edad */}
        <select
          value={newAge}
          onChange={(e) => setNewAge(e.target.value)}
          required
        >
          <option value="">Selecciona una edad</option>
          <option value="Cachorro">Cachorro</option>
          <option value="Adulto">Adulto</option>
          <option value="Senior">Senior</option>
        </select>
        {/* Selector para el nuevo tipo */}
        <select
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
          required
        >
          <option value="">Selecciona un tipo</option>
          <option value="Perro">Perro</option>
          <option value="Gato">Gato</option>
          {/* Puedes agregar más tipos aquí */}
        </select>
        {/* Input para las nuevas características */}
        <input
          type="text"
          placeholder="Características"
          value={newCharacteristics} // Muestra las características actuales o nuevas
          onChange={(e) => setNewCharacteristics(e.target.value)} // Actualiza el estado de las características
        />
        {/* Botón para guardar los cambios y actualizar la mascota */}
        <button onClick={handleEditClick}>Guardar cambios</button>
        {/* Botón para cerrar el modal sin guardar cambios */}
        <button onClick={closeModal}>Cancelar</button>
      </div>
    </div>
  );
};

export default EditModal; // Exporta el componente EditModal como predeterminado
