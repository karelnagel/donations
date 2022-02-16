import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import YouTube from "react-youtube";
import { Spacer } from "../../components/Spacer";
import { Projects } from "../Projects";
import { useContext } from "react";
import { Context } from "../../interfaces/context";

export function Home() {
  const { network } = useContext(Context);
  return (
    <div className={styles.content}>
      <div className={styles.firstSection}>
        <Spacer height="10px" />
        <p className={styles.title}>Decentralized donations for creators</p>

        <div className={styles.props}>
          <p>any erc20</p>
          <span>|</span>
          <p>opensource</p>
          <span>|</span>
          <p>on polygon</p>
          <span>|</span>
          <p>No commission</p>
          <span>|</span>
          <p>NFTs for donators</p>
          <span>|</span>
          <p>overlays for streaming</p>
        </div>
        <button className={`${styles.button} button`}>
          <Link to={"/new"}>Create new project</Link>
        </button>
        {/* <p>The smart contracts aren't audited so use at your own risk</p> */}
      </div>

      <div className={styles.videoSection}>
        <p className={styles.title2}>How to use</p>
        <Spacer height="20px" />
        <YouTube videoId={"yqWX86uT5jM"} className={styles.video} />
      </div>
      <Projects count={3} />
      <Spacer height="30px" />
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
      </div>
    </div>
  );
}
