import styles from './PokemonCard.module.css';

export default function PokemonCard({ id, name, imageUrl, isCaught, onToggleFavorite }) {
  const formattedId = `#${String(id).padStart(3, '0')}`;

  return (
    <div className={styles.card}>
      <img
        className={styles.sprite}
        src={imageUrl}
        alt={name}
      />
      <p className={styles.id}>{formattedId}</p>
      <p className={styles.name}>{name}</p>
      <button
        className={styles.heartBtn}
        onClick={() => onToggleFavorite(id)}
        aria-label={isCaught ? 'Remove from collection' : 'Add to collection'}
      >
        {isCaught ? '❤️' : '🤍'}
      </button>
    </div>
  );
}
