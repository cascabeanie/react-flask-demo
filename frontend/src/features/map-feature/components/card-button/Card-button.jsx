import styles from "./Card-button.module.css";
import { BinocularsIcon } from "@phosphor-icons/react";

export default function CardButton() {
  return (
    <button className={styles.button}>
      <span>view birds</span>
      <BinocularsIcon size={24} />
    </button>
  );
}
