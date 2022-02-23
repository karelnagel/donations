import styles from "./styles.module.css";
import { useContext } from "react";
import { Context } from "../../interfaces/context";

export function Header({ loadWeb3Modal, logoutOfWeb3Modal }: { loadWeb3Modal: () => Promise<void>; logoutOfWeb3Modal: () => Promise<void> }) {
  const { user } = useContext(Context);

  return (
    <div className={styles.header}>
      <div className={styles.content}>
      <p className={styles.title}>
        <a href="/">DONATIONS</a>
      </p>
      <button className={styles.button} onClick={() => (user ? logoutOfWeb3Modal() : loadWeb3Modal())}>
        {!user ? "Connect Wallet" : user.name}
      </button>
      </div>
      
    </div>
  );
}
