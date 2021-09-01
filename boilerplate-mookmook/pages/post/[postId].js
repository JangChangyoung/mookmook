/* eslint-disable prefer-const */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-return-assign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable spaced-comment */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import firebase from "firebase/app";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import Layout from "../../components/layout";
import "firebase/firestore";
import PostDelete from "./delete";
import animateHeart from "../../components/animateHeart";

import styles from "./style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

class DisplayPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null, // post data
      equal: null, // currentUser === user.uid 인지 여부
      myLike: false, // currentUser !== user.uid 일 때, 해당 게시글에 좋아요를 눌렀는지 여부
      currentUser: null,
      update: false,
    };
  }

  componentDidMount() {
    this.getDocData(this.props.postId)
      .then((data) => {
        const user = firebase.auth().currentUser;
        if (user) {
          const currentUser = user.uid;
          this.setState({
            data,
            currentUser,
            updateData: { line: data.line, review: data.review },
          });
          return this.checkUser(data.userID);
        }
        alert("로그인을 해주세요!");
        window.location.href = "/";
      })
      .then((data) => {
        const { likeArray } = this.state.data;
        const { equal, currentUser } = data;
        this.setState({ equal, currentUser });

        if (equal === false) {
          // 본인 글이 아닌 경우
          const myLike = this.checkLike(likeArray, currentUser); // 해당 유저가 like를 눌렀는지 확인
          console.log("myLike: ", myLike);
          this.setState({ myLike });
        }
      });
  }

  removeElement = (arr, val) => {
    const index = arr.indexOf(val);
    if (index >= 0) {
      arr.splice(index, 1);
    }
    return arr;
  };

  getDocData = async (postId) => {
    console.log("reading doc");
    if (postId) {
      console.log("postId is exists");
      const type = postId.split("_")[0];
      const docID = postId.split("_")[1];
      const doc = await firebase.firestore().collection(type).doc(docID).get();

      if (!doc.exists) {
        console.log("No such document!");
        return false;
      }
      const data = doc.data();
      data.postId = docID;
      console.log("Document data:", data);
      return data;
    }
    console.log("postId is not exists");
    return false;
  };

  checkUser = (userID) => {
    const { currentUser } = this.state;

    if (currentUser) {
      if (currentUser === userID) {
        return { equal: true, currentUser };
      }
      return { equal: false, currentUser };
    }
  };

  checkLike = (likeArray, currentUser) => {
    let check = false;
    likeArray.map((i) => {
      if (i === currentUser) {
        check = true;
      }
    });
    return check;
  };

  changeLike = (postId, type, likeArray) => {
    const { equal, myLike, currentUser } = this.state;

    if (equal === true) {
      return alert("자신의 글은 좋아요 할 수 없어요!");
    }

    if (myLike) {
      //좋아요 되어 있는 경우 (좋아요 취소해야 함)
      likeArray = this.removeElement(likeArray, currentUser);
    } else {
      // 좋아요 되어있지 않은 경우 (좋아요 해야 함)
      likeArray.push(currentUser);
      animateHeart();
    }

    this.setState({ myLike: !myLike });
    const db = firebase.firestore();
    db.collection(type).doc(postId).update({ likeArray });
  };

  postUpdate = () => {
    this.setState({ update: true });
  };

  handleChange = (type, e) => {
    let data = this.state.data;

    type === "line"
      ? (data.line = e.target.value)
      : (data.review = e.target.value);
    this.setState({ data });
  };

  handleClick = () => {
    const { type, postId, line, review } = this.state.data;
    const db = firebase.firestore();

    db.collection(type).doc(postId).update({ line, review });

    this.setState({ update: false });
  };

  innerThings = () => {
    const {
      postId,
      color,
      imgcolor,
      imgurl,
      line,
      review,
      title,
      uploadTime,
      userID,
      displayName,
      type,
      likeArray,
    } = this.state.data;
    const { myLike, equal, update } = this.state;

    return (
      <div
        id="like-container"
        className={styles.container}
        style={{ backgroundColor: `${imgcolor}55` }}
      >
        <img
          className={styles.cardImg}
          width="400"
          height="300"
          key={title}
          src={
            imgurl ||
            "https://bookthumb-phinf.pstatic.net/cover/208/017/20801763.jpg?type=m1&udate=20210728"
          }
          alt={title}
        />
        <div className={styles.cardText}>
          <div className={styles.cardGroup}>
            <span className={styles.cardTitle}>{title}</span>

            <span className={styles.cardLike}>
              <i
                className={
                  myLike ? "like bi bi-heart-fill" : "like bi bi-heart"
                }
                style={{ fontSize: "24px", color: "#ff008a" }}
                onClick={() => this.changeLike(postId, type, likeArray)}
              />
              <p>{likeArray.length}</p>
            </span>
            {update ? null : (
              <>
                {equal ? (
                  <>
                    <span className={styles.icon}>
                      <i
                        className="bi bi-pencil-square"
                        style={{ fontSize: "18px" }}
                        onClick={() => this.postUpdate()}
                      />
                    </span>
                    <PostDelete
                      postId={postId}
                      type={type}
                      line={line}
                      review={review}
                    />
                  </>
                ) : null}
              </>
            )}
          </div>

          <div>
            <a href={`/user/${userID}`} className={styles.cardUser}>
              {displayName}
            </a>
            <span
              className={styles.cardColor}
              style={{ backgroundColor: `${color}` }}
            />
            <span className={styles.cardTime}>{uploadTime}</span>
          </div>

          <div className={styles.cardLine}>
            <div>
              <img
                alt="quote"
                width="30"
                height="30"
                src="/assets/quote1.png"
              />
            </div>
            {update ? (
              <Form.Control
                as="textarea"
                rows={2}
                defaultValue={line}
                onChange={(e) => this.handleChange("line", e)}
                style={{ width: "100%", resize: "none" }}
              />
            ) : (
              <p className={styles.cardQuote}>{line}</p>
            )}
            <div>
              <img
                alt="quote"
                width="30"
                height="30"
                src="/assets/quote2.png"
              />
            </div>
          </div>
          <div className={styles.cardLine}>
            {update ? (
              <Form.Control
                as="textarea"
                rows={5}
                defaultValue={review}
                onChange={(e) => this.handleChange("review", e)}
                style={{ width: "100%", resize: "none" }}
              />
            ) : (
              <p className={styles.cardReview}>{review}</p>
            )}
          </div>
          <div className={styles.update}>
            {update ? (
              <Button variant="secondary" onClick={this.handleClick}>
                Update
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { data } = this.state;

    return <>{data ? this.innerThings() : "loading . . ."}</>;
  }
}

const PostPage = () => {
  const router = useRouter();
  const { postId } = router.query;

  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    // data request
    setLoading(false);
  }, []);

  return (
    <>
      <Layout />
      {postId ? (
        <DisplayPost postId={postId} />
      ) : (
        <div>{`Post: ${postId}`}</div>
      )}
    </>
  );
};

export default PostPage;
