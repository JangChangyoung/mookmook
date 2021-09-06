/* eslint-disable react/no-array-index-key */
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/layout";
import DisplayPosts from "../components/displayPosts";
import { Scrollbars } from "react-custom-scrollbars";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        autoHeight
        autoHeightMin="100vh"
        universal={true}
      >
        <Layout />
        <DisplayPosts host={null} types="random" />
      </Scrollbars>
    );
  }
}

export default Home;
