import { useState, useEffect } from "react";
import "./RandomPokemon.css";

export default function RandomPokemon() {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favoritePokemon');
    return saved ? JSON.parse(saved) : [];
  });

  // Fetch Pokemon data from PokeAPI
  const fetchPokemon = async (identifier) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
      
      if (!response.ok) {
        throw new Error('Pokemon not found!');
      }
      
      const data = await response.json();
      setPokemonData(data);
    } catch (err) {
      setError(err.message);
      setPokemonData(null);
    } finally {
      setLoading(false);
    }
  };

  // Generate random Pokemon (1-1010 for all generations)
  const handleGenerate = () => {
    const randomId = Math.floor(Math.random() * 1010) + 1;
    fetchPokemon(randomId);
  };

  // Search Pokemon by name or number
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchPokemon(searchTerm.toLowerCase().trim());
      setSearchTerm("");
    }
  };

  // Toggle favorite
  const toggleFavorite = () => {
    if (!pokemonData) return;
    
    const isFavorite = favorites.some(fav => fav.id === pokemonData.id);
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = favorites.filter(fav => fav.id !== pokemonData.id);
    } else {
      newFavorites = [...favorites, {
        id: pokemonData.id,
        name: pokemonData.name,
        sprite: pokemonData.sprites.other['official-artwork'].front_default
      }];
    }
    
    setFavorites(newFavorites);
    localStorage.setItem('favoritePokemon', JSON.stringify(newFavorites));
  };

  // Load a random Pokemon on mount
  useEffect(() => {
    handleGenerate();
  }, []);

  // Get Pokemon type colors
  const getTypeColor = (type) => {
    const colors = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC'
    };
    return colors[type] || '#777';
  };

  const isFavorite = pokemonData && favorites.some(fav => fav.id === pokemonData.id);

  return (
    <div className="pokemon-wrapper">
      {/* Search Bar */}
      <form className="search-container" onSubmit={handleSearch}>
        <input
          type="text"
          className="search-input glass"
          placeholder="Search by name or number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="btn-search btn-secondary">
          🔍 Search
        </button>
      </form>

      {/* Main Pokemon Card */}
      <div className="pokemon-container glass-strong">
        {loading && (
          <div className="loading-state">
            <div className="pokeball-loader"></div>
            <p>Loading Pokémon...</p>
          </div>
        )}

        {error && (
          <div className="error-state">
            <span className="error-icon">❌</span>
            <h3>Oops!</h3>
            <p>{error}</p>
            <button className="btn-primary" onClick={handleGenerate}>
              Try Another
            </button>
          </div>
        )}

        {!loading && !error && pokemonData && (
          <div className="pokemon-content fade-in">
            {/* Pokemon Header */}
            <div className="pokemon-header">
              <h2 className="pokemon-name">
                {pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}
              </h2>
              <span className="pokemon-number">#{String(pokemonData.id).padStart(4, '0')}</span>
              <button 
                className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                onClick={toggleFavorite}
                title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                {isFavorite ? '❤️' : '🤍'}
              </button>
            </div>

            {/* Pokemon Image */}
            <div className="pokemon-image-container">
              <img
                className="pokemon-image"
                src={pokemonData.sprites.other['official-artwork'].front_default}
                alt={pokemonData.name}
              />
            </div>

            {/* Pokemon Types */}
            <div className="pokemon-types">
              {pokemonData.types.map((type) => (
                <span
                  key={type.type.name}
                  className="type-badge"
                  style={{ backgroundColor: getTypeColor(type.type.name) }}
                >
                  {type.type.name}
                </span>
              ))}
            </div>

            {/* Pokemon Stats */}
            <div className="pokemon-stats">
              <h3 className="stats-title">Base Stats</h3>
              {pokemonData.stats.map((stat) => (
                <div key={stat.stat.name} className="stat-row">
                  <span className="stat-name">
                    {stat.stat.name.replace('-', ' ').toUpperCase()}
                  </span>
                  <div className="stat-bar-container">
                    <div
                      className="stat-bar"
                      style={{
                        width: `${(stat.base_stat / 255) * 100}%`,
                        backgroundColor: stat.base_stat > 100 ? '#43e97b' : '#667eea'
                      }}
                    ></div>
                  </div>
                  <span className="stat-value">{stat.base_stat}</span>
                </div>
              ))}
            </div>

            {/* Pokemon Info */}
            <div className="pokemon-info">
              <div className="info-item">
                <span className="info-label">Height</span>
                <span className="info-value">{(pokemonData.height / 10).toFixed(1)} m</span>
              </div>
              <div className="info-item">
                <span className="info-label">Weight</span>
                <span className="info-value">{(pokemonData.weight / 10).toFixed(1)} kg</span>
              </div>
              <div className="info-item">
                <span className="info-label">Abilities</span>
                <span className="info-value">
                  {pokemonData.abilities.map(a => a.ability.name).join(', ')}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button 
          className="btn-primary generate-btn" 
          onClick={handleGenerate}
          disabled={loading}
        >
          ✨ Generate Random Pokémon
        </button>
      </div>

      {/* Favorites Section */}
      {favorites.length > 0 && (
        <div className="favorites-section">
          <h3 className="favorites-title">❤️ Your Favorites ({favorites.length})</h3>
          <div className="favorites-grid">
            {favorites.map((fav) => (
              <div
                key={fav.id}
                className="favorite-card glass"
                onClick={() => fetchPokemon(fav.id)}
              >
                <img src={fav.sprite} alt={fav.name} />
                <p>{fav.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
