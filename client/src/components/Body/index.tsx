import styles from "./styles.module.css";

export function Body({ children }: { children?: any}) {
  return (
    <div className={styles.body}>
      {children}
    </div>
  );
}
