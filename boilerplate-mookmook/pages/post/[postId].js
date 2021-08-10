import React, { useState, useEffect } from "react";
import { useRouter, Card } from "next/router";
import firebase from "firebase/app";
import "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";

function DisplayPost(props) {
  if (props.data !== undefined) {
    const { color, imgurl, like, line, review, title, uploadTime, userID } =
      props;

    console.log("url:", imgurl);
    return (
      <>
        <img width="500" height="500" key={title} src={imgurl} alt={title} />
        {/* <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
          </Card.Text>
          <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
      </Card> */}
      </>
    );
  }
}

const PostPage = () => {
  const router = useRouter();
  const { postId } = router.query;
  const [loading, setLoading] = useState(true);
  let data;

  useEffect(async () => {
    // data request
    setLoading(false);
  }, []);

  async function getDocData() {
    console.log("reading doc");
    if (postId) {
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
    return false;
  }

  getDocData().then((result) => {
    data = result;
  });
  console.log(data);

  return (
    <>{data ? <DisplayPost data={data} /> : <div>{`Post: ${postId}`}</div>}</>
  );
};

export default PostPage;
