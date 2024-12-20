import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./Components/Main";
import PokemonDetails from "./Components/PokemonDetails";
import "./App.css"

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Details/:pokemonId" element={<PokemonDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

