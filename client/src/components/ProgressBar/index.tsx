import styles from "./styles.module.css";

export function ProgressBar({balance,goal,coin}:{balance:number,goal:number,coin:string}){

  const progress = (balance / goal) * 100;
  return (
    <div>
        <p className={styles.goalText}>
          {balance} {coin} of {goal} {coin}
        </p>
        <div className={styles.goal}>
          <div className={styles.progress} style={{ width: `${progress < 100 ? progress : "100"}%`, borderRadius: "5px" }}></div>
        </div>
      </div>
  );
}

