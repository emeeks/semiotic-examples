import React from "react";
import { data } from "./data/pokemon.js";
import { ORFrame, XYFrame } from "semiotic";
import { csvParse } from "d3-dsv";
import { Mark } from "semiotic-mark";

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
              stroke: "white"
            })}
            customPointMark={() => <Mark markType="circle" r={4} />}
            axes={[{ orient: "left" }, { orient: "bottom" }]}
            margin={{ top: 10, left: 50, bottom: 50, right: 10 }}
            annotations={[
              {
                type: "enclose",
                label: "Good Pokemon?",
                dx: -50,
                dy: 50,
                coordinates: [
                  { Attack: 180, Defense: 100 },
                  { Attack: 190, Defense: 100 }
                ]
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
            rAccessor={"Defense"}
            style={d => ({
              fill: colorHash[d["Type 1"]],
              stroke: colorHash[d["Type 1"]]
            })}
            oPadding={5}
            dynamicColumnWidth={d => d.length}
            axis={{ orient: "left" }}
            oLabel={d => (
              <g transform="rotate(45)">
                <text>{d}</text>
              </g>
            )}
            margin={{ top: 10, left: 50, bottom: 50, right: 40 }}
          />
        </div>
      </div>
    );
  }
}
