import React, { useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";

const buttons = [
  { component: "bubble", label: "Bubble chart" },
  { component: "scatter", label: "Social media" },
  { component: "statistic", label: "Statistics" },
];

const Header = ({ setCurrentComponent }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        {buttons.map((button) => (
          <button
            key={button.label}
            className={styles.header_button}
            onClick={() => {
              setCurrentComponent(button.component);
            }}
          >
            {button.label}
          </button>
        ))}
      </div>
      <div>
        <Image
          src={"/info.png"}
          alt="info"
          width={30}
          height={30}
          style={{
            borderRadius: 10,
            cursor: "pointer",
          }}
          onClick={() => {
            setVisible(true);
          }}
        />
      </div>
      {visible && (
        <div
          style={{
            position: "absolute",
            alignSelf: "center",
            // width: "100%",
            // height: "100%",
            background: "#ffffff",
            padding: "20px",
            borderRadius: "20px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1 style={{ marginBottom: "20px" }}>Information</h1>
          <span style={{ marginBottom: "20px" }}>
            The visualization is about ACM fellows. As start dataset was used{" "}
            <a
              style={{ textDecoration: "underline" }}
              href="https://github.com/lintool/cs-big-cows/blob/master/acm-fellows/acm_fellows.csv"
            >
              Big Cows dataset
            </a>{" "}
            The bubble chart describes hindex or citations by year for ACM
            fellows, which has a Google Scholar. Data from Google Scholar was
            gathered on 14 October 2023. The social media describes dependency
            between hindex or citations and Twitter followers (data was
            collected on 16 October 2023 and only for the first 200 people in
            the set, which includes 2020-2022 years). The statistics describes
            an evolution of the number of ACM fellows by country. The last year
            can be regulated by the slider in the sidebar.
          </span>
          <span style={{ marginBottom: "20px" }}>
            The main question to take from these visualizations is if we can see
            trends, correlation, or find insights regarding ACM fellows state.
          </span>

          <button
            className={styles.header_button}
            onClick={() => {
              setVisible(false);
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export { Header };
