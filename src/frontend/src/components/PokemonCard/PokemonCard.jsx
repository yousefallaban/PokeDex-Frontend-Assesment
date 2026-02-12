import { useState } from 'react';
import styles from './PokemonCard.module.css';

export default function PokemonCard({ id, name, imageUrl, isCaught, onToggleFavorite }) {
  const [isToggling, setIsToggling] = useState(false);
  const formattedId = `#${String(id).padStart(3, '0')}`;

  const handleClick = async () => {
    setIsToggling(true);
    try {
      await onToggleFavorite(id);
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <div className={styles.card}>
      <img className={styles.sprite} src={imageUrl} alt={name} />
      <p className={styles.id}>{formattedId}</p>
      <p className={styles.name}>{name}</p>
      <button
        className={styles.heartBtn}
        onClick={handleClick}
        disabled={isToggling}
        aria-label={isCaught ? 'Remove from collection' : 'Add to collection'}
      >
        {isCaught ? '❤️' : '🤍'}
      </button>
    </div>
  );
}
