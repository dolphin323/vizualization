import { useMemo } from "react";
import * as d3 from "d3";

const MARGIN = { top: 30, right: 30, bottom: 30, left: 30 };
const BAR_PADDING = 0.2;

type BarplotProps = {
  width: number;
  height: number;
  data: { name: string; value: number }[];
};

export const HorizontalBarplot = ({ width, height, data }: BarplotProps) => {
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const groups = data.sort((a, b) => b.value - a.value).map((d) => d.name);
  const xScale = useMemo(() => {
    return d3
      .scaleBand()
      .domain(groups)
      .range([0, boundsHeight])
      .padding(BAR_PADDING);
  }, [data, height]);

  const yScale = useMemo(() => {
    const [min, max] = d3.extent(data.map((d) => d.value));
    return d3
      .scaleSqrt()
      .domain([0, max || 10])
      .range([0, boundsWidth]);
  }, [data, width]);

  const allShapes = data.map((d, i) => {
    const x = xScale(d.name);
    if (x === undefined) {
      return null;
    }

    return (
      <g key={i}>
        <rect
          x={yScale(0)}
          y={xScale(d.name)}
          width={yScale(d.value)}
          height={xScale.bandwidth()}
          opacity={0.9}
          stroke="#63d3a1"
          fill="#63d3a1"
          fillOpacity={0.9}
          strokeWidth={1}
          rx={1}
        />
        <text
          x={yScale(d.value) > 90 ? yScale(d.value) - 7 : yScale(d.value) + 60}
          y={x + xScale.bandwidth() / 2}
          textAnchor="end"
          alignmentBaseline="central"
          fontSize={12}
          //   stroke="#D3D3D3"
          strokeWidth={1}
        >
          {d.value}
        </text>
        <text
          x={yScale(0) + 7}
          y={x + xScale.bandwidth() / 2 + 1}
          textAnchor="start"
          alignmentBaseline="central"
          fontSize={11}
          //   stroke="#D3D3D3"
          strokeWidth={1}
        >
          {d.name}
        </text>
      </g>
    );
  });

  const xScaleText = d3
    .scaleSqrt()
    .domain([0, Math.max(...data.map((info) => info.value))])
    .range([0, boundsWidth]);

  const grid = yScale
    .ticks(10)
    .slice(1)
    .map((value, i) => (
      <g key={i}>
        <line
          x1={yScale(value)}
          x2={yScale(value)}
          y1={0}
          y2={boundsHeight}
          stroke="#000000"
          opacity={0.2}
        />
        <text
          x={xScaleText(value)}
          y={boundsHeight}
          textAnchor="middle"
          alignmentBaseline="central"
          fontSize={9}
          stroke="#000000"
          opacity={0.8}
        >
          {value}
        </text>
        <text
          x={boundsWidth / 2}
          y={boundsHeight + 15}
          textAnchor="middle"
          alignmentBaseline="central"
          fontSize={12}
          opacity={0.8}
        >
          ACM fellows
        </text>
      </g>
    ));

  return (
    <div>
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          {grid}
          {allShapes}
        </g>
      </svg>
    </div>
  );
};
