import styles from './Stars.module.css';

export default function Stars({ rating }) {
  const full = Math.floor(rating);
  const empty = 5 - full;
  return (
    <span className={styles.stars}>
      {'★'.repeat(full)}{'☆'.repeat(empty)}
    </span>
  );
}