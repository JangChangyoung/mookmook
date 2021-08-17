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
    const { postId, type } = this.props;
    const db = firebase.firestore();

    const post = type === "movie"
        ? db.collection("movie")
        : db.collection("book");

    post.doc(postId).delete().then(() => {
      alert("삭제되었습니다.");
      history.back();
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
  };

  render() {
    const { postDelete } = this;
    const { postId, type } = this.props;

    return <span className="trash"><i className="trash bi bi-trash" style={{fontSize: '24px'}} onClick={() => postDelete(postId, type) } /></span>
  }
}

export default PostDelete;
