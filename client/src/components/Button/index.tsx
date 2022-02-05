import styles from "./styles.module.css";

export function Button({ children, onClick }: { children?: string; onClick?: any }) {
  return (
    <button onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
}
