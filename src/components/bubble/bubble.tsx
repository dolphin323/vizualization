import React, { useState } from "react";
import uuid from "react-uuid";
import { ACMFellow } from "@/helpers/getAcmFellowData";

interface IBubbleState {
  item: {
    v: number;
    x: number;
    y: number;
  };
  bubbleData: ACMFellow;
  textFillColor: string;
  selectedCircle: (content: ACMFellow) => void;
  backgroundColor: string;
  width: number;
  height: number;
  radius: number;
  selectedOption: keyof Pick<ACMFellow, "hindex" | "citations">;
}

const Bubble: React.FunctionComponent<IBubbleState> = ({
  item,
  bubbleData,
  textFillColor,
  selectedCircle,
  backgroundColor,
  width,
  height,
  radius,
  selectedOption,
}) => {
  const [isShown, setIsShown] = useState(false);

  const fontSize = radius / 4;
  const content = bubbleData.lastName;
  const strokeColor = backgroundColor || "darkgrey";

  return (
    <g
      key={`g-${uuid()}`}
      transform={`translate(${1200 / 2 + item.x - 70}, ${height / 2 + item.y})`}
    >
      <circle
        style={{ cursor: "pointer" }}
        onClick={() => {
          selectedCircle(bubbleData);
        }}
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        id="circleSvg"
        r={radius}
        fill={bubbleData.fillColor}
        stroke={strokeColor}
        strokeWidth="2"
      />
      <text
        onClick={() => {
          selectedCircle(bubbleData);
        }}
        className="bubbleText"
        fill={textFillColor}
        textAnchor="middle"
        fontSize={`${fontSize}px`}
        fontWeight="normal"
      >
        <tspan x="0" y="-1.2em">
          {bubbleData[selectedOption]}
        </tspan>
        <tspan x="0" y="0em">
          {bubbleData.givenName}
        </tspan>
        <tspan x="0" y="1.2em">
          {bubbleData.lastName}
        </tspan>
      </text>
    </g>
  );
};

export default Bubble;
