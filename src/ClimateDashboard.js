import React from "react";
import { ketchikan, tucson } from "./data/climate.js";
import { ORFrame, XYFrame } from "semiotic";

const colors = {
  jan: "#21f0b6",
  feb: "#1f9383",
  mar: "#85d2e1",
  apr: "#154975",
  may: "#7377ec",
  jun: "#8d30ba",
  jul: "#dab9ff",
  aug: "#1f3ca6",
  sep: "#6f85a6",
  oct: "#ef76b1",
  nov: "#325b0b",
  dec: "#896c11"
};

const colorHash = {};

let colorI = 0;

console.log("ketchikan", ketchikan);

const makeHoursArray = climateData => {
  let hoursArray = [];
  climateData.forEach(month => {
    const decoratedHours = month.hourlyTemp.map((h, i) => ({
      hour: i,
      temp: h,
      month: month.month
    }));
    hoursArray = [...hoursArray, ...decoratedHours];
  });
  return hoursArray;
};

const makeLinesData = climateData => {
  const lines = [];
  climateData.forEach(month => {
    const lineCoordinates = month.hourlyTemp.map((h, i) => ({
      hour: i,
      temp: h,
      delta_temp: h - month.temp
    }));
    lines.push({ label: month.month, coordinates: lineCoordinates });
  });
  return lines;
};

const ketchikanTemperatureHours = makeHoursArray(ketchikan);
const ketchikanLines = makeLinesData(ketchikan);

console.log("ketchikanTemperatureHours", ketchikanTemperatureHours);
console.log("ketchikanLines", ketchikanLines);

export default class ClimateDashboard extends React.Component {
  render() {
    return <div>MakeClimateGreatAgain</div>;
  }
}
