import React from "react";
import { Route, BrowserRouter, Link } from "react-router-dom";
import Home from "./Home";
import LineChart from "./LineChart";

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <header>
            <Link to="/">Home</Link>
            {` `}
            <Link to="/line">LineChart</Link>
          </header>

          <main>
            <Route exact path="/" component={Home} />
            <Route exact path="/line" component={LineChart} />
          </main>
        </div>
      </BrowserRouter>
    );
  }
}
