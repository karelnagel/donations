import styles from "./styles.module.css";

export function Body({ children }: { children?: any }) {
  return (
    <div className={styles.body}>
      <div className={styles.background}>
        <div className={styles.ellips}></div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
