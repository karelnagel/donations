import { useContext } from "react";
import styles from "./styles.module.css";
import { Context } from "../../context";

export function WalletButton({ loadWeb3Modal, logoutOfWeb3Modal }: { loadWeb3Modal: () => Promise<void>; logoutOfWeb3Modal: () => Promise<void> }) {
  const { user } = useContext(Context);
  return (
    <button className={styles.button} onClick={() => (user ? logoutOfWeb3Modal() : loadWeb3Modal())}>
      {!user ? "Connect Wallet" : user?.name ??user.address}
    </button>
  );
}
