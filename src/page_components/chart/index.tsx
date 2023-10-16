import React, { useCallback, useMemo, useState } from "react";
import styles from "./styles.module.css";
import {
  ACMFellow,
  // countryCount,
  getAcmFellowWithScholarData,
  getAcmFellowWithTwitterData,
  getCountryCount,
} from "@/helpers/getAcmFellowData";
import FellowInfo from "../fellow_info";
import { Sidebar } from "../sidebar";
import { Header } from "../header";
import { HorizontalBarplot } from "@/components/horizontal_bar_chart";
import BubbleChart from "@/components/bubble_chart/bubble_chart";
import BasicScatterChart from "@/components/scatterplot/scatterplot";

const components = {
  bubble: "bubble",
  scatter: "scatter",
  statistic: "statistic",
};

const data = getAcmFellowWithScholarData();
const fellowsWithTwitter = getAcmFellowWithTwitterData().map((info) => ({
  hindex: info.hindex,
  citations: info.citations,
  subs: info.twitterNumberOfFollowers,
  person: info,
}));

const Chart: React.FunctionComponent = () => {
  const [selectedOption, setSelectedOption] =
    useState<keyof Pick<ACMFellow, "hindex" | "citations">>("hindex");
  const [selectedYear, setSelectedYear] = useState(2022);
  const [selectedPerson, setSelectedPerson] = useState<ACMFellow | null>(null);
  const [currentComponent, setCurrentComponent] = useState(components.bubble);

  const selectedKeyHandler = (person: ACMFellow) => {
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
    <>
      <Header setCurrentComponent={setCurrentComponent} />
      <div className={styles.chart}>
        <Sidebar
          handleChangeYear={handleChange}
          handleSelectOption={getSelectedOption}
        />
        <div className={styles.mainContent}>
          <div className={styles.bubbleChart}>
            {currentComponent === components.statistic && (
              <HorizontalBarplot
                width={900}
                height={700}
                data={(() => {
                  const transformedData = [];
                  const countryCount = getCountryCount(selectedYear);
                  for (const country in countryCount) {
                    transformedData.push({
                      name: country,
                      value: countryCount[country],
                    });
                  }
                  return transformedData;
                })()}
              />
            )}
            {currentComponent === components.bubble && (
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
            )}
            {currentComponent === components.scatter && (
              <BasicScatterChart
                width={900}
                height={700}
                top={10}
                right={50}
                bottom={50}
                left={50}
                fill="tomato"
                data={fellowsWithTwitter}
                onClick={selectedKeyHandler}
                selectedOption={selectedOption}
              />
            )}
          </div>
          <FellowInfo acmFellow={selectedPerson} />
        </div>
      </div>
    </>
  );
};

export { Chart };
