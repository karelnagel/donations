import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import YouTube from "react-youtube";
import { Spacer } from "../../components/Spacer";
import { Projects } from "../Projects";

export function Home() {
  return (
    <div className={styles.content}>
      <div className={styles.firstSection}>
        <Spacer height="10px" />
        <p className={styles.title}>Ethereum donations for creators</p>

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
    </div>
  );
}
