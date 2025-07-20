import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import PokemonDetails from "./pages/PokemonDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="pokemon/:name" element={<PokemonDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

