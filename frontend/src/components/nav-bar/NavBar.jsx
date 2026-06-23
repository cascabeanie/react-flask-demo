import styles from "./NavBar.module.css";
import { NavLink } from "react-router";
import { BirdIcon } from "@phosphor-icons/react";

export default function NavBar() {
  return (
    <header>
      <nav className={styles.navigation}>
        <NavLink to="/" className={styles.navigation__logo}>
          <BirdIcon size={32} weight={"fill"} alt={"Bird icon"} />
          <span className={styles.navigation__title}>Local Avians</span>
        </NavLink>
        <ul className={styles.navigation__list}>
          <li className={styles.navigation__item}>
            <NavLink to="/all-species">Species</NavLink>
          </li>
          <li className={styles.navigation__item}>
            <NavLink to="/">Sources</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
