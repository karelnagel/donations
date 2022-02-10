import { WalletButton } from "../WalletButton";
import styles from "./styles.module.css";

export function Header({
  loadWeb3Modal,
  logoutOfWeb3Modal,
}: {
  loadWeb3Modal: () => Promise<void>;
  logoutOfWeb3Modal: () => Promise<void>;
}) {
  return (
    <div className={styles.header}>
      <p className={styles.title}>
        <a href="/">DONATIONS</a>
      </p>
      <WalletButton  loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} />
    </div>
  );
}
