import { useEffect, useRef } from "react";
import * as d3 from "d3";

type BarChartProps = {
  citation_histogram: number[][];
};

const BarChart: React.FC<BarChartProps> = ({ citation_histogram }) => {
  const years = citation_histogram
    ? citation_histogram.map((item) => item[0])
    : [];
  const data = citation_histogram
    ? citation_histogram.map((item) => item[1])
    : [];
  const svgRef = useRef(null);

  useEffect(() => {
    const w = 400;
    const h = 200;
    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("overflow", "visible");
    svg.selectAll("*").remove();
    const xScale = d3
      .scaleBand()
      .domain(years.map((val) => val.toString()))
      .range([0, w])
      .padding(0.5);

    const yScale = d3
      .scaleLinear()
      .domain([0, Math.max(...data)])
      .range([h, 0]);

    const xAxis = d3.axisBottom(xScale).ticks(data.length);
    const yAxis = d3.axisRight(yScale).ticks(5);

    svg
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(0, ${h})`)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");
    svg.append("g").call(yAxis).attr("transform", `translate(${w}, 0)`);

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip_bar_chart")
      .style("position", "absolute")
      .style("background", "white")
      .style("padding", "5px")
      .style("border-radius", "5px")
      .style("visibility", "hidden");

    svg
      .selectAll(".bar")
      .data(citation_histogram || [])
      .join("rect")
      .attr("x", (v) => xScale(v[0].toString()) || -1)
      .attr("y", (v, i) => yScale(v[1]))
      .attr("width", xScale.bandwidth())
      .attr("height", (val) => h - yScale(val[1]))
      .on("mouseover", function () {
        return tooltip.style("visibility", "visible");
      })
      .on("mousemove", function (event, d) {
        return tooltip
          .style("top", event.pageY + h + "px")
          .style("left", event.pageX + 10 + "px")
          .html(d[1].toString());
      })
      .on("mouseout", function () {
        return tooltip.style("visibility", "hidden");
      });

    return () => {
      svg.selectAll("*").remove();
    };
  }, [citation_histogram]);

  return (
    <div>
      <svg ref={svgRef} />
    </div>
  );
};

export { BarChart };
