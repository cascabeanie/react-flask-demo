import { useState, useEffect } from "react";
import { fetchSpecies } from "../api/fetch-species";

export default function DisplaySpeciesData() {
  const [speciesData, setSpeciesData] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    async function loadData() {
      const data = await fetchSpecies();
      console.log("Database data:", data);
      setSpeciesData(data);
    }

    loadData();
  }, []);

  return (
    <div>
      {speciesData.map((species) => (
        <div key={species.id}>
          <div>{species.common_name}</div>
          <div>{species.scientific_name}</div>
          <br />
        </div>
      ))}
    </div>
  );
}
