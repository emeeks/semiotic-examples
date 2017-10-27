import React from "react";
import { ORFrame } from "semiotic";
import { data } from "./data/import_export.js";
import icon from "material-design-icons-svg/paths/verified";

const countryHash = {
  "United States": "#21f0b6",
  "EU (28)": "#1f9383",
  China: "#85d2e1",
  India: "#154975",
  Japan: "#7377ec",
  Brazil: "#8d30ba",
  Russia: "#dab9ff",
  "South Africa": "#1f3ca6"
};

const regionHash = {
  "North America": "#21f0b6",
  Europe: "#1f9383",
  Asia: "#85d2e1",
  Other: "#8d30ba"
};

const monthHash = {
  January: "#6f85a6",
  February: "#ef76b1",
  March: "#325b0b",
  April: "#896c11"
};

const rosto =
  "M 9.1224266,3.3361224 C 8.2810363,3.2943324 7.4365263,3.4028924 6.6380563,3.6876824 4.1694463,3.6296224 1.9665163,5.3650424 0.91344627,7.5119024 -1.3227637,11.795842 2.5514463,17.764562 8.1907863,16.545112 11.620097,16.132302 15.547317,14.037072 16.173217,10.334172 16.380807,6.5289124 12.768497,3.5172224 9.1224266,3.3361224 Z M 9.3528966,19.855652 C 8.8890366,19.840732 8.4082066,19.917662 7.9173563,20.105652 5.1205063,21.551132 3.7183663,24.679342 2.7943063,27.543152 2.3207563,29.861872 0.86862627,32.037502 1.3646163,34.488462 1.6304963,37.604102 8.0443063,38.953312 8.0443063,38.953312 8.0443063,38.953312 14.670637,39.650602 16.495477,36.334172 17.161197,31.945522 16.344137,27.232262 14.009147,23.424012 13.065617,21.690222 11.362967,19.920312 9.3528966,19.855652 Z";

export default class NetworkDiagrams extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ORFrame
          size={[1000, 500]}
          data={data.filter(d => d.month === "March")}
          oAccessor="region"
          rAccessor="value"
          projection="horizontal"
          type={{
            type: "clusterbar",
            icon: icon,
            resize: "fixed",
            iconPadding: 1
          }}
          style={d => ({
            fill: countryHash[d.country],
            stroke: "none"
          })}
          sortO={(a, b) => a > b}
          axis={{ orient: "right" }}
          oLabel={true}
          margin={{ top: 0, left: 110, right: 0, bottom: 50 }}
          oPadding={5}
        />
      </div>
    );
  }
}
