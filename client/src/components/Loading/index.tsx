import styles from "./styles.module.css";
import { BallTriangle } from "react-loader-spinner";
export function Loading({ loading }: { loading: string }) {
  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        <BallTriangle color="#00BFFF" height={100} width={100} />
        <p>{loading}</p>
      </div>
    </div>
  );
}
