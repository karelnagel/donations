import styles from "./styles.module.css";
import { useContext } from "react";
import { Context } from "../../interfaces/context";
import { Link } from "react-router-dom";

export function Footer() {
  const { network } = useContext(Context);

  return (
    <div className={styles.footer}>
      <div className={styles.socials}>
        <a href="https://github.com/karelnagel/donations">
          <img src="/icons/github.png" alt="Github" />
        </a>
        <a href={`${network.opensea}/collection/${network.openseaCollection}`}>
          <img src="/icons/opensea.png" alt="Opensea" />
        </a>
        <a href="https://twitter.com/karelETH">
          <img src="/icons/twitter.png" alt="Twitter" />
        </a>
        <a href={`${network.etherscan}${network.contract}`}>
          <img src="/icons/etherscan.png" alt="Etherscan" />
        </a>
      </div>
      <button className={`${styles.button} button`}>
        <Link to={"/this"}>Support this project</Link>
      </button>
      <p>
        Contact me: <a href="mailto:karel@karel.wtf">karel@karel.wtf</a>
      </p>
      <p>Smart contracts have not been audited, so use this at your own risk!</p>
    </div>
  );
}
