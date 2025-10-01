import React from 'react';
import { Pokemon } from '../../types/pokemon.d';
import './PokemonCard.css';

interface PokemonCardProps {
  pokemon?: Pokemon;
  loading?: boolean;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, loading }) => {
  if (loading || !pokemon) {
    return (
      <div className="pokemon-card">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="pokemon-card">
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>{pokemon.name}</p>
      <div>
        {pokemon.types.map((typeInfo) => (
          <span key={typeInfo.type.name} className={`type ${typeInfo.type.name}`}>
            {typeInfo.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;