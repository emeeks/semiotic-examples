import React from "react";
import { Route, BrowserRouter, Link } from "react-router-dom";
import Home from "./Home";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import RankPlot from "./RankPlot";

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
          </header>

          <main>
            <Route exact path="/" component={Home} />
            <Route exact path="/line" component={LineChart} />
            <Route exact path="/bar" component={BarChart} />
            <Route exact path="/rankplot" component={RankPlot} />
          </main>
        </div>
      </BrowserRouter>
    );
  }
}
