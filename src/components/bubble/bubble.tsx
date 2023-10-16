import React, { Fragment, memo } from "react";
import { ACMFellow } from "@/helpers/getAcmFellowData";

interface IBubbleState {
  bubbleData: ACMFellow;
  textFillColor: string;
  selectedCircle: (content: ACMFellow) => void;
  backgroundColor: string;
  radius: number;
  selectedOption: keyof Pick<ACMFellow, "hindex" | "citations">;
}

const Bubble: React.FunctionComponent<IBubbleState> = ({
  bubbleData,
  textFillColor,
  selectedCircle,
  backgroundColor,
  radius,
  selectedOption,
}) => {
  const fontSize = radius / 4;
  const strokeColor = backgroundColor || "darkgrey";

  return (
    <>
      {bubbleData.fillColor.length > 7 && (
        <defs>
          <pattern
            id="countryImage"
            height="100%"
            width="100%"
            patternContentUnits="objectBoundingBox"
          >
            <image
              xlinkHref={bubbleData.fillColor}
              preserveAspectRatio="none"
              width="1"
              height="1"
              opacity={0.7}
            />
          </pattern>
        </defs>
      )}
      <circle
        style={{ cursor: "pointer" }}
        onClick={() => {
          selectedCircle(bubbleData);
        }}
        id="circleSvg"
        r={radius}
        // fill={bubbleData.fillColor}
        fill={
          bubbleData.fillColor.length <= 7
            ? bubbleData.fillColor
            : "url(#countryImage)"
        }
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
    </>
  );
};

export default memo(Bubble);
