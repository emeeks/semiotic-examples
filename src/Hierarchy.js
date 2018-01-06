import React from "react"
import { NetworkFrame, ORFrame, XYFrame } from "semiotic"
import flareData from "./data/flare.json"
import baseballRaw from "./data/baseball_salary"
import { csvParse } from "d3-dsv"

const baseballData = csvParse(baseballRaw)

baseballData.forEach(d => {
  d.salary = +d.salary
  d.value = +d.value
  d.average = +d.average
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

const quantitativeColors = [
  "#f1cbd5",
  "#f989a4",
  "#fa217f",
  "#a64d6c",
  "#887177"
]

export default class Hierarchy extends React.Component {
  render() {
    return <div>Hierarchy all the things</div>
  }
}
