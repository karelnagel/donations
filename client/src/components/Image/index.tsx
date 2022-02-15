import styles from "./styles.module.css";

export function Image({ onClick, image }: any) {
  return (
    <div className={styles.imageBorder} onClick={onClick}>
      {image && <img className={styles.image} src={image} alt="" />}
    </div>
  );
}
