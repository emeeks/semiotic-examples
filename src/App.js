import React from "react"
import { Route, BrowserRouter, Link } from "react-router-dom"
import Home from "./Home"
import LineChart from "./LineChart"
import BarChart from "./BarChart"
import RankPlot from "./RankPlot"
import ClimateDashboard from "./ClimateDashboard"
import LineBrush from "./LineBrush"
import NetworkDiagrams from "./NetworkDiagrams"
import IconCharts from "./IconCharts"
import ResponsiveDonut from "./ResponsiveDonut"
import Annotations from "./Annotations"
import SnakeyChart from "./SnakeyChart"
import Potpourri from "./Potpourri"
import Hierarchy from "./Hierarchy"

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div style={{ width: "100%", height: "100%" }}>
          <header>
            <Link to="/">Home</Link>
            {` `}
            <Link to="/line">LineChart</Link>
            {` `}
            <Link to="/bar">BarChart</Link>
            {` `}
            <Link to="/rankplot">Sketchy Rectangle Plot</Link>
            {` `}
            <Link to="/climate">Climate Dashboard</Link>
            {` `}
            <Link to="/iconchart">Icon Chart</Link>
            {` `}
            <Link to="/annotations">Annotation Examples</Link>
            {` `}
            <Link to="/snakey">Cyclical Sankey</Link>
            {` `}
            <Link to="/hierarchy">Hierarchical Charts</Link>
            {` `}
            <Link to="/potpourri">Various</Link>
            {` `}
            <Link to="/donut">Responsive Donut</Link>
            {` `}
            <Link to="/linebrush">Line Brush</Link>
          </header>

          <main style={{ height: "100%" }}>
            <Route exact path="/" component={Home} />
            <Route exact path="/line" component={LineChart} />
            <Route exact path="/bar" component={BarChart} />
            <Route exact path="/rankplot" component={RankPlot} />
            <Route exact path="/climate" component={ClimateDashboard} />
            <Route exact path="/linebrush" component={LineBrush} />
            <Route exact path="/iconchart" component={IconCharts} />
            <Route exact path="/donut" component={ResponsiveDonut} />
            <Route exact path="/annotations" component={Annotations} />
            <Route exact path="/snakey" component={SnakeyChart} />
            <Route exact path="/potpourri" component={Potpourri} />
            <Route exact path="/hierarchy" component={Hierarchy} />
          </main>
        </div>
      </BrowserRouter>
    )
  }
}
