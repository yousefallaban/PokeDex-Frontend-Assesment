import PokemonCard from '../PokemonCard/PokemonCard';
import styles from './PokemonGrid.module.css';

export default function PokemonGrid({ pokemon, onToggleFavorite }) {
  return (
    <div className={styles.grid}>
      {pokemon.map((p) => (
        <PokemonCard
          key={p.id}
          id={p.id}
          name={p.name}
          imageUrl={p.imageUrl}
          isCaught={p.isCaught}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
