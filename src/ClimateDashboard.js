import React from "react"
import { ketchikan, tucson } from "./data/climate.js"
import {
  ORFrame,
  XYFrame,
  ResponsiveXYFrame,
  ResponsiveORFrame
} from "semiotic"
import { sum } from "d3-array"

const colorHash = {
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
}

const makeHoursArray = climateData => {
  let hoursArray = []
  climateData.forEach(month => {
    const decoratedHours = month.hourlyTemp.map((h, i) => ({
      hour: i,
      temp: h,
      month: month.month
    }))
    hoursArray = [...hoursArray, ...decoratedHours]
  })
  return hoursArray
}

const makeLinesData = climateData => {
  const lines = []
  climateData.forEach(month => {
    const lineCoordinates = month.hourlyTemp.map((h, i) => ({
      hour: i,
      temp: h,
      delta_temp: h - month.temp
    }))
    lines.push({ label: month.month, coordinates: lineCoordinates })
  })
  return lines
}

const ketchikanTemperatureHours = makeHoursArray(ketchikan)
const tucsonTemperatureHours = makeHoursArray(tucson)
const ketchikanLines = makeLinesData(ketchikan)

export default class ClimateDashboard extends React.Component {
  render() {
    const directionalSolarCharts = ketchikan.map(month => {
      return (
        <div
          style={{ width: "300px", height: "300px", display: "inline-block" }}
          key={month.month}
        >
          <ORFrame
            title={month.month}
            size={[300, 300]}
            rExtent={[0, 500]}
            data={month.directionalSolar}
            oAccessor="direction"
            rAccessor="value"
            axis={{ orient: "left" }}
            type="bar"
            style={{ fill: "darkred" }}
            oPadding={5}
            projection={"radial"}
            margin={{ top: 0, left: 50, right: 20, bottom: 0 }}
          />
        </div>
      )
    })

    const directionalSolarChartsTucson = tucson.map(month => {
      return (
        <div
          style={{ width: "300px", height: "300px", display: "inline-block" }}
          key={month.month}
        >
          <ORFrame
            title={month.month}
            size={[300, 300]}
            rExtent={[0, 500]}
            data={month.directionalSolar}
            oAccessor="direction"
            rAccessor="value"
            axis={{ orient: "left" }}
            type="point"
            connectorType={() => true}
            connectorStyle={{ stroke: "lightblue", strokeWidth: 2 }}
            style={{ fill: "lightblue" }}
            oPadding={5}
            projection={"radial"}
            margin={{ top: 0, left: 50, right: 20, bottom: 0 }}
          />
        </div>
      )
    })

    return (
      <div>
        <ResponsiveORFrame
          size={[800, 400]}
          responsiveWidth={true}
          data={tucsonTemperatureHours}
          oAccessor="month"
          rAccessor="hour"
          summaryStyle={d => ({
            fill: colorHash[d.month],
            stroke: "white",
            opacity: 0.95
          })}
          summaryType={{
            type: "histogram",
            bins: 24,
            binValue: d => sum(d.map(p => p.temp)),
            amplitude: 40,
            relative: true
          }}
          oLabel={true}
          margin={{ top: 10, left: 50, bottom: 10, right: 50 }}
          projection="horizontal"
          summaryHoverAnnotation={true}
        />
        <ResponsiveXYFrame
          title={"Delta in Hourly Temperature in Ketchikan"}
          size={[1000, 400]}
          responsiveWidth={true}
          lines={ketchikanLines}
          xAccessor="hour"
          yAccessor="delta_temp"
          lineStyle={d => ({ stroke: colorHash[d.label], strokeWidth: 2 })}
          axes={[{ orient: "left" }, { orient: "bottom" }]}
          margin={{ left: 50, bottom: 50, top: 50, right: 150 }}
          legend={true}
        />
        <div>
          <h2>Ketchikan</h2>
          <ResponsiveORFrame
            size={[600, 200]}
            responsiveWidth={true}
            oAccessor="month"
            rAccessor="temp"
            data={ketchikan}
            oPadding={5}
            oLabel={true}
            type={{
              type: "bar",
              customMark: (d, i, xy) => {
                return (
                  <g>
                    <rect
                      height={xy.height}
                      width={5}
                      x={xy.middle - 2.5}
                      style={{ fill: "#21f0b6", stroke: "black" }}
                    />
                    <circle
                      r={10}
                      cx={xy.middle}
                      cy={10}
                      style={{ fill: "#1f9383", stroke: "black" }}
                    />
                  </g>
                )
              }
            }}
            axis={{ orient: "left" }}
            style={{ fill: "darkred" }}
            margin={{ top: 10, left: 50, right: 10, bottom: 40 }}
          />
          {directionalSolarCharts}
        </div>
        <div>
          <h2>Tucson</h2>
          {directionalSolarChartsTucson}
        </div>
      </div>
    )
  }
}
