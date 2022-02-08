import { useEffect, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import styles from "./styles.module.css";

export function WalletButton({
  provider,
  loadWeb3Modal,
  logoutOfWeb3Modal,
}: {
  provider: Web3Provider | undefined;
  loadWeb3Modal: () => Promise<void>;
  logoutOfWeb3Modal: () => Promise<void>;
}) {
  const [rendered, setRendered] = useState("");

  useEffect(() => {
    async function fetchAccount() {
      try {
        if (!provider) {
          return;
        }

        // Load the user's accounts.
        const accounts = await provider.listAccounts();
        const account = accounts[0];

        // Resolve the ENS name for the first account.
        let  name 
        try {
          name = await provider.lookupAddress(accounts[0]);
        }
        catch{
          console.log("No ens")
        }

        // Render either the ENS name or the shortened account address.
        if (name) {
          setRendered(name);
        } else {
          setRendered(account.substring(0, 5) + "..." + account.substring(37));
        }
      } catch (err) {
        setRendered("");
        console.error(err);
      }
    }
    fetchAccount();
  }, [provider, setRendered]);

  return (
    <button
      className={styles.button}
      onClick={() => {
        if (!provider) {
          loadWeb3Modal();
        } else {
          logoutOfWeb3Modal();
        }
      }}
    >
      {rendered === "" ? "Connect Wallet" : rendered}
    </button>
  );
}
