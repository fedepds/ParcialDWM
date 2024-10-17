import React, { useEffect, useState } from "react"; 
import "./styles.css"; 
import Card from "../../Components/Card/Card"; 
import { useNavigate } from "react-router-dom"; 

// Función asíncrona para obtener los juegos desde la API
const getPets = async () => {
  const petsFetch = await fetch("http://localhost:3005/api/pets"); 
  const pets = await petsFetch.json(); 
  return pets; 
};

// Componente principal Home
const Home = () => {
  const [pets, setPets] = useState([]); 
  const navigate = useNavigate(); 

  // Función para refrescar la lista de pets obteniendo los más recientes desde la API
  const refreshPets = async () => {
    const updatedPets = await getPets(); 
    setPets(updatedPets); 

  };


  useEffect(() => {
    refreshPets();
  }, []); 


  const handleAddGameClick = () => {
    navigate("/addPet"); 
  };

  return (
    <div>
      <div className="home-title-wrapp">
        <h1>Mascotas</h1> {/* Título principal */}
        <button onClick={handleAddGameClick} className="add-game-button">
          Agregar Mascota {/* Botón para agregar un juego */}
        </button>
      </div>

      <div className="home-grid-cards">
        {pets.map((pet) => (
          <Card
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
