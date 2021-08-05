/* eslint-disable */
import React from "react";
import firebase from "firebase";
import {
  Offcanvas,
  Form,
  FormGroup,
  Button,
  InputGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import ImageCrop from "./crop";
import Search from "./search";

class PostDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleClick = () => {
    console.log("클릭");
    console.log(this.props.type, this.props.docID, this.props.uid);
  };

  postDelete = () => {
    const db = firebase.firestore();
    let post = null;
    props.type == "movie"
      ? (post = db.collection("movie"))
      : (post = db.collection("book"));

    // const doc = post.doc(props.docID);
  };

  // doc
  //   .delete()
  //   .then(() => {
  //     console.log("Document successfully deleted!");
  //   })
  //   .catch((error) => {
  //     console.error("Error removing document: ", error);
  //   });
  render() {
    return <button onClick={this.handleClick()}>삭제</button>;
  }
}

export default PostDelete;
