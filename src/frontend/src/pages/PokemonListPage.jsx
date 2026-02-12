import { usePokemon } from '../hooks/usePokemon';
import { usePokedex } from '../context/PokedexContext';
import PokemonGrid from '../components/PokemonGrid/PokemonGrid';
import { mapPokemonToGrid } from '../utils/pokemon-utils';

export default function PokemonListPage() {
  const { pokemon, isLoading, error } = usePokemon();
  const { isCaught, catchPokemon, releasePokemon } = usePokedex();

  const handleToggleFavorite = (id) => {
    if (isCaught(id)) {
      releasePokemon(id);
    } else {
      catchPokemon(id);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!pokemon?.length) {
    return <p>No Pokémon out there right now — check back soon!</p>;
  }

  return (
    <PokemonGrid
      pokemon={mapPokemonToGrid(pokemon, isCaught)}
      onToggleFavorite={handleToggleFavorite}
    />
  );
}
