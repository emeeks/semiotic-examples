import React from "react"
import { NetworkFrame, ORFrame, XYFrame } from "semiotic"
import flareData from "./data/flare.json"
import beerRaw from "./data/beers"
import bikeRaw from "./data/nyc_bike"
import spotifyRaw from "./data/spotify.csv"
import { csvParse } from "d3-dsv"

const beerData = csvParse(beerRaw)
const bikeData = csvParse(bikeRaw)
const spotifyData = csvParse(spotifyRaw)

beerData.forEach(d => {
  d.bitterness = +d.bitterness
  d.ounces = +d.ounces
  d.abv = +d.abv
})

const bikeBridges = [
  "Brooklyn Bridge",
  "Manhattan Bridge",
  "Williamsburg Bridge",
  "Queensboro Bridge",
  "Total"
]

bikeData.forEach(d => {
  d.Precipitation = +d.Precipitation
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
  "#5f80da"
]

const quantitativeColors = [
  "#f1cbd5",
  "#f989a4",
  "#fa217f",
  "#a64d6c",
  "#887177"
]

export default class SnakeyChart extends React.Component {
  render() {
    return (
      <div>
        A variety of examples
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
