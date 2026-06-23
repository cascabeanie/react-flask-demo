/* import { useLoaderData } from "react-router"; */
import styles from "./Home.module.css";
import Map from "../../features/map-feature/Map";
import Collapsible from "../../components/collapsible/Collapsible";

export default function Home() {
  /* const jsonMapData = useLoaderData(); */
  return (
    <>
      <div className={styles.home}>
        <Collapsible />
        <Map /* jsonMapData={jsonMapData} */></Map>
      </div>
    </>
  );
}
