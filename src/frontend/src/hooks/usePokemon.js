import { useState, useEffect } from 'react';
import { pokemonApi } from '../services/pokemonApi';

export function usePokemon() {
  const [pokemon, setPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchPokemon() {
      try {
        const data = await pokemonApi.getAllPokemon();
        if (!cancelled) setPokemon(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchPokemon();
    return () => { cancelled = true; };
  }, []);

  return { pokemon, isLoading, error };
}
