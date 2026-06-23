import * as d3 from "d3";
import { useState, useEffect, useRef } from "react";
import { useDimensions } from "../../hooks/use-dimensions";
import styles from "./Map.module.css";
import InfoCard from "./components/info-card/Info-card";
import { fetchHomeData } from "../../api/fetch-home-data";
import jsonMapDataDemo from "../../data/uk-county-map.json";
import { getCountyData } from "./helpers/get-county-data";

// Map code credit:
// https://www.react-graph-gallery.com/map

// Zoom functionality code credit:
// https://observablehq.com/@d3/zoom-to-bounding-box

export default function Map() {
  const jsonMapData = jsonMapDataDemo;

  /*  console.log("in the component: ", jsonMapData); */

  // State to store data from db
  const [counties, setCounties] = useState(null);
  // Fetch data from db on component mount
  useEffect(() => {
    async function loadData() {
      const data = await fetchHomeData();
      console.log("Database data:", data);
      setCounties(data);
    }

    loadData();
  }, []);

  // Get responsive width and height values for map
  const { screenWidth, screenHeight } = useDimensions();
  const width = Math.round(screenWidth * 0.8);
  const height = Math.round(screenHeight * 0.8);

  // Shape of state final data
  // Update IDs to match in json and db!
  /*  {
    ID: feature.properties["ID"]
    countyData: county_Data[feature.properties["ID"]]
  } */

  // State to track selected county
  const [selectedCounty, setSelectedCounty] = useState(null);

  // To be deleted!
  // console.log(jsonMapData.features[0]);
  useEffect(() => {
    console.log(selectedCounty);
  }, [selectedCounty]);

  // Projection for map
  const projection = d3.geoMercator().fitSize([width, height], jsonMapData);

  // Path generator for the projection above
  const geoPathGenerator = d3.geoPath().projection(projection);

  // React refs
  const svgRef = useRef(null);
  const gRef = useRef(null);
  const zoomRef = useRef(null);

  // Setup zoom functionality
  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const zoom = d3
      .zoom()
      .scaleExtent([1, 8])
      .translateExtent([
        [0, 0],
        [width, height],
      ])
      .on("start", (event) => {
        if (event.sourceEvent) {
          setSelectedCounty(null);
        }
      })
      .on("zoom", zoomed);

    zoomRef.current = zoom;

    svg.call(zoom);
  }, []);

  // Zoom function
  function zoomed(event) {
    const g = d3.select(gRef.current);
    const { transform } = event;

    g.attr("transform", transform);
    g.attr("stroke-width", 1 / transform.k);
  }

  // Enable zoom out on svg click
  const handleReset = () => {
    const svg = d3.select(svgRef.current);

    svg
      .transition()
      .duration(750)
      .call(zoomRef.current.transform, d3.zoomIdentity);

    // Reset county selection to null
    setSelectedCounty(null);
  };

  // Enable zoom in on path click
  const handleFeatureClick = (event, feature) => {
    const [[x0, y0], [x1, y1]] = geoPathGenerator.bounds(feature);
    event.stopPropagation();

    const svg = d3.select(svgRef.current);

    svg
      .transition()
      .duration(750)
      .call(
        zoomRef.current.transform,
        d3.zoomIdentity
          .translate(width / 2, height / 2)
          .scale(
            Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)),
          )
          .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
      );

    // Set selected county when path is clicked
    // setSelectedCounty(feature.properties["NAME"]);

    setSelectedCounty(
      getCountyData(
        feature.properties["ID"],
        feature.properties["NAME"],
        counties,
      ),
    );
  };

  // SVG paths
  const allSvgPaths = jsonMapData.features.map((feature) => {
    return (
      <path
        key={feature.properties["ID"]}
        d={geoPathGenerator(feature)}
        name={feature.properties["NAME"]}
        className={`
        ${styles.map__county} 
        ${selectedCounty?.countyName === feature.properties["NAME"] && feature.properties["ID"] !== 98 ? styles["map__county--selected"] : ""}
        ${feature.properties["ID"] === 98 && styles["map__county--roi"]}
        
        `}
        onClick={(e) => {
          handleFeatureClick(e, feature);
        }}
      ></path>
    );
  });

  return (
    <div className={styles.map}>
      <svg
        viewBox={`0, 0, ${width}, ${height}`}
        width={width}
        height={height}
        ref={svgRef}
        onClick={handleReset}
        className={styles.map__graphic}
      >
        <g ref={gRef}>{allSvgPaths}</g>
      </svg>

      <InfoCard county={selectedCounty} />
    </div>
  );
}
