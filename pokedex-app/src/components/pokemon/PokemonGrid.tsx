import React from 'react';
import './PokemonGrid.css';
import { Pokemon } from '../../types/pokemon.d';
import PokemonCard from './PokemonCard';

interface PokemonGridProps {
  pokemonList: Pokemon[];
}

const PokemonGrid: React.FC<PokemonGridProps> = ({ pokemonList }) => {
  return (
    <div className="pokemon-grid">
      {pokemonList.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonGrid;