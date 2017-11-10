import React from "react";
import PropTypes from "prop-types";
import { ResponsiveORFrame } from "semiotic";

export default class Donut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  static propTypes = {
    innerRadius: PropTypes.string,
    colors: PropTypes.array,
    padding: PropTypes.number
  };

  static defaultProps = {
    innerRadius: "25%",
    colors: ["#b30000", "#e34a33", "#fc8d59", "#fdcc8a"],
    padding: 0
  };

  componentDidMount() {
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
    // load the data
    this.setState({
      data: [
        { key: 1, count: getRandomInt(0, 10) },
        { key: 2, count: getRandomInt(5, 20) },
        { key: 3, count: getRandomInt(10, 50) },
        { key: 4, count: getRandomInt(20, 100) }
      ]
    });
  }

  render() {
    return (
      <div
        style={{ height: "100%", width: "100%" }}
        className={this.props.className}
      >
        <ResponsiveORFrame
          responsiveWidth={true}
          responsiveHeight={true}
          title={this.props.title}
          data={this.state.data}
          projection={"radial"}
          style={(d, i) => ({
            fill: this.props.colors[i],
            strokeWidth: 1
          })}
          type={{ type: "bar", innerRadius: this.props.innerRadius() }}
          dynamicColumnWidth={"count"}
          rAccessor={d => 1}
          oAccessor={"key"}
          margin={{ left: 20, top: 40, bottom: 40, right: 20 }}
          oPadding={this.props.padding}
          customClickBehavior={this.clickDonut}
        />
      </div>
    );
  }
}
