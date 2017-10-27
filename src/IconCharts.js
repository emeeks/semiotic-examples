import React from "react";
import { ORFrame } from "semiotic";
import { data } from "./data/import_export.js";

const countryHash = {
  "United States": "#21f0b6",
  "EU (28)": "#1f9383",
  China: "#85d2e1",
  India: "#154975",
  Japan: "#7377ec",
  Brazil: "#8d30ba",
  Russia: "#dab9ff",
  "South Africa": "#1f3ca6",
  sep: "#6f85a6",
  oct: "#ef76b1",
  nov: "#325b0b",
  dec: "#896c11"
};

const regionHash = {
  "North America": "#21f0b6",
  Europe: "#1f9383",
  Asia: "#85d2e1",
  Other: "#8d30ba"
};

const monthHash = {
  January: "#6f85a6",
  February: "#ef76b1",
  March: "#325b0b",
  April: "#896c11"
};

console.log("data", data);

export default class NetworkDiagrams extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>Put some fun bar chart here</div>;
  }
}
