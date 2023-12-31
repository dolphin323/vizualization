import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { SimulationNodeDatum } from "d3-force";
import Bubble from "../bubble/bubble";
import { ACMFellow } from "@/helpers/getAcmFellowWithScholarData";
import uuid from "react-uuid";

namespace Types {
  export type Data = {
    id: number;
    name: string;
    size: number;
    fillColor: string;
  };

  export type ForceData = {
    size: number;
  };
}

interface IBubbleChartProps {
  bubblesData: ACMFellow[];
  width: number;
  height: number;
  backgroundColor: string;
  textFillColor: string;
  minValue: number;
  maxValue: number;
  selectedOption: keyof Pick<ACMFellow, "hindex" | "citations">;
  selectedCircle: (content: ACMFellow) => void;
}

const BubbleChart: React.FunctionComponent<IBubbleChartProps> = ({
  bubblesData,
  width,
  height,
  backgroundColor,
  textFillColor,
  minValue,
  maxValue,
  selectedCircle,
  selectedOption,
}) => {
  const svg = useRef();
  const [forceData, setForceData] = useState<
    {
      size: number;
    }[]
  >(bubblesData.map((bubble) => ({ size: bubble[selectedOption] })));
  const [state, setState] = useState({
    data: [],
  });

  const animateBubbles = () => {
    if (bubblesData.length > 0) {
      simulatePositions(forceData);
    }
  };

  useEffect(() => {
    animateBubbles();
  }, []);

  useEffect(() => {
    setForceData(
      bubblesData.map((bubble) => ({ size: bubble[selectedOption] }))
    );
    animateBubbles();
  }, [bubblesData, selectedOption]);

  const radiusScale = (value: d3.NumberValue) => {
    const fx =
      selectedOption === "hindex"
        ? d3.scaleSqrt().range([1, 60]).domain([minValue, maxValue])
        : d3.scaleLog().range([1, 20]).domain([minValue, maxValue]);

    return fx(value);
  };

  const simulatePositions = (data: Types.ForceData[]) => {
    d3.forceSimulation()
      // .force("charge", d3.forceManyBody().strength(-15))
      .nodes(data as SimulationNodeDatum[])
      // .velocityDecay(0.05)
      .force("x", d3.forceX().strength(0.1))
      .force("y", d3.forceY().strength(0.3))
      .force("charge", d3.forceManyBody().strength(-15))
      .force(
        "collide",
        d3
          .forceCollide()
          .strength(0.5)
          .radius((d, index) => {
            return (
              radiusScale(
                bubblesData[index] ? bubblesData[index][selectedOption] : 1
              ) + 2
            );
          })
      )
      .on("tick", () => {
        setState({ data: data as never[] });
      });
  };

  const renderBubbles = (data: []) => {
    return data.map((item: { v: number; x: number; y: number }, index) => {
      if (bubblesData[index]) {
        return (
          <g
            key={`g-${uuid()}`}
            transform={`translate(${1200 / 2 + item.x - 70}, ${
              height / 2 + item.y
            })`}
            xlinkHref="https://static.vecteezy.com/system/resources/previews/006/060/117/large_2x/round-chinese-flag-icon-isolated-on-white-background-the-flag-of-china-in-a-circle-free-vector.jpg"
          >
            <Bubble
              key={bubblesData[index].givenName + bubblesData[index].lastName}
              bubbleData={bubblesData[index]}
              textFillColor={textFillColor}
              selectedCircle={selectedCircle}
              backgroundColor={backgroundColor}
              selectedOption={selectedOption}
              radius={radiusScale(
                bubblesData[index][selectedOption]
                  ? { size: bubblesData[index][selectedOption] }.size
                  : 1
              )}
            />
          </g>
        );
      }
    });
  };

  return (
    <div
      aria-hidden="true"
      id="chart"
      style={{
        background: backgroundColor,
        cursor: "pointer",
        minWidth: "1000px",
      }}
    >
      <svg
        height="100%"
        width="100%"
        preserveAspectRatio="xMidYmid"
        viewBox="0 0 1100 700"
      >
        {/* <img
          src="https://static.vecteezy.com/system/resources/previews/006/060/117/large_2x/round-chinese-flag-icon-isolated-on-white-background-the-flag-of-china-in-a-circle-free-vector.jpg"
          alt="Background Image"
        /> */}
        {renderBubbles(state.data as [])}
      </svg>
    </div>
  );
};

export default BubbleChart;
