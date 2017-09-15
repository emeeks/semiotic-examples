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

titleData.forEach((t, i) => {
  if (!colorHash[t.studio]) {
    colorHash[t.studio] = colors[colorI];
    colorI = (colorI + 1) % 10;
  }
});

const orAxis = { orient: "left" };

export default class RankPlot extends React.Component {
  render() {
    return (
      <div>
        Sketchy Rectangle Plot
        <ORFrame
          size={[1200, 600]}
          data={titleData}
          oAccessor={"studio"}
          rAccessor={"maxRank"}
          invertR={true}
          type={"swarm"}
          style={d => ({
            fill: colorHash[d.studio],
            stroke: colorHash[d.studio]
          })}
          axis={orAxis}
          margin={{ top: 10, bottom: 50, right: 10, left: 100 }}
          oLabel={d => <text transform={"rotate(45)"}>{d}</text>}
          oPadding={10}
          pieceHoverAnnotation={true}
          tooltipContent={d => <div className="tooltip-content">{d.title}</div>}
          renderMode={"sketchy"}
        />
      </div>
    );
  }
}
