import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import firebase from "firebase/app";
import "firebase/firestore";
import styles from "./style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

class DisplayPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      myLike: null,
    }
  }

  componentDidMount() {
    this.getDocData(this.props.postId).then((data) => this.setState({ data }));
  }

  getDocData = async(postId) => {
    console.log("reading doc");
    if (postId) {
      console.log('postId is exists')
      const type = postId.split("_")[0];
      const docID = postId.split("_")[1];
      const doc = await firebase.firestore().collection(type).doc(docID).get();

      if (!doc.exists) {
        console.log("No such document!");
        return false;
      }
      console.log("Document data:", doc.data());
      return doc.data();
    }
    console.log('postId is not exists')
    return false;
  }

  changeLike = (equal) => {
    equal ? alert('자신의 글은 좋아요 할 수 없어요!') : this.setState({myLike: !myLike});
  }

  innerThings = () => {
    const user = firebase.auth().currentUser;
    const { color, imgcolor, imgurl, like, line, review, title, uploadTime, userID, displayName } = this.state.data;
    const { myLike } = this.state;
    let equal = false;
    
    if (user.uid === userID) {
      equal = true;
    }

    return (
      <div className={styles.container} style={{backgroundColor: `${imgcolor}55`}}>
        <img className={styles.cardImg} width="400" height="300" key={title} src={imgurl || 'https://bookthumb-phinf.pstatic.net/cover/208/017/20801763.jpg?type=m1&udate=20210728'} alt={title} />
        <div className={styles.cardText}>
          <div className={styles.cardGroup}>
            <span className={styles.cardTitle}>{title}</span>
            <span className={styles.cardLike}>
              <i className={myLike ? "like bi bi-heart-fill" : "like bi bi-heart"} style={{fontSize: '24px', color: '#ff008a'}} onClick={() => this.changeLike(equal) }/>
              <p>{myLike ? like+1 : like}</p>
            </span>
          </div>
          <div>
            <a href={`/user/${userID}`} className={styles.cardUser}>{displayName}</a>
            <span className={styles.cardColor} style={{backgroundColor: `${color}`}}/>
            <span className={styles.cardTime}>{uploadTime}</span>
          </div> 
          <div className={styles.cardLine}>
            <div><img alt="quote" width="30" height="30" src="/assets/quote1.png"/></div>
            <p className={styles.cardQuote}>{line}</p>
            <div><img alt="quote" width="30" height="30"src="/assets/quote2.png"/></div>
          </div>
          <div className={styles.cardLine}>
            <p className={styles.cardReview}>{review}</p>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { data } = this.state;

    return(
      <>
        { data
          ? this.innerThings()
          : 'loading . . .'
        }
      </>
    );
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
      {postId
        ? <DisplayPost postId={postId}/>
        : <div>{`Post: ${postId}`}</div> 
      } 
    </>
  );
};

export default PostPage;
