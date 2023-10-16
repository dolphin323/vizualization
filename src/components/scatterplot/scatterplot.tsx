import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { ACMFellow } from "@/helpers/getAcmFellowData";

interface IBasicScatterChartProps {
  height: number;
  width: number;
  data: { hindex: number; subs: number; person: ACMFellow }[];
  selectedOption: string;
  onClick: () => void;
}

const BasicScatterChart: React.FC<IBasicScatterChartProps> = ({
  height,
  width,
  data,
  selectedOption,
  onClick,
}: IBasicScatterChartProps) => {
  const svgRef = useRef(null);
  useEffect(() => {
    const w = width;
    const h = height;

    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("overflow", "visible");

    const xScale = d3
      .scaleSqrt()
      .domain([0, Math.max(...data.map((info) => info.subs))])
      .range([0, w]);

    const yScale =
      selectedOption === "hindex"
        ? d3
            .scaleLinear()
            .domain([0, Math.max(...data.map((info) => info[selectedOption]))])
            .range([h, 0])
        : d3
            .scaleSqrt()
            .domain([0, Math.max(...data.map((info) => info[selectedOption]))])
            .range([h, 0]);

    const xAxis = d3.axisBottom(xScale).ticks(data.length);
    const yAxis = d3.axisLeft(yScale).ticks(15);

    svg
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(0, ${h})`)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

    svg.append("g").call(yAxis);

    svg
      .append("text")
      .attr("x", w - 5)
      .attr("y", h - 10)
      .text("followers");
    svg
      .append("text")
      .attr("y", h / 2)
      .attr("y", -10)
      .text(selectedOption);

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip_scatter")
      .style("position", "absolute")
      .style("background", "white")
      .style("padding", "5px")
      .style("border-radius", "5px")
      .style("visibility", "hidden")
      .style("display", "flex")
      .style("flex-direction", "column");

    svg
      .selectAll()
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.subs))
      .attr("cy", (d) => yScale(d[selectedOption]))
      .attr("r", 3)
      .style("stroke", "white")
      .style("fill", "transparent")
      .on("click", function (event, d) {
        onClick(d.person);
        return tooltip.style("visibility", "hidden");
      })
      .on("mouseover", function () {
        return tooltip.style("visibility", "visible");
      })
      .on("mousemove", function (event, d) {
        return tooltip
          .style("top", event.pageY + 30 + "px")
          .style("left", event.pageX + 10 + "px")
          .html(
            "<span>" +
              d.person.lastName +
              " " +
              d.person.givenName +
              "</span>" +
              "<span>" +
              d[selectedOption] +
              " " +
              d.subs +
              "</span>"
          );
      })
      .on("mouseout", function () {
        return tooltip.style("visibility", "hidden");
      });

    return () => {
      svg.selectAll("*").remove();
    };
  }, [data, selectedOption]);

  return (
    <div style={{ margin: "30px" }}>
      <svg ref={svgRef} />
    </div>
  );
};

export default BasicScatterChart;
