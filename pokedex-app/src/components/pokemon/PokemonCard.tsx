import React, { useState } from 'react';
import { Pokemon } from '../../types/pokemon.d';
import './PokemonCard.css';

interface PokemonCardProps {
  pokemon?: Pokemon;
  loading?: boolean;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, loading }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (loading || !pokemon) {
    return (
      <div className="pokemon-card">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="pokemon-card">
      {!imageLoaded && <div className="placeholder" />}
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        onLoad={() => setImageLoaded(true)}
        style={{ display: imageLoaded ? 'block' : 'none' }}
      />
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