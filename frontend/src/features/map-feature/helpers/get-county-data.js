export function getCountyData(id, countyName, data) {
  const countyData = data.counties.find((county) => {
    return county.id == id;
  });

  return {
    id: id,
    countyName: countyName,
    flagLicense: countyData.flag_license,
    flagSource: countyData.flag_source,
    flatTitle: countyData.flag_title,
    flagUrl: countyData.flag_url,
    sightings: countyData.sightings_in_county,
  };
}

// feature.properties["ID"]

/* const data = {
  counties: [
    {
      flag_license: "Public domain",
      flag_source: "Hogweard",
      flag_title: "Flag of Bedfordshire",
      flag_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Bedfordshire_County_Flag.svg/960px-Bedfordshire_County_Flag.svg.png",
      id: 1,
      sightings_in_county: 75,
    },
    {
      flag_license: "Public domain",
      flag_source: "Hogweard",
      flag_title: "Flag of Surrey",
      flag_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Bedfordshire_County_Flag.svg/960px-Bedfordshire_County_Flag.svg.png",
      id: 2,
      sightings_in_county: 77,
    },
    {
      flag_license: "Public domain",
      flag_source: "Hogweard",
      flag_title: "Flag of Kent",
      flag_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Bedfordshire_County_Flag.svg/960px-Bedfordshire_County_Flag.svg.png",
      id: 3,
      sightings_in_county: 104,
    },
  ],
}; */

// console.log(getCountyData(2, "Surrey", data));
