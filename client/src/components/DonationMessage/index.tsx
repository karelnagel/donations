import { Donation } from "../../interfaces/donation";
import styles from "./styles.module.css";

export function DonationMessage({ donation }: { donation?: Donation }) {
  if (!donation) return null;
  return (
    <div key={Math.random()} className={styles.donation}>
      {donation.avatar && <img src={donation.avatar} alt="" />}
      <div>
        <p className={styles.title}>{`${donation.name} donated ${donation.amount} ${donation.coin ?? "ERC20"}`}</p>
        <p className={styles.message}>{donation.message}</p>
      </div>
      <div className={styles.progress}></div>
    </div>
  );
}
