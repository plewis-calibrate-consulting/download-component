import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';


const data = [
  { date: '2013-01', value: 53 },
  { date: '2013 - 02', value: 165 },
  { date: '2013 - 03', value: 269 },
  { date: '2013 - 04', value: 344 },
  { date: '2013 - 05', value: 376 },
  { date: '2013 - 06', value: 410 },
  { date: '2013 - 07', value: 421 },
  { date: '2013 - 08', value: 405 },
  { date: '2013 - 09', value: 376 },
  { date: '2013 - 10', value: 359 },
  { date: '2013 - 11', value: 392 },
  { date: '2013 - 12', value: 433 },
  { date: '2014 - 01', value: 455 },
  { date: '2014 - 02', value: 478 }
]



const BarChart = () => {
  const ref = useRef(null);

  useEffect(() => {

    const width = 800;
    const height = 500;

    const svg = d3.select(ref.current).attr('width', width + 50).attr('height', height + 50)

    const margin = { top: 20, right: 20, bottom: 70, left: 40 }
  

    const x = d3.scaleBand()
      .domain(data.map(d => d.date))
      .range([50, width])
      .padding([0.1])

    const y = d3.scaleLinear()
      .domain([0, d3.max(data.map(d => d.value))])
      .range([height, 0]);

      svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)");

    svg.append("g")
      .attr("class", "y axis")
      .attr("transform", `translate(${0 + 50},0)`)
      .call(d3.axisLeft(y))
      .append("text")
      .attr("transform", `translate(${100}, 0)`)
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Value ($)");

    svg.selectAll("bar")
      .data(data)
      .enter().append("rect")
      .style("fill", "steelblue")
      .attr("x", function (d) { return x(d.date); })
      .attr("width", x.bandwidth())
      .attr("y", function (d) { return y(d.value); })
      .attr("height", function (d) { return height - y(d.value); });

  }, []);

  return <svg ref={ref} />
}

export default BarChart;