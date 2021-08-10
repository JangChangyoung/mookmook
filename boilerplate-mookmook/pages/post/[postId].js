import React, { useState, useEffect } from "react";
import { useRouter, Card } from "next/router";
import firebase from "firebase/app";
import "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";

function InnerThings(props) {
  if (props.data !== undefined) {
    const { color, imgurl, like, line, review, title, uploadTime, userID, displayName } = props.data;
    return (
      <>
        <img width="400" height="300" key={title} src={imgurl? imgurl : 'https://bookthumb-phinf.pstatic.net/cover/208/017/20801763.jpg?type=m1&udate=20210728'} alt={title} />
        <p>{`title: ${title}`}</p>
        <a href={`/user/${userID}`}>{`작성자: ${displayName}`}</a>
        <p>{`color: ${color}`}</p>
        <p>{`like: ${like}`}</p>
        <p>{`line: ${line}`}</p>
        <p>{`review: ${review}`}</p>
        <p>{`color: ${color}`}</p>
        <p>{`uploadTime: ${uploadTime.toDate()}`}</p>
      </>
    );
  }
}

class DisplayPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
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

  render() {
    return(
      <>
        {this.state.data
          ? <InnerThings data={this.state.data}/>
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
