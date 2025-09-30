
import React from 'react';
import { Pokemon } from '../../services/pokemon';
import PokemonCard from './PokemonCard';

interface PokemonGridProps {
  pokemonList: Pokemon[];
}

const PokemonGrid: React.FC<PokemonGridProps> = ({ pokemonList }) => {
  return (
    <div className="pokemon-grid">
      {pokemonList.map((pokemon) => (
        <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
      ))}
    </div>
  );
};

export default PokemonGrid;
