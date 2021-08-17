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

    let post = null;
    type === "movie"
      ? (post = db.collection("movie"))
      : (post = db.collection("book"));

    post
      .doc(docID)
      .delete()
      .then(() => {
        alert("삭제되었습니다.");
        // 이전 페이지로 돌아가는 코드 추가하기
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  render() {
    const { postDelete } = this;
    const { postId, type } = this.props;

    return <span><i className="delete bi bi-trash" style={{fontSize: '24px'}} onClick={() => postDelete(postId, type) } /></span>

  }
}

export default PostDelete;
