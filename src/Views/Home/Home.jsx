import React, { useEffect, useState } from "react";
import "./styles.css";
import Card from "../../Components/Card/Card";
import { useNavigate } from "react-router-dom";

// Función asíncrona para obtener las mascotas desde la API
const getPets = async () => {
  const petsFetch = await fetch("http://localhost:3005/api/pets");
  const pets = await petsFetch.json();
  return pets;
};

// Componente principal Home
const Home = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]); // Estado para las mascotas filtradas
  const [typeFilter, setTypeFilter] = useState(""); // Estado para el filtro de tipo
  const [ageFilter, setAgeFilter] = useState(""); // Estado para el filtro de edad
  const navigate = useNavigate();

  // Función para refrescar la lista de mascotas obteniendo los más recientes desde la API
  const refreshPets = async () => {
    const updatedPets = await getPets();
    setPets(updatedPets);
    setFilteredPets(updatedPets); // Inicializa las mascotas filtradas
  };

  useEffect(() => {
    refreshPets();
  }, []);

  // Función para manejar el cambio en el filtro de tipo
  const handleTypeChange = (event) => {
    const value = event.target.value;
    setTypeFilter(value);
    applyFilters(value, ageFilter); // Aplica los filtros
  };

  // Función para manejar el cambio en el filtro de edad
  const handleAgeChange = (event) => {
    const value = event.target.value;
    setAgeFilter(value);
    applyFilters(typeFilter, value); // Aplica los filtros
  };

  // Función para aplicar los filtros
  const applyFilters = (type, age) => {
    let filtered = pets;

    if (type) {
      filtered = filtered.filter((pet) => pet.type === type);
    }

    if (age) {
      filtered = filtered.filter((pet) => pet.age === age);
    }

    setFilteredPets(filtered); 
  };

  const handleAddGameClick = () => {
    navigate("/addPet");
  };

  return (
    <div>
      <div className="home-title-wrapp">
        <h1>Mascotas</h1> {/* Título principal */}
        <button onClick={handleAddGameClick} className="add-game-button">
          Agregar Mascota {/* Botón para agregar una mascota */}
        </button>
      </div>

      {/* Filtros */}
      <div className="filters">
        <select onChange={handleTypeChange} value={typeFilter}>
          <option value="">Filtrar por Tipo</option>
          <option value="Perro">Perro</option>
          <option value="Gato">Gato</option>
          {/* Puedes agregar más tipos aquí */}
        </select>

        <select onChange={handleAgeChange} value={ageFilter}>
          <option value="">Filtrar por Edad</option>
          <option value="Cachorro">Cachorro</option>
          <option value="Adulto">Adulto</option>
          <option value="Senior">Senior</option>
        </select>
      </div>

      <div className="home-grid-cards">
        {filteredPets.map((pet) => (
          <Card
            photo={pet.photo}
            key={pet.id}
            name={pet.name}
            age={pet.age}
            id={pet.id}
            refreshPets={refreshPets}
          />
        ))}
      </div>
    </div>
  );
};

export default Home; // Exporta el componente Home como predeterminado
