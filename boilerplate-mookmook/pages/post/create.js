import React from "react";
import firebase from "firebase";
import { Offcanvas } from "react-bootstrap";

import ImageCrop from "./crop";
import SearchMovie from "./searchMovie";

class PostCreatePage extends React.Component {
  constructor(props) {
    super(props);
  }

  getTime() {
    let today = new Date();
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1; // 월
    let date = today.getDate(); // 날짜
    let day = today.getDay(); // 요일, 0~6
    return year + "/" + month + "/" + date;
  }

  handleClick = async (data) => {
    let title = document.getElementById("title").value;
    let imgurl = data;
    let color = document.getElementById("color").value;
    let line = document.getElementById("line").value;
    let review = document.getElementById("review").value;

    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true,
    });

    await db
      .collection("posts")
      .add({
        userID: "userID",
        title: title,
        imgurl: imgurl,
        color: color,
        line: line,
        review: review,
        like: 0,
        uploadTime: this.getTime(),
      })
      .then(() => {
        console.log("등록완료");
        alert("등록되었습니다.");
        window.location.reload();
      });
  };

  render() {
    return (
      <Offcanvas show={this.props.show} onHide={this.props.onHide}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>SignIn</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="container">
            <SearchMovie />
            <ImageCrop handleClick={this.handleClick} />
            <form>
              <input
                id="title"
                className="post"
                placeholder="write the movie title"
              />
              <input id="color" className="post" placeholder="write color" />
              <input
                id="line"
                className="post"
                placeholder="write a famous line"
              />
              <input
                id="review"
                className="post"
                placeholder="write your review"
              />
            </form>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    );
  }
}

export default PostCreatePage;
