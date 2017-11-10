import React from "react";
import { data } from "./data/pokemon.js";
import { ORFrame, XYFrame } from "semiotic";
import { csvParse } from "d3-dsv";
import { Mark } from "semiotic-mark";
import { AnnotationCalloutElbow, AnnotationBadge } from "react-annotation";

const colors = [
  "#b8e27d",
  "#154e56",
  "#aedddd",
  "#389eaa",
  "#10eddc",
  "#056e12",
  "#37d356",
  "#7c8a4f",
  "#f7d153",
  "#653d28",
  "#ee9292",
  "#d93669",
  "#fe8f06",
  "#b94403",
  "#ed0e1c",
  "#3f4c08",
  "#aea2eb",
  "#6c36a3",
  "#d678ef",
  "#304f9b"
];

const colorHash = {};

let colorI = 0;

const pokemon = csvParse(data);
pokemon.forEach((p, q) => {
  p.Attack = parseInt(p.Attack);
  p.Defense = parseInt(p.Defense);
  p.Generation = parseInt(p.Generation);
  p.HP = parseInt(p.HP);
  p.SpecialAttack = parseInt(p["Sp. Atk"]);
  p.SpecialDefense = parseInt(p["Sp. Def"]);
  p.Speed = parseInt(p["Speed"]);
  p.Total = parseInt(p["Total"]);
  colorHash[p["Type 1"]] = colors[q % colors.length];
});

console.log("pokemon", pokemon);

const pokeEdges = [];
const pokeNodes = [];
const pokeHash = {};

const orAxis = { orient: "left" };
console.log("colorHash", colorHash);

export default class Annotations extends React.Component {
  render() {
    return (
      <div>
        <h1>ZOMBIE POKEMON NINJA RANGER FORCE MONSTERS</h1>
        <div
          style={{
            display: "inline-block",
            width: "750px",
            height: "750px"
          }}
        >
          <XYFrame
            size={[750, 750]}
            points={pokemon}
            xAccessor={"Attack"}
            yAccessor={"Defense"}
            pointStyle={d => ({
              fill: colorHash[d["Type 1"]],
              fillOpacity: 0.75,
              stroke: colorHash[d["Type 1"]]
            })}
            axes={[
              {
                orient: "left",
                label: "Defense",
                tickValues: [25, 50, 75, 100, 125, 150, 175, 200]
              },
              {
                orient: "bottom",
                label: "Attack",
                tickValues: [25, 50, 75, 100, 125, 150, 175, 200]
              }
            ]}
            hoverAnnotation={[
              d => ({
                type: AnnotationCalloutElbow,
                dx: -30,
                dy: 50,
                note: { title: d.Name }
              }),
              { type: "vertical-points", threshold: 5 },
              { type: "horizontal-points", threshold: 5 },
              { type: "frame-hover" }
            ]}
            tooltipContent={d => (
              <div className="tooltip-content">
                <p>Attack: {d.Attack}</p>
                <p>Defense: {d.Defense}</p>
              </div>
            )}
            margin={{ top: 10, left: 60, bottom: 50, right: 10 }}
            annotations={[
              {
                type: "enclose",
                label: "Where are the high attack low defense Pokemon?",
                dx: -130,
                dy: 10,
                coordinates: [
                  { Attack: 170, Defense: 10 },
                  { Attack: 150, Defense: 50 }
                ]
              },
              {
                type: "react-annotation",
                Attack: 50,
                Defense: 150,
                dx: -30,
                dy: 0,
                note: { title: "Note at 50,150" }
              },
              {
                type: AnnotationCalloutElbow,
                Attack: 85,
                Defense: 200,
                dx: 30,
                dy: -50,
                note: { title: "Out a bit farther" },
                subject: { text: "C", radius: 12 }
              },
              {
                type: AnnotationBadge,
                Attack: 10,
                Defense: 230,
                dx: 30,
                dy: -50,
                subject: { text: "*", radius: 12 }
              },
              { type: "x", Attack: 115, label: "Probably a good pokemon" },
              {
                type: "y",
                Defense: 55,
                dx: -20,
                label: "Probably a bad pokemon"
              }
            ]}
          />
        </div>
        <div
          style={{
            display: "inline-block",
            width: "750px",
            height: "750px"
          }}
        >
          <ORFrame
            size={[750, 750]}
            data={pokemon}
            type={"swarm"}
            oAccessor={"Type 1"}
            rAccessor={"Attack"}
            style={d => ({
              fill: colorHash[d["Type 1"]],
              stroke: colorHash[d["Type 1"]]
            })}
            oPadding={5}
            dynamicColumnWidth={d => d.length}
            axis={{ orient: "left", label: "Attack" }}
            oLabel={d => (
              <g transform="rotate(45)">
                <text>{d}</text>
              </g>
            )}
            pieceHoverAnnotation={true}
            tooltipContent={d => (
              <div className="tooltip-content">
                <p>{d.Name}</p>
                <p>Attack: {d.Attack}</p>
                <p>Defense: {d.Defense}</p>
              </div>
            )}
            margin={{ top: 10, left: 60, bottom: 50, right: 40 }}
          />
        </div>
      </div>
    );
  }
}
