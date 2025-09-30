import { useEffect, useState } from 'react';
import { getPokemonList, Pokemon } from './services/pokemon';
import PokemonCard from './components/pokemon/PokemonCard';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import './App.css';

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
      <Header />
      <main>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <div className="pokemon-grid">
          {pokemonList.map((pokemon) => (
            <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;