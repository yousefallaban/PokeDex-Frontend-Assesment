import { usePokedex } from '../context/PokedexContext';
import PokemonGrid from '../components/PokemonGrid/PokemonGrid';

const SPRITE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

export default function CollectionPage() {
  const { caughtPokemon, isLoading, error, togglePokemon, fetchPokedex } = usePokedex();

  if (isLoading) {
    return <p className="page-message">Loading...</p>;
  }

  if (error) {
    return (
      <div className="page-message">
        <p>{error}</p>
        <button onClick={fetchPokedex}>Retry</button>
      </div>
    );
  }

  if (!caughtPokemon.length) {
    return <p className="page-message">Your collection is empty — go catch some Pokémon!</p>;
  }

  const pokemon = caughtPokemon.map((p) => ({
    id: p.id,
    name: p.name,
    imageUrl: `${SPRITE_URL}/${p.id}.png`,
    isCaught: true,
  }));
  return (
    <PokemonGrid
      pokemon={pokemon}
      onToggleFavorite={(id) => togglePokemon(id)}
    />
  );
}
