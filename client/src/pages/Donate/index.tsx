import styles from "./styles.module.css";
import { useParams } from "react-router-dom";
export function Donate(props: { project?: number}) {
  let params = useParams();
  console.log(params);
  return (
    <div className={styles.content}>
      <div className={styles.imageBorder}>
        <img
          className={styles.image}
          src="https://d5nunyagcicgy.cloudfront.net/external_assets/hero_examples/hair_beach_v391182663/original.jpeg"
          alt="sad"
        />
      </div>
      <p className={styles.text1}>Donate to Karel.eth</p>
      <p className={styles.text2}>Help me buy a new pc for my family, please I really need it!</p>
      {false && <p>Collected 100 of 10000</p>}
      {false && <p>Donate</p>}
    </div>
  );
}
