import React, { useEffect } from "react";
import * as d3 from "d3";
import styles from "./chart.module.css";

const professors = [{ name: "Shane McIntosh", xId: "shane_mcintosh" }];

function drawChart(svgRef: React.RefObject<SVGSVGElement>) {
  const margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 660 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

  const svg = d3
    .select(svgRef.current)
    .append("svg")
    // .attr("width", width + margin.left + margin.right)
    // .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Read the data
  d3.csv(
    "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv"
  ).then(function (csvdata) {
    // Add X axis
    const x = d3.scaleLinear().domain([3, 9]).range([0, width]);
    const xAxis = svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear().domain([0, 9]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Add dots
    svg
      .append("g")
      .selectAll("circle")
      .data(csvdata)
      .join("circle")
      .attr("cx", function (d) {
        return x(d.Sepal_Length);
      })
      .attr("cy", function (d) {
        return y(d.Petal_Length);
      })
      .attr("r", 5);
  });
}

const Chart: React.FunctionComponent = () => {
  const svg = React.useRef<SVGSVGElement>(null);

  useEffect(() => {
    drawChart(svg);
  }, [svg]);

  const getAuthor = async () => {
    // const res = await fetch(
    //   "https://api.semanticscholar.org/graph/v1/author/search"
    // );

    // const data = await res.json();
    // console.log(data);

    const r = await fetch(
      "https://api.semanticscholar.org/graph/v1/author/batch?fields=name,hIndex,citationCount,affiliations",
      {
        method: "POST",
        body: JSON.stringify({ ids: ["1725534", "145580839"] }),
      }
    );
    const jsonRes = await r.json();
    console.log(jsonRes);
  };

  return (
    <div className={styles.chart}>
      <svg ref={svg} width={"600"} height={"600"} />
      <button onClick={getAuthor}>Get Author</button>
    </div>
  );
};

export { Chart };
