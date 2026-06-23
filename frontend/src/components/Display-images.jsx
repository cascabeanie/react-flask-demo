import { useState, useEffect } from "react";
import { fetchImages } from "../api/fetch-images";
import styles from "./Display-images.module.css";

export default function DisplayImages() {
  const [images, setImages] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    async function loadData() {
      const data = await fetchImages();
      console.log("Database data:", data);
      setImages(data);
    }

    loadData();
  }, []);

  return (
    <div className={styles.grid}>
      {images.map((image) => (
        <div key={image.id}>
          <div>{image.common_name}</div>
          <div>{image.taxon_code}</div>
          <div>{image.image_source}</div>
          <img src={image.image_url} alt="Bird image test" />
          <br />
        </div>
      ))}
    </div>
  );
}
