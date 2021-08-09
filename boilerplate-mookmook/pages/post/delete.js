/* eslint-disable */
import React from "react";
import firebase from "firebase";
import "bootstrap/dist/css/bootstrap.min.css";

class PostDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  postDelete = () => {
    const { docID, type } = this.props;
    const db = firebase.firestore();
    const user = firebase.auth().currentUser;

    let post = null;
    type === "movie"
      ? (post = db.collection("movie"))
      : (post = db.collection("book"));

    post
      .doc(docID)
      .delete()
      .then(() => {
        alert("삭제되었습니다.");
        // render mypage옮기기
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  render() {
    const { postDelete } = this;
    return <button onClick={() => postDelete()}>삭제</button>;
  }
}

export default PostDelete;
