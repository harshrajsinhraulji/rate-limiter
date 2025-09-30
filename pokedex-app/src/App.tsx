
import { useEffect, useState } from 'react';
import { getPokemonList, Pokemon } from './services/pokemon';

function App() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await getPokemonList();
        setPokemonList(data.results);
      } catch (err) {
        setError('Failed to fetch pokemon');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  return (
    <div>
      <h1>Pokedex</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {pokemonList.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
