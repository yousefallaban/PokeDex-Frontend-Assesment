import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { pokemonApi } from '../services/pokemonApi';

const PokedexContext = createContext(null);

export function PokedexProvider({ children, initialState }) {
  const [caughtPokemon, setCaughtPokemon] = useState(initialState?.caughtPokemon ?? []);
  const [isLoading, setIsLoading] = useState(!initialState);
  const [error, setError] = useState(initialState?.error ?? null);

  const fetchPokedex = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await pokemonApi.getPokedex();
      setCaughtPokemon(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!initialState) fetchPokedex();
  }, [initialState, fetchPokedex]);

  const isCaught = useCallback(
    (id) => caughtPokemon.some((p) => p.id === id),
    [caughtPokemon]
  );

  const catchPokemon = useCallback(async (id) => {
    setError(null);
    try {
      const data = await pokemonApi.catchPokemon(id);
      setCaughtPokemon((prev) => [...prev, data]);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const releasePokemon = useCallback(async (id) => {
    setError(null);
    try {
      await pokemonApi.releasePokemon(id);
      setCaughtPokemon((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const togglePokemon = useCallback(async (id) => {
    if (isCaught(id)) {
      await releasePokemon(id);
    } else {
      await catchPokemon(id);
    }
  }, [isCaught, catchPokemon, releasePokemon]);

  const value = useMemo(
    () => ({ caughtPokemon, isCaught, catchPokemon, releasePokemon, togglePokemon, isLoading, error, fetchPokedex }),
    [caughtPokemon, isCaught, catchPokemon, releasePokemon, togglePokemon, isLoading, error, fetchPokedex]
  );

  return (
    <PokedexContext.Provider value={value}>
      {children}
    </PokedexContext.Provider>
  );
}

export function usePokedex() {
  const context = useContext(PokedexContext);
  if (!context) throw new Error('usePokedex must be used within a PokedexProvider');
  return context;
}

export { PokedexContext };
