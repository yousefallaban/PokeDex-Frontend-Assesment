export function mapPokemonToGrid(pokemon, isCaught) {
  return pokemon.map((p) => ({
    id: p.id,
    name: p.name,
    imageUrl: p.sprites?.front_default ?? '',
    isCaught: isCaught(p.id),
  }));
}
