/* eslint-disable */
import React from "react";
import firebase from "firebase";
import { Offcanvas, Form, FormGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ImageCrop from "./crop";
import Search from "./search";

class PostCreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      imgurl: null,
      type: null,
    };
  }

  initFirebaseAuth() {
    // Listen to auth state changes.
    firebase.auth().onAuthStateChanged();
  }
  handleClick = async (data, icolor) => {
    let title = this.state.title;
    let imgurl = data;
    let imgcolor = icolor;
    let type = this.state.type;
    let color = document.getElementById("color").value;
    let line = document.getElementById("line").value;
    let review = document.getElementById("review").value;

    if (!title || !imgurl || !imgcolor || !type || !color || !line || !review) {
      alert("모든 값을 입력해주세요.");
    } else {
      const db = firebase.firestore();
      const user = firebase.auth().currentUser;
      console.log(user);
      await db
        .collection("posts")
        .add({
          userID: user.uid,
          imgcolor: imgcolor,
          type: type,
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
    }
  };
  selectTitle = (title) => {
    if (title.includes("<b>")) {
      var title = title.replace(/<b>/gi, "").replace(/<\/b>/gi, "");
    }
    this.setState({ title: title });
  };
  radioChange = (e) => this.setState({ type: e.target.value });
  render() {
    return (
      <Offcanvas show={this.props.show} onHide={this.props.onHide}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Post your review</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="container">
            <Search
              type={this.state.type}
              title={this.state.title}
              selectTitle={this.selectTitle}
            />
            <br />
            <br />
            <Form.Check
              id="type"
              type="radio"
              name="type"
              value="movie"
              label="movie"
              onChange={(e) => this.radioChange(e)}
            />
            <Form.Check
              type="radio"
              name="type"
              id="type"
              value="book"
              label="book"
              onChange={(e) => this.radioChange(e)}
            />
            <Form>
              <Form.Label>Movie Title</Form.Label>
              <Form.Control
                id="title"
                type="text"
                value={this.state.title}
                readOnly
                // placeholder="write the movie title"
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
