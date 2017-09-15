import React from "react";
import titleData from "./data/titles.json";
import totalData from "./data/totals.json";
import { ORFrame } from "semiotic";

const colors = [
  "#21f0b6",
  "#1f9383",
  "#85d2e1",
  "#154975",
  "#7377ec",
  "#8d30ba",
  "#dab9ff",
  "#1f3ca6",
  "#6f85a6",
  "#f75ef0"
];

const colorHash = {};

let colorI = 0;

const titlePieces = [];

titleData.forEach((t, i) => {
  if (!colorHash[t.studio]) {
    colorHash[t.studio] = colors[colorI];
    colorI = (colorI + 1) % 10;
  }
  t.coordinates.forEach(c => {
    titlePieces.push({
      ...t,
      ...c
    });
  });
});

console.log("colorHash", colorHash);

console.log("totalData", totalData);
console.log("titleData", titleData);
console.log("titlePieces", titlePieces);

export default class BarChart extends React.Component {
  render() {
    return <div>Put a Bar Chart Here </div>;
  }
}
