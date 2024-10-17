import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Views/Home/Home";
import Details from "./Views/Details/Details";
import AddPet from "./Views/AddPet/AddPet";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/addPet" element={<AddPet />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
