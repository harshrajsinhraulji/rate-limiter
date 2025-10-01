import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PokemonGrid from './components/pokemon/PokemonGrid';
import { usePokemon } from './hooks/usePokemon';
import './App.css';

function App() {
  const { pokemonList, loading, error } = usePokemon();

  return (
    <div>
      <Header />
      <main>
        <h1>Pokedex</h1>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && <PokemonGrid pokemonList={pokemonList} />}
      </main>
      <Footer />
    </div>
  );
}

export default App;

abcdefghijkl