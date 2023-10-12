import { parse } from "csv-parse";

import dt from "../data/combined_final_fixed.csv";

type ACMFellow = {
  index: number;
  lastName: string;
  givenName: string;
  year: number;
  location: string;
  citation: string;
  acmFellowProfile: string;
  dblpProfile: string;
  googleScholarProfile: string;
  affiliation: string;
  acmInterests: string;
  authorID: string;
  citation_histogram: number[][];
  citations: number;
  hindex: number;
  i10index: number;
  fillColor: string;
  interests: string;
  imageLink: string;
};

const generateRandomCode = () => {
  var letters = "BCDEF".split("");
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
};
const countryColors: { [key: string]: string } = {
  Australia: "#FFBFCE",
  Austria: "#E6A6C9",
  Belgium: "#DCBCDF",
  Brazil: "#BCCDCB",
  Canada: "#f4bfff",
  Chile: "#DCCDCF",
  China: "#BFEBDC",
  Denmark: "#FFF8D1",
  France: "#FFBA63",
  Germany: "#F4E0FF",
  Greece: "#C6B6F0",
  "Hong Kong": "#94D2C9",
  Hungary: "#CEDAA0",
  India: "#F0E9C4",
  Israel: "#F8CECA",
  Italy: "#CCD8E9",
  Japan: "#C7EE9F",
  Malaysia: "#D2D6C3",
  Mexico: "#FFF3E3",
  Netherlands: "#F7D4D2",
  "New Zealand": "#D4B4CD",
  Poland: "#83A14F",
  "Republic of Korea": "#B54179",
  "Scotland Uk": "#FFDDFA",
  Singapore: "#ADA5D6",
  Spain: "#CAE2E8",
  Sweden: "#FFFEED",
  Switzerland: "#FAE0B7",
  Taiwan: "#DBACAB",
  USA: "#FFBAC3",
  "United Kingdom": "#ca9bf7",
};

const getAcmFellowData = (page: number = 1): ACMFellow[] => {
  //   console.log(dt.slice(0, 15));

  const result = (dt as ACMFellow[])
    // .slice((page - 1) * 15, page * 15)
    .map((prof) => {
      if (!countryColors[prof.location]) {
        countryColors[prof.location] = generateRandomCode();
      }
      if (prof.citation_histogram) {
        const content = (prof.citation_histogram as string).slice(2, -2); // Remove leading "((" and trailing "))" from the string
        const tuples = content.split("), (");

        // Process the tuples and convert them to arrays of numbers
        const resultArray = tuples.map(function (tuple) {
          const values = tuple.split(", ");
          return [
            parseInt(values[0].replace(/'/g, "")),
            parseInt(values[1].replace(/'/g, "")),
          ];
        });

        prof.citation_histogram = resultArray;
      }

      return { fillColor: countryColors[prof.location], ...prof };
    });
  console.log(countryColors);
  return result;
};

export { getAcmFellowData, countryColors, type ACMFellow };
