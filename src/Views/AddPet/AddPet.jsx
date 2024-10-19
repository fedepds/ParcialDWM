import React, { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

// Componente para agregar una nueva mascota
const AddPet = () => {
  const [name, setName] = useState(""); // Estado para el nombre
  const [age, setAge] = useState(""); // Estado para la edad
  const [type, setType] = useState(""); // Estado para el tipo
  const [description, setDescription] = useState(""); // Estado para la descripción
  const navigate = useNavigate();

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario

    const newPet = {
      name,
      age,
      type,
      description,
      // Agrega más campos si es necesario
    };

    // Enviar la nueva mascota a la API
    const response = await fetch("http://localhost:3005/api/pets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPet),
    });

    if (response.ok) {
      // Redirigir al usuario a la página principal después de agregar la mascota
      navigate("/");
    } else {
      // Manejar errores aquí si es necesario
      console.error("Error al agregar la mascota");
    }
  };

  return (
    <div>
      <h1>Agregar Mascota</h1>
      <form onSubmit={handleSubmit} className="add-pet-form">
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="type">Tipo:</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">Selecciona un tipo</option>
            <option value="Perro">Perro</option>
            <option value="Gato">Gato</option>
            {/* Puedes agregar más tipos aquí */}
          </select>
        </div>

        <div>
          <label htmlFor="age">Edad:</label>
          <select
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          >
            <option value="">Selecciona una edad</option>
            <option value="Cachorro">Cachorro</option>
            <option value="Adulto">Adulto</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        <div>
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="submit">Agregar Mascota</button>
      </form>
    </div>
  );
};

export default AddPet; // Exporta el componente AddPet como predeterminado
