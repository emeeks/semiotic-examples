import React from "react"
import { data } from "./data/pokemon.js"
import { ORFrame, XYFrame } from "semiotic"
import { csvParse } from "d3-dsv"
import { Mark } from "semiotic-mark"
import {
  AnnotationCalloutElbow,
  AnnotationCalloutCircle,
  AnnotationBadge
} from "react-annotation"

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
]

const colorHash = {}

let colorI = 0

const pokemon = csvParse(data)
pokemon.forEach((p, q) => {
  p.Attack = parseInt(p.Attack)
  p.Defense = parseInt(p.Defense)
  p.Generation = parseInt(p.Generation)
  p.HP = parseInt(p.HP)
  p.SpecialAttack = parseInt(p["Sp. Atk"])
  p.SpecialDefense = parseInt(p["Sp. Def"])
  p.Speed = parseInt(p["Speed"])
  p.Total = parseInt(p["Total"])
  colorHash[p["Type 1"]] = colors[q % colors.length]
})

console.log("pokemon", pokemon)

const pokeEdges = []
const pokeNodes = []
const pokeHash = {}

const orAxis = { orient: "left" }
console.log("colorHash", colorHash)

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
            xAccessor={d => d.Attack + d.Defense}
            yAccessor={"SpecialAttack"}
            pointStyle={d => ({
              fill: colorHash[d["Type 1"]],
              fillOpacity: 0.75,
              stroke: colorHash[d["Type 1"]]
            })}
            axes={[
              {
                orient: "left",
                label: "Special Attack",
                tickValues: [25, 50, 75, 100, 125, 150, 175, 200]
              },
              {
                orient: "bottom",
                label: "Attack + Defense",
                tickValues: [50, 100, 150, 200, 250, 300]
              }
            ]}
            hoverAnnotation={false}
            tooltipContent={d => (
              <div className="tooltip-content">
                <p>Attack: {d.Attack}</p>
                <p>Defense: {d.Defense}</p>
              </div>
            )}
            margin={{ left: 60, bottom: 50 }}
            annotations={[
              {
                type: AnnotationCalloutCircle,
                label: "Glass-Cannon Magic Themed Pokemon",
                dx: -30,
                dy: -150,
                coordinates: [
                  {
                    SpecialAttack: 120,
                    Attack: 0,
                    Defense: 65
                  },
                  {
                    SpecialAttack: 105,
                    Attack: 0,
                    Defense: 35
                  },
                  {
                    SpecialAttack: 135,
                    Attack: 0,
                    Defense: 95
                  },
                  {
                    SpecialAttack: 175,
                    Attack: 0,
                    Defense: 115
                  }
                ]
              }
            ]}
          />
        </div>
        <div
          style={{
            display: "inline-block",
            width: "1500px",
            height: "1500px"
          }}
        >
          <ORFrame
            size={[1500, 1500]}
            data={pokemon}
            dynamicColumnWidth={d => d.length}
            type={{ type: "swarm", r: 2 }}
            oAccessor={"Type 1"}
            rAccessor={"Attack"}
            style={d => ({
              fill: colorHash[d["Type 1"]],
              stroke: colorHash[d["Type 1"]]
            })}
            summaryStyle={d => ({
              fill: colorHash[d["Type 1"]],
              fillOpacity: 0.5,
              stroke: colorHash[d["Type 1"]]
            })}
            summaryType={"violin"}
            sortO={() => {}}
            projection={"radial"}
            oPadding={1}
            axis={{ orient: "left", label: "Attack" }}
            pieceHoverAnnotation={true}
            annotations={[
              {
                type: "category",
                bracketType: "straight",
                categories: ["Grass", "Flying", "Water", "Bug", "Normal"],
                label: "Dumb Powers",
                position: "left",
                offset: 70,
                depth: 10,
                padding: 0
              },
              {
                type: "category",
                bracketType: "straight",
                categories: ["Poison", "Electric", "Ground"],
                label: "Lame Powers",
                position: "left",
                offset: 70,
                depth: 10,
                padding: 0
              },
              {
                type: "category",
                bracketType: "curly",
                categories: [
                  "Grass",
                  "Flying",
                  "Water",
                  "Bug",
                  "Normal",
                  "Poison",
                  "Electric",
                  "Ground"
                ],
                label: "Garbage Pokemon",
                position: "left",
                offset: 135,
                depth: 10,
                padding: 0
              },
              {
                type: "category",
                bracketType: "curly",
                categories: ["Fairy", "Fire", "Psychic", "Rock", "Ghost"],
                label: "Creepy Powers",
                position: "left",
                offset: 70,
                depth: 10,
                padding: 0
              },
              {
                type: "category",
                bracketType: "straight",
                categories: ["Ice", "Dragon", "Dark", "Steel", "Fighting"],
                label: "Cool Powers",
                position: "left",
                offset: 70,
                depth: 10,
                padding: 0
              },
              {
                type: "category",
                bracketType: "curly",
                categories: [
                  "Fairy",
                  "Fire",
                  "Psychic",
                  "Rock",
                  "Ghost",
                  "Ice",
                  "Dragon",
                  "Dark",
                  "Steel",
                  "Fighting"
                ],
                label: "Awesome Pokemon",
                position: "left",
                offset: 135,
                depth: 10,
                padding: 0
              },
              {
                type: "category",
                bracketType: "straight",
                categories: "Grass",
                label: "Grass",
                position: "left",
                offset: 15,
                depth: 20,
                padding: 0
              },
              {
                type: "category",
                bracketType: "curly",
                categories: "Flying",
                label: "Flying",
                position: "left",
                offset: 15,
                depth: 20,
                padding: 0
              },
              {
                type: "category",
                bracketType: "straight",
                categories: "Water",
                label: "Water",
                position: "left",
                offset: 15,
                depth: 20,
                padding: 0
              },
              {
                type: "category",
                bracketType: "straight",
                categories: "Bug",
                label: "Bug",
                position: "left",
                offset: 15,
                depth: 20,
                padding: 0
              },
              {
                type: "category",
                bracketType: "straight",
                categories: "Normal",
                label: "Normal",
                position: "left",
                offset: 15,
                depth: 20,
                padding: 0
              },
              {
                type: "category",
                bracketType: "straight",
                categories: "Poison",
                label: "Poison",
                position: "left",
                offset: 15,
                depth: 20,
                padding: 0
              },
              {
                type: "category",
                bracketType: "straight",
                categories: "Electric",
                label: "Electric",
                position: "left",
                offset: 15,
                depth: 20,
                padding: 0
              },
              {
                type: "category",
                bracketType: "straight",
                categories: "Ground",
                label: "Ground",
                position: "left",
                offset: 15,
                depth: 20,
                padding: 0
              },
              {
                type: "category",
                bracketType: "straight",
                categories: "Fairy",
                label: "Fairy",
                position: "left",
                offset: 15,
                depth: 20,
                padding: 0
              },
              {
                type: "category",
                bracketType: "straight",
                categories: "Fire",
                label: "Fire",
                position: "left",
                offset: 15,
                depth: 20,
                padding: 0
              },
              {
                type: "category",
                bracketType: "straight",
                categories: "Psychic",
                label: "Psychic",
                position: "left",
                offset: 15,
                depth: 20,
                padding: 0
              },
              {
                type: "category",
                bracketType: "straight",
                categories: "Rock",
                label: "Rock",
                position: "left",
                offset: 15,
                depth: 20,
                padding: 0
              },
              {
                type: "category",
                bracketType: "straight",
                categories: "Ghost",
                label: "Ghost",
                position: "left",
                offset: 15,
                depth: 20,
                padding: 0
              },
              {
                type: "category",
                bracketType: "straight",
                categories: "Ice",
                label: "Ice",
                position: "left",
                offset: 15,
                depth: 20,
                padding: 0
              },
              {
                type: "category",
                bracketType: "straight",
                categories: "Dragon",
                label: "Dragon",
                position: "left",
                offset: 15,
                depth: 20,
                padding: 0
              },
              {
                type: "category",
                bracketType: "curly",
                categories: "Dark",
                label: "Dark",
                position: "left",
                offset: 15,
                depth: 20,
                padding: 0
              },
              {
                type: "category",
                bracketType: "curly",
                categories: "Steel",
                label: "Steel",
                position: "left",
                offset: 15,
                depth: 20,
                padding: 0
              },
              {
                type: "category",
                bracketType: "straight",
                categories: "Fighting",
                label: "Fighting",
                position: "left",
                offset: 15,
                depth: 20,
                padding: 0
              }
            ]}
            tooltipContent={d => (
              <div className="tooltip-content">
                <p>{d.Name}</p>
                <p>{d["Type 1"]}</p>
                <p>Attack: {d.Attack}</p>
                <p>Defense: {d.Defense}</p>
              </div>
            )}
            margin={{ top: 250, left: 250, bottom: 250, right: 250 }}
          />
        </div>
      </div>
    )
  }
}
