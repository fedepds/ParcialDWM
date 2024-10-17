import React, { useState } from "react"; // Importa React y el hook useState para manejar el estado de los inputs
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate para manejar la navegación de rutas
import "./styles.css"; // Importa los estilos CSS

// Componente AddGame para agregar un nuevo juego
const AddPet = () => {
  // Define los estados para almacenar los valores de los campos del formulario
  const [name, setName] = useState(""); // Estado para almacenar el título del juego
  const [description, setDescription] = useState(""); // Estado para almacenar la descripción del juego
  const [characteristics, setCharacteristics] = useState(""); // Estado para almacenar las categorías del juego
  const [type, setType] = useState(""); // Estado para almacenar el número de jugadores del juego
  const [age, setAge] = useState(""); // Estado para almacenar el número de jugadores del jueg
  const navigate = useNavigate(); // Hook para redirigir al usuario a diferentes rutas

  // Variable que desactiva el botón si falta algún campo obligatorio
  const buttonIsDisabled = !name || !description || !type || !characteristics || !age || !type; ; 

  // Función asíncrona que se ejecuta al hacer clic en "Agregar Juego"
  const handleAddPet = async () => {
    const response = await fetch("http://localhost:3005/api/pets", {
      method: "POST", // Utiliza el método POST para enviar los datos
      headers: {
        "Content-Type": "application/json", // Define el tipo de contenido como JSON
      },
      body: JSON.stringify({ name, age, type, description,characteristics}), // Convierte los datos del juego en formato JSON y los envía en el cuerpo de la solicitud
    });

    if (response.ok) {
      // Si la respuesta es exitosa
      navigate("/"); // Redirige al usuario a la página principal
    }
  };

  return (
    <div>
      <h1>Agregar Pet</h1> {/* Título del formulario */}
      <div>
        <div>
          <input
            type="text"
            placeholder="Nombre" // Input para el título del juego
            value={name} // Valor controlado por el estado 'title'
            onChange={(e) => setName(e.target.value)} // Actualiza el estado cuando el usuario escribe
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Descripción" // Input para la descripción del juego
            value={description} // Valor controlado por el estado 'description'
            onChange={(e) => setDescription(e.target.value)} // Actualiza el estado cuando el usuario escribe
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Age" // Input para la cantidad de jugadores
            value={age} // Valor controlado por el estado 'players'
            onChange={(e) => setAge((e.target.value))} // Convierte el valor a número y actualiza el estado
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="type" // Input para las categorías del juego
            value={type} // Valor controlado por el estado 'categories'
            onChange={(e) => setType(e.target.value)} // Actualiza el estado cuando el usuario escribe
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="caracteristicas" // Input para las categorías del juego
            value={characteristics} // Valor controlado por el estado 'categories'
            onChange={(e) => setCharacteristics(e.target.value)} // Actualiza el estado cuando el usuario escribe
          />
        </div>
      </div>
      {/* Botón para agregar el juego, desactivado si falta algún campo obligatorio */}
      <button
        className="add-button"
        onClick={handleAddPet} // Llama a handleAddGame al hacer clic
        disabled={buttonIsDisabled} // Desactiva el botón si falta algún campo
      >
        Agregar Pet {/* Texto del botón */}
      </button>
    </div>
  );
};

export default AddPet; // Exporta el componente AddGame como predeterminado
