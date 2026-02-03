import './App.css';
import RandomPokemon from "./Components/RandomPokemon";

export default function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Random Pokémon Generator</h1>
        <p className="app-subtitle">Discover amazing Pokémon with every click!</p>
      </header>
      <RandomPokemon />
    </div>
  );
}
