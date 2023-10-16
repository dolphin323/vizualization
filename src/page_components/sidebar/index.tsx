import React, { Fragment } from "react";
import styles from "./styles.module.css";
import { countryColors } from "@/helpers/getAcmFellowData";
import { Dropdown } from "@/components/common/dropdown/dropdown";
import Slider from "@/components/common/slider/slider";
import Image from "next/image";

const dropdownOptions = [
  { value: "hindex", label: "H-index" },
  { value: "citations", label: "Citations" },
];

const Sidebar: React.FunctionComponent = ({
  handleChangeYear,
  handleSelectOption,
}) => {
  return (
    <>
      <div className={styles.sidebar}>
        <div style={{ marginBottom: "20px" }}>
          <text style={{ color: "#ffffff" }}>Parameter:</text>
          <Dropdown options={dropdownOptions} onChange={handleSelectOption} />
        </div>
        <div style={{ marginBottom: "40px", width: "100%" }}>
          <text style={{ color: "#ffffff" }}>Year:</text>
          <Slider handleChange={handleChangeYear} />
        </div>
        <div>
          <text style={{ color: "#ffffff" }}>Colors:</text>
          <div style={{ display: "flex", gap: 5 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {Object.values(countryColors).map((color) => (
                <Fragment key={color}>
                  {color.length <= 7 ? (
                    <div
                      style={{
                        backgroundColor: color,
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                      }}
                    />
                  ) : (
                    <Image
                      src={color}
                      alt="flag"
                      width={20}
                      height={20}
                      style={{
                        borderRadius: 10,
                      }}
                    />
                  )}
                </Fragment>
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
    </>
  );
};

export { Sidebar };
