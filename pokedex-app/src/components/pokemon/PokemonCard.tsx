
import React, { useEffect, useState } from 'react';
import { getPokemonDetails, PokemonDetails } from '../../services/pokemon';
import './PokemonCard.css';

interface PokemonCardProps {
  name: string;
  url: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, url }) => {
  const [details, setDetails] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getPokemonDetails(url);
        setDetails(data);
      } catch (err) {
        setError('Failed to fetch details');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [url]);

  return (
    <div className="pokemon-card">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {details && (
        <>
          <img src={details.sprites.front_default} alt={name} />
          <p>{name}</p>
          <div>
            {details.types.map((typeInfo) => (
              <span key={typeInfo.type.name} className={`type ${typeInfo.type.name}`}>
                {typeInfo.type.name}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PokemonCard;
