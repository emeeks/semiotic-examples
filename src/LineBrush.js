import React from "react"
import { XYFrame } from "semiotic"
import { scaleTime } from "d3-scale"

const chartScale = scaleTime()
const lineStyle = {
  fill: "#007190",
  stroke: "#007190",
  strokeWidth: 1
}

var data = [
  {
    date: "12/30/1998",
    close: 14.07
  },
  {
    date: "1/2/2003",
    close: 14.8
  }
]

data.forEach(d => {
  d.date = new Date(d.date)
})

export default class LineBrush extends React.Component {
  constructor(props) {
    super(props)
    this.brushEnd = this.brushEnd.bind(this)
  }

  brushEnd(e) {
    console.log(e)
  }

  render() {
    const movies = [
      {
        title: "Ex Machina",
        studio: "A24",
        firstWeek: "2015-15",
        maxRank: 6,
        maxGross: 25442958,
        coordinates: [
          {
            week: 1,
            grossWeekly: 10000,
            theaterCount: 4,
            theaterAvg: 81904,
            date: "2015-04-10",
            rank: 18
          },
          {
            week: 2,
            grossWeekly: 10000,
            theaterCount: 39,
            theaterAvg: 29508,
            date: "2015-04-17",
            rank: 15
          },
          {
            week: 3,
            grossWeekly: 10000,
            theaterCount: 1255,
            theaterAvg: 5702,
            date: "2015-04-24",
            rank: 6
          },
          {
            week: 4,
            grossWeekly: 10000,
            theaterCount: 1279,
            theaterAvg: 2826,
            date: "2015-05-01",
            rank: 6
          }
        ],
        type: "iceberg"
      }
    ]
    return (
      <div>
        <XYFrame
          title={"Two Movies"}
          lineStyle={{
            stroke: "#00a2ce",
            strokeWidth: 6,
            strokeOpacity: 0.8
          }}
          size={[700, 400]}
          dataVersion="fixed"
          lines={movies}
          xAccessor={"week"}
          yAccessor={"grossWeekly"}
          margin={{ left: 80, bottom: 50, right: 10, top: 40 }}
          axes={[
            {
              orient: "left"
            },
            {
              orient: "bottom"
            }
          ]}
        />
        <XYFrame
          size={[700, 200]}
          lines={[{ label: "Apple Stock", coordinates: data }]}
          xAccessor={d => d.date}
          yAccessor="close"
          xScaleType={chartScale}
          lineStyle={lineStyle}
          axes={[
            {
              orient: "bottom",
              ticks: 6,
              tickFormat: d => d.getFullYear()
            }
          ]}
          margin={{ left: 40, top: 0, bottom: 50, right: 20 }}
          interaction={{
            end: this.brushEnd,
            brush: "xBrush",
            extent: [new Date("1/2/1999"), new Date("1/2/2002")]
          }}
        />
      </div>
    )
  }
}
