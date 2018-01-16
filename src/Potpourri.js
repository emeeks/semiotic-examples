import React from "react"
import { NetworkFrame, ORFrame, XYFrame } from "semiotic"
import flareData from "./data/flare.json"
import beerRaw from "./data/beers"
import bikeRaw from "./data/nyc_bike"
import baseballRaw from "./data/baseball_salary"
import spotifyRaw from "./data/spotify"
import premier_points from "./data/premier_league"
import { AnnotationCalloutElbow } from "react-annotation"
import { csvParse } from "d3-dsv"
import { scaleTime, scaleLog } from "d3-scale"

console.log("premier_points", premier_points)

const beerData = csvParse(beerRaw)
const bikeData = csvParse(bikeRaw).filter((d, i) => i < 30)
const spotifyData = csvParse(spotifyRaw)
const baseballData = csvParse(baseballRaw)

spotifyData.forEach(d => {
  d.acousticness = +d.acousticness
  d.danceability = +d.danceability
})

beerData.forEach(d => {
  d.bitterness = +d.bitterness
  d.ounces = +d.ounces
  d.abv = +d.abv
})

const positions = {}

baseballData.forEach(d => {
  d.salary = +d.salary
  d.value = +d.value
  d.average = +d.average
  positions[d.position] = true
})

console.log("positions", positions)

console.log("baseballData", baseballData)

const bikeBridges = [
  "Brooklyn Bridge",
  "Manhattan Bridge",
  "Williamsburg Bridge",
  "Queensboro Bridge",
  "Total"
]

bikeData.forEach(d => {
  d.Precipitation = +d.Precipitation
  d.Precipitation = isNaN(d.Precipitation) ? 0 : d.Precipitation
  d.temp_high = +d.temp_high
  d.temp_low = +d.temp_low
  d.Date = new Date(d.Date)
  bikeBridges.forEach(p => {
    d[p] = +d[p]
  })
})

const colors = [
  "#aee39a",
  "#5c922f",
  "#7efd7e",
  "#15b71e",
  "#fff655",
  "#b47548",
  "#fd5917",
  "#f4b6c7",
  "#fa217f",
  "#d65b6c",
  "#feba53",
  "#5f80da",
  "brown"
]

const colorHash = {}

Object.keys(positions).forEach((p, i) => {
  colorHash[p] = colors[i % colors.length]
})

const bridgeLines = bikeBridges.map((name, i) => {
  return {
    label: name,
    coordinates: bikeData.map(d => ({ Date: d.Date, value: d[name] })),
    color: colors[i]
  }
})

console.log("colorHash", colorHash)

const quantitativeColors = [
  "#f1cbd5",
  "#f989a4",
  "#fa217f",
  "#a64d6c",
  "#887177"
]

const songAnnotations = spotifyData
  .filter(d => d.acousticness > 0.6 && d.danceability < 0.5)
  .map(d => Object.assign({ type: AnnotationCalloutElbow, label: d.name }, d))

console.log("songAnnotations", songAnnotations)

export default class Potpourri extends React.Component {
  render() {
    return (
      <div>
        <ORFrame
          size={[1000, 500]}
          data={baseballData}
          oAccessor={"team"}
          rAccessor={"salary"}
          type="bar"
          style={d => ({
            fill: colorHash[d.position],
            stroke: "rgba(0,0,0,0)"
          })}
          oPadding={10}
          //          oLabel={true}
          //          axis={{ orient: "left" }}
          margin={10}
          //          rScaleType={scaleLog}
          pieceHoverAnnotation={true}
          tooltipContent={d => (
            <div className="tooltip-content">
              <p>{d.name}</p>
            </div>
          )}
          canvasPieces={true}
          canvasPostProcess={"chuckClose"}
        />
        <ORFrame
          size={[1000, 1000]}
          oLabel={true}
          margin={{ left: 200, top: 50, bottom: 50, right: 30 }}
          pixelColumnWidth={40}
          projection={"horizontal"}
          axis={[
            {
              orient: "top",
              tickValues: [
                0,
                0.01,
                0.02,
                0.03,
                0.04,
                0.05,
                0.06,
                0.07,
                0.08,
                0.09,
                0.1,
                0.11,
                0.12,
                0.13
              ]
            },
            {
              orient: "bottom",
              tickValues: [
                0,
                0.01,
                0.02,
                0.03,
                0.04,
                0.05,
                0.06,
                0.07,
                0.08,
                0.09,
                0.1,
                0.11,
                0.12,
                0.13
              ]
            }
          ]}
          data={beerData}
          oAccessor="style"
          rAccessor="abv"
          summaryType={{ type: "violin", relative: true }}
          summaryStyle={{
            fill: colors[0],
            stroke: colors[1],
            fillOpacity: 0.5
          }}
        />
        <NetworkFrame
          edges={flareData}
          networkType="dendrogram"
          edgeStyle={{ stroke: "darkred" }}
          nodeIDAccessor="name"
        />
        <XYFrame
          size={[1000, 500]}
          lines={bridgeLines}
          xAccessor="Date"
          yAccessor="value"
          lineStyle={d => ({ stroke: d.color, strokeWidth: 2 })}
          axes={[{ orient: "left" }]}
          margin={70}
          hoverAnnotation={true}
        />

        <XYFrame
          points={bikeData}
          xAccessor="Date"
          yAccessor="Total"
          axes={[
            {
              orient: "left",
              label: "Total"
            },
            {
              orient: "bottom",
              label: "Date",
              tickFormat: () => ""
            }
          ]}
          margin={{ top: 10, right: 10, bottom: 60, left: 60 }}
        />
        <XYFrame
          points={spotifyData}
          xAccessor="acousticness"
          yAccessor="danceability"
          axes={[
            {
              orient: "left",
              label: "danceability",
              tickValues: [0.3, 0.5, 0.7, 0.9]
            },
            {
              orient: "bottom",
              label: "acousticness",
              tickValues: [0, 0.2, 0.4, 0.6]
            }
          ]}
          margin={{ top: 10, right: 10, bottom: 60, left: 60 }}
          annotations={songAnnotations}
        />

        <svg height={1000} width={1000}>
          {colors.map((d, i) => (
            <circle fill={d} r={15} cx={20 + i * 40} cy={20} />
          ))}

          {quantitativeColors.map((d, i) => (
            <circle fill={d} r={15} cx={20 + i * 40} cy={80} />
          ))}
        </svg>
      </div>
    )
  }
}
