import React from "react";
import firebase from "firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./style.module.scss";

class PostDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  postDelete = () => {
    const { postId, type } = this.props;
    const db = firebase.firestore();

    const post =
      type === "movie" ? db.collection("movie") : db.collection("book");

    post
      .doc(postId)
      .delete()
      .then(() => {
        alert("삭제되었습니다.");
        history.back();
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  render() {
    const { postId, type } = this.props;

    return (
      <span className={styles.icon}>
        <i
          className="bi bi-trash"
          style={{ fontSize: "18px" }}
          onClick={() => this.postDelete(postId, type)}
        />
      </span>
    );
  }
}

export default PostDelete;
