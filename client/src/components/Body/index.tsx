import styles from "./styles.module.css";

export function Body({ children }: { children?: any }) {
  return (
    <div className={styles.body}>
      <div className={styles.background}>
        <div className={`${styles.ellips} ${styles.ellips1}`}></div>
        <div className={`${styles.ellips} ${styles.ellips2}`}></div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}