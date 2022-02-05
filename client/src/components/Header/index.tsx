import { Web3Provider } from "@ethersproject/providers";
import { WalletButton } from "../WalletButton";
import styles from "./styles.module.css";

export function Header({ 
    provider,
    loadWeb3Modal,
    logoutOfWeb3Modal,
  }: {
    provider: Web3Provider | undefined;
    loadWeb3Modal: () => Promise<void>;
    logoutOfWeb3Modal: () => Promise<void>;
  }) {
  return (
    <div className={styles.header}>
      <p>DONATIONS</p>
      <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} />
    </div>
  );
}
