import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

export default function Navigation() {
  const linkClass = ({ isActive }) =>
    `${styles.link} ${isActive ? styles.active : ''}`;

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <NavLink to="/" className={linkClass} end>
        All Pokémon
      </NavLink>
      <NavLink to="/collection" className={linkClass}>
        My Collection
      </NavLink>
    </nav>
  );
}
