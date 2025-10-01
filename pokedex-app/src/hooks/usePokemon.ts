import { useState, useEffect } from 'react';
import { Pokemon } from '../types/pokemon';

interface UsePokemonListResult {
  pokemonList: Pokemon[];
  loading: boolean;
  error: string | null;
}

const POKEMON_API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export const usePokemon = (): UsePokemonListResult => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonList = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${POKEMON_API_BASE_URL}?limit=151`);
        if (!response.ok) {
          throw new Error(`Failed to fetch Pokemon list: ${response.statusText}`);
        }
        const data = await response.json();
        const results = data.results;

        const pokemonPromises = results.map(async (pokemon: { name: string }) => {
          const pokemonResponse = await fetch(`${POKEMON_API_BASE_URL}/${pokemon.name}`);
          if (!pokemonResponse.ok) {
            console.error(`Failed to fetch Pokemon: ${pokemon.name}`);
            return null;
          }
          return await pokemonResponse.json();
        });

        const pokemonData = (await Promise.all(pokemonPromises)).filter(p => p !== null) as Pokemon[];
        setPokemonList(pokemonData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, []);

  return { pokemonList, loading, error };
};