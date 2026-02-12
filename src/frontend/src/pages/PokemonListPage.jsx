import { usePokemon } from '../hooks/usePokemon';
import { usePokedex } from '../context/PokedexContext';
import PokemonGrid from '../components/PokemonGrid/PokemonGrid';
import { mapPokemonToGrid } from '../utils/pokemon-utils';

export default function PokemonListPage() {
  const { pokemon, isLoading, error } = usePokemon();
  const { isCaught, togglePokemon, isLoading: pokedexLoading } = usePokedex();

  if (isLoading || pokedexLoading) {
    return <p className="page-message">Loading...</p>;
  }

  if (error) {
    return <p className="page-message">{error}</p>;
  }

  if (!pokemon?.length) {
    return <p className="page-message">No Pokémon out there right now — check back soon!</p>;
  }

  return (
    <PokemonGrid
      pokemon={mapPokemonToGrid(pokemon, isCaught)}
      onToggleFavorite={togglePokemon}
    />
  );
}
