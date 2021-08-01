/* eslint-disable */
import React from "react";
import firebase from "firebase";
import { Offcanvas, Form, FormGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ImageCrop from "./crop";
import SearchMovie from "./searchMovie";

class PostCreatePage extends React.Component {
  constructor(props) {
    super(props);
  }

  initFirebaseAuth() {
    // Listen to auth state changes.
    firebase.auth().onAuthStateChanged();
  }

  getUserName() {
    return firebase.auth().currentUser.displayName;
  }

  handleClick = async (data, icolor) => {
    let title = document.getElementById("title").value;
    let imgurl = data;
    let imgcolor = icolor;
    let color = document.getElementById("color").value;
    let line = document.getElementById("line").value;
    let review = document.getElementById("review").value;

    const db = firebase.firestore();

    await db
      .collection("posts")
      .add({
        userID: "test",
        imgcolor: imgcolor,
        title: title,
        imgurl: imgurl,
        color: color,
        line: line,
        review: review,
        like: 0,
        uploadTime: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        alert("등록되었습니다.");
        window.location.reload();
      });
  };

  render() {
    return (
      <Offcanvas show={this.props.show} onHide={this.props.onHide}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Post your review</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="container">
            <SearchMovie />
            <Form>
              <Form.Label>Movie Title</Form.Label>
              <Form.Control
                id="title"
                type="text"
                placeholder="write the movie title"
              />
              <br></br>
              <Form.Label htmlFor="exampleColorInput">Color picker</Form.Label>
              <Form.Control
                type="color"
                id="color"
                defaultValue="#563d7c"
                title="Choose your color"
              />
              <FormGroup>
                <Form.Label>Famous line</Form.Label>
                <Form.Control id="line" as="textarea" rows={2} />
              </FormGroup>
              <Form.Group>
                <Form.Label>Review</Form.Label>
                <Form.Control id="review" as="textarea" rows={3} />
              </Form.Group>
            </Form>
            <ImageCrop handleClick={this.handleClick} />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    );
  }
}

export default PostCreatePage;
