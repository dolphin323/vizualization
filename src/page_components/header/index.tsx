import React from "react";
import styles from "./styles.module.css";

const buttons = [
  { component: "bubble", label: "Bubble chart" },
  { component: "scatter", label: "Social media" },
  { component: "statistic", label: "Statistics" },
];

const Header = ({ setCurrentComponent }) => {
  return (
    <div style={{ width: "100%", padding: "10px" }}>
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
  );
};

export { Header };
