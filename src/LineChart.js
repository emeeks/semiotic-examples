import React from "react";
import titleData from "./data/titles.json";
import totalData from "./data/totals.json";

export default class LineChart extends React.Component {
  render() {
    console.log("titleData", titleData);
    console.log("totalData", totalData);
    return <div>A place to put a line chart</div>;
  }
}
