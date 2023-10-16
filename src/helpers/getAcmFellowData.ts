import { parse } from "csv-parse";

import dt from "../data/merged_sorted_index.csv";

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
  twitterProfile: string;
  twitterNumberOfFollowers: number;
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
  Australia: "#befcab",
  Austria: "/flags/austria.png",
  Belgium: "/flags/belgium.png",
  Brazil: "/flags/brazil.png",
  Canada: "#f23c16",
  Chile: "/flags/chile.png",
  China: "#BFEBDC",
  Denmark: "#FFF8D1",
  Egypt: "/flags/egypt.png",
  France: "#FFBA63",
  Germany: "#f3949c",
  Greece: "#01d4a2",
  "Hong Kong": "#94D2C9",
  Hungary: "/flags/hungary.png",
  India: "#F0E9C4",
  Israel: "#F8CECA",
  Italy: "#CCD8E9",
  Japan: "#C7EE9F",
  Malaysia: "/flags/malaysia.jpg",
  Mexico: "/flags/mexico.png",
  Netherlands: "#F7D4D2",
  "New Zealand": "/flags/new_zeland.png",
  Poland: "/flags/poland.jpg",
  Portugal: "/flags/portugal.jpg",
  "Republic of Korea": "/flags/korea.png",
  "Scotland Uk": "#7fc4a4",
  Singapore: "/flags/singapore.jpg",
  Spain: "#CAE2E8",
  Sweden: "#FFFEED",
  Switzerland: "#FAE0B7",
  Taiwan: "#DBACAB",
  Turkey: "/flags/turkey.png",
  USA: "#bfa3e2",
  "United Kingdom": "#399acc",
};

const countryCountAll = {
  Australia: 9,
  Austria: 3,
  Belgium: 2,
  Brazil: 1,
  Canada: 30,
  Chile: 1,
  China: 20,
  Denmark: 6,
  France: 11,
  Germany: 26,
  Greece: 4,
  "Hong Kong": 6,
  Hungary: 1,
  India: 11,
  Israel: 24,
  Italy: 13,
  Japan: 4,
  Malaysia: 1,
  Mexico: 1,
  Netherlands: 4,
  "New Zealand": 1,
  Poland: 1,
  Portugal: 1,
  "Republic of Korea": 4,
  "Scotland Uk": 1,
  Singapore: 2,
  Spain: 5,
  Sweden: 6,
  Switzerland: 18,
  Taiwan: 7,
  USA: 720,
  "United Kingdom": 29,
};

const getCountryCount = (year: number) => {
  const countryCount: { [key: string]: number } = {};
  const result = (dt as ACMFellow[])
    .filter((data) => data.year <= year)
    .map((prof) => {
      if (countryCount[prof.location]) {
        countryCount[prof.location] += 1;
      } else {
        countryCount[prof.location] = 1;
      }
    });
  return countryCount;
};

const getAcmFellowWithScholarData = (page: number = 1): ACMFellow[] => {
  const result = (dt as ACMFellow[])
    .filter((data) => Boolean(data.googleScholarProfile))
    .map((prof) => {
      if (!countryColors[prof.location]) {
        countryColors[prof.location] = generateRandomCode();
      }
      if (typeof prof.citation_histogram === "string") {
        const content = (prof.citation_histogram as string).slice(2, -2); // Remove leading "((" and trailing "))" from the string
        const tuples = content.split("), (");

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
  return result;
};

const getAcmFellowWithTwitterData = (): ACMFellow[] => {
  const result = (dt as ACMFellow[]).filter((data) =>
    Boolean(data.twitterProfile)
  );
  return result;
};

export {
  getAcmFellowWithScholarData,
  getAcmFellowWithTwitterData,
  getCountryCount,
  countryColors,
  type ACMFellow,
};
