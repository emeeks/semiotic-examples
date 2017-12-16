import React from "react"
import { NetworkFrame } from "semiotic"
import sankeyData from "./data/sankey.js"
import { csvParse } from "d3-dsv"

const parsedEdges = csvParse(sankeyData)

parsedEdges.forEach(e => {
  e.value = +e.value
})

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
]

export default class SnakeyChart extends React.Component {
  render() {
    return (
      <div>
        <NetworkFrame
          size={[1500, 2000]}
          edges={parsedEdges}
          sourceAccessor="source"
          targetAccessor="target"
          edgeStyle={{ stroke: "brown", fill: "beige" }}
          nodeStyle={{ stroke: "gold", fill: "lightgoldenrodyellow" }}
          networkType={{ type: "sankey", orient: "left" }}
          hoverAnnotation={true}
          nodeLabels={true}
          margin={100}
        />
      </div>
    )
  }
}
