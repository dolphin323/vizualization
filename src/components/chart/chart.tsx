import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as d3 from "d3";
import styles from "./chart.module.css";
import {
  ACMFellow,
  countryColors,
  getAcmFellowData,
} from "@/helpers/getAcmFellowData";
import BubbleChart from "../bubble_chart/bubble_chart";
import { Dropdown } from "../common/dropdown/dropdown";
import Slider from "../common/slider/slider";
import { BarChart } from "../bar_chart/bar_chart";
import Image from "next/image";
import { ImageWithFallback } from "../common/image_with_fallback/image_with_fallback";

const data = getAcmFellowData();
const dropdownOptions = [
  { value: "hindex", label: "H-index" },
  { value: "citations", label: "Citations" },
];

const Chart: React.FunctionComponent = () => {
  const [page, setPage] = useState(1);
  const [selectedOption, setSelectedOption] =
    useState<keyof Pick<ACMFellow, "hindex" | "citations">>("hindex");
  const [selectedYear, setSelectedYear] = useState(2021);
  const [selectedPerson, setSelectedPerson] = useState<ACMFellow | null>(null);
  const selectedKeyHandler = (person: ACMFellow) => {
    console.log("PERSON", person);
    setSelectedPerson(person);
  };

  const getSelectedOption = (option: { value: string; label: string }) => {
    setSelectedOption(
      option.value as keyof Pick<ACMFellow, "hindex" | "citations">
    );
  };

  const handleChange = useCallback((value: any) => {
    setSelectedYear(value);
  }, []);

  const bubbleData = useMemo(
    () => data.filter((d) => d.year == selectedYear),
    [selectedYear]
  );

  return (
    <div className={styles.chart}>
      <div className={styles.sidebar}>
        <div style={{ marginBottom: "20px" }}>
          <text style={{ color: "#ffffff" }}>Parameter:</text>
          <Dropdown options={dropdownOptions} onChange={getSelectedOption} />
        </div>
        <div style={{ marginBottom: "40px", width: "100%" }}>
          <text style={{ color: "#ffffff" }}>Year:</text>
          <Slider handleChange={handleChange} />
        </div>
        <div>
          <text style={{ color: "#ffffff" }}>Colors:</text>
          <div style={{ display: "flex", gap: 5 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {Object.values(countryColors).map((color) => (
                <div
                  key={color}
                  style={{
                    backgroundColor: color,
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                  }}
                />
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {Object.keys(countryColors).map((color) => (
                <text
                  key={"name" + color}
                  style={{ color: "#ffffff", height: 20 }}
                >
                  {color}
                  {"\n"}
                </text>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.bubbleChart}>
          <BubbleChart
            bubblesData={bubbleData}
            width={900}
            height={700}
            textFillColor="drakgrey"
            backgroundColor="transparent"
            minValue={1}
            maxValue={150}
            selectedCircle={selectedKeyHandler}
            selectedOption={selectedOption}
          />
        </div>
        <div className={styles.info}>
          {selectedPerson ? (
            <Fragment>
              <div
                style={{
                  marginRight: "20px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <ImageWithFallback
                  src={selectedPerson.imageLink}
                  fallbackImage="/avatar_scholar.png"
                  alt="profile image"
                  width={200}
                  height={200}
                />
                <a
                  href={selectedPerson.googleScholarProfile}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.linkToGS}
                >
                  google scholar
                </a>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                }}
              >
                <span>
                  {selectedPerson?.givenName + " " + selectedPerson?.lastName}
                  {"\n"}
                </span>
                <span>Location: {selectedPerson.location}</span>
                <span>Year when was a ACM fellow: {selectedPerson.year}</span>
                <span>Why a ACM fellow: {selectedPerson.citation}</span>
              </div>
              <div style={{ margin: "0px 20px 20px 20px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span>Citations: {selectedPerson.citations}</span>
                  <span>h-index: {selectedPerson.hindex}</span>
                  <span>i10-index: {selectedPerson.i10index}</span>
                </div>
                <BarChart
                  citation_histogram={selectedPerson?.citation_histogram}
                />
              </div>
            </Fragment>
          ) : (
            <span>Click on bubble to know more!</span>
          )}
        </div>
      </div>
    </div>
  );
};

export { Chart };
