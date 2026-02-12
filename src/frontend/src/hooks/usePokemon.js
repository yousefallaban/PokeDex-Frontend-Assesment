import { useState, useEffect } from 'react';
import { pokemonApi } from '../services/pokemonApi';

export function usePokemon() {
  const [pokemon, setPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const data = await pokemonApi.getAllPokemon();
        setPokemon(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPokemon();
  }, []);

  return { pokemon, isLoading, error };
}
