import { useState, useEffect } from "react";
import { fetchCounties } from "../api/fetch-counties";
import { fetchHomeData } from "../api/fetch-home-data";
// import styles from "./Display-images.module.css";

export default function DisplayCounties() {
  const [selectedCounty, setSelectedCounty] = useState([]);

  // Initialise data as undefined
  // let data;

  // Fetch data on component mount
  useEffect(() => {
    async function loadData() {
      const data = await fetchHomeData();
      console.log("Database data:", data);
      data[0]["img_url"] = "https://gazetteer.org.uk/img/Bedfordshire_Flag.png";
      setSelectedCounty(data[0]);
      // setSelectedCounty(data);
    }

    loadData();
  }, []);

  return (
    <div /* className={styles.grid} */>
      <div>
        <div>{selectedCounty["county_name"]}</div>
        <div>{selectedCounty.info}</div>
        <div>{selectedCounty.info_source}</div>
        <div>{selectedCounty.info_url}</div>
        <img src={selectedCounty.img_url} alt="img test" />
        <div>{selectedCounty.img_title}</div>
        <div>{selectedCounty.img_source}</div>
        <div>{selectedCounty.sightings_in_county}</div>
      </div>

      {/*   {selectedCounty.map((county) => (
        <div key={county.id}>
          <div>{county.county_name}</div>
          <div>{county.info}</div>
          <div>{county.info_source}</div>
          <div>{county.info_url}</div>
          <img src={county.img_url} alt="img test" />
          <div>{county.img_title}</div>
          <div>{county.img_source}</div>
          <div>{county.sightings_in_county}</div>

          <br />
        </div>
      ))} */}
    </div>
  );
}
