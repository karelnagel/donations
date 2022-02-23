import styles from "./styles.module.css";

export function Image({ onClick, image, edit=false }: { onClick?: React.MouseEventHandler<HTMLDivElement>; image: string; edit?: boolean }) {
  return (
    <div className={styles.imageBorder} onClick={onClick}>
      {image && <img className={styles.image} src={image} alt="" />}
      {!image && edit && <p>Click to edit</p>}
    </div>
  );
}
