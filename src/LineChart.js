import React from "react";
import titleData from "./data/titles.json";
import totalData from "./data/totals.json";
import { ResponsiveXYFrame } from "semiotic";
import { scaleTime } from "d3-scale";
import { AnnotationCalloutElbow } from "react-annotation";

const tooltipCreator = d => (
  <div className="tooltip-content">
    <p>{d.parentLine.title}</p>
    <p>Gross: {d.grossWeekly}</p>
    <p>Week {d.week}</p>
  </div>
);

export default class LineChart extends React.Component {
  render() {
    const axes = [
      {
        orient: "left",
        tickFormat: d => d / 1000000 + "m"
      },
      { orient: "bottom", tickFormat: d => d.getMonth() }
    ];
    const annotations = [
      {
        type: "y",
        grossWeekly: 150000000,
        label: "Opening Day Blockbuster"
      },
      {
        date: "2016-07-01",
        title: "Finding Dory",
        dx: 30,
        dy: -50,
        type: AnnotationCalloutElbow,
        label: "Very important day"
      }
    ];
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <ResponsiveXYFrame
          size={[800, 400]}
          responsiveWidth={true}
          lines={titleData.filter((d, i) => i < 50)}
          lineStyle={d => ({
            stroke: d.title.length > 10 ? "blue" : "red",
            fill: d.title.length > 10 ? "blue" : "red",
            strokeOpacity: 1,
            fillOpacity: 0.25
          })}
          lineType={"line"}
          lineIDAccessor={d => d.title}
          xScaleType={scaleTime()}
          xAccessor={d => new Date(d.date)}
          yAccessor={"grossWeekly"}
          hoverAnnotation={true}
          tooltipContent={tooltipCreator}
          axes={axes}
          annotations={annotations}
        />
      </div>
    );
  }
}
