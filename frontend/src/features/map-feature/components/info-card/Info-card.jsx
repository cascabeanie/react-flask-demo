import CardButton from "../card-button/Card-button";
import styles from "./Info-card.module.css";

export default function InfoCard({ county }) {
  console.log("info card component: ", county);

  return (
    <div className={`${styles.card} ${!county && styles["card--hidden"]}`}>
      <img
        src={county?.flagUrl}
        alt={county?.flatTitle}
        className={styles.card__image}
      />
      <div className={styles.card__content}>
        <h2 className={styles.card__title}>{county?.countyName}</h2>
        {county?.countyName !== "Republic of Ireland" ? (
          <p className={styles.card__records}>
            {county?.sightings} species observed
          </p>
        ) : (
          <p className={styles.card__records}>
            The Rebuplic of Ireland is not part of the UK, so there is no RSPB
            data available.
          </p>
        )}
        {county?.countyName !== "Republic of Ireland" && <CardButton />}
      </div>
    </div>
  );
}
