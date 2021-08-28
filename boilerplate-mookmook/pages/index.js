/* eslint-disable react/no-array-index-key */
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/layout";
import DisplayPosts from "../components/displayPosts";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Layout />
        <DisplayPosts host={null} />
      </div>
    );
  }
}

export default Home;
