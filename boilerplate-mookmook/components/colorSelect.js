import React from "react";
import { CirclePicker } from "react-color";

class ColorSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChangeComplete = (color, event) => {
    const { changeColor } = this.props;
    changeColor(color.hex);
  };

  render() {
    return <CirclePicker onChangeComplete={this.handleChangeComplete} />;
  }
}

export default ColorSelect;
