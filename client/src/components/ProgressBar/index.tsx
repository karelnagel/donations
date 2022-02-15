import styles from "./styles.module.css";

export function ProgressBar({ balance, goal, coin }: { balance: number; goal: number; coin: string }) {
  const progress = (balance / goal) * 100;
  return (
    <div className={styles.goal}>
      <div className={styles.progress} style={{ width: `${progress < 100 ? progress : "100"}%` }}></div>
      <div className={styles.text}>
        <p>
          {balance} {coin}
        </p>
        <p>
          {goal} {coin}
        </p>
      </div>
    </div>
  );
}
