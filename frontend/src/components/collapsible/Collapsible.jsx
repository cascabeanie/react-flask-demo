import { useState /* useEffect */ } from "react";
import styles from "./Collapsible.module.css";
import { CaretDownIcon } from "@phosphor-icons/react";

// make text content dynamic by using props for the text data

export default function Collapsible() {
  const [isExpanded, setIsExpanded] = useState(false);

  /*  useEffect(() => {
    console.log(isExpanded);
  }, [isExpanded]); */

  return (
    <div
      className={`${styles.collapsible} ${isExpanded ? styles["collapsible--expanded"] : ""}`}
    >
      <div
        className={styles.collapsible__title}
        onClick={() => {
          return isExpanded ? setIsExpanded(false) : setIsExpanded(true);
        }}
      >
        <h1>How do I use this map?</h1>
        <CaretDownIcon
          size={24}
          weight={"bold"}
          className={`${styles.collapsible__caret} ${isExpanded ? styles["collapsible__caret--expanded"] : ""}`}
        />
      </div>

      <div
        className={`${styles.collapsible__content} ${isExpanded ? styles["collapsible__content--expanded"] : ""}`}
      >
        <p className={styles.collapsible__answer}>
          This map shows all of the ceremonial counties in the United Kingdom.
          Clicking on a county will allow you to view more information on your
          selected county and see the birds recorded in that area.
        </p>
      </div>
    </div>
  );
}
