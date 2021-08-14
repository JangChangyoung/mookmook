import React from "react";
import firebase from "firebase";
import "firebase/auth";
import { useRouter } from "next/router";
import { Form } from "react-bootstrap";
import PostDelete from "pages/post/delete";
import Layout from "../../components/layout";
import "bootstrap/dist/css/bootstrap.min.css";

class UserPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // posts: this.postUploading(),
      books: null,
      movies: null,
      isLoading: true,
      isHost: false,
      type: null,
    };
  }

  componentDidMount() {
    this.postUploading();
  }

  postUploading = async () => {
    console.log("loading");
    const books = [];
    const movies = [];

    await Promise.all(
      ["book", "movie"].map(async (name) => {
        const docs = await this.getPosts(name);
        docs.forEach((doc) => {
          if (name === "book") books.push([doc.id, doc.data()]);
          else if (name === "movie") movies.push([doc.id, doc.data()]);
        });
      })
    );
    this.changeLoading(movies, books);
  };

  changeLoading = (movies, books) => {
    const { hostID } = this.props;
    const { guestID } = this.props;

    if (books !== [] && movies !== []) {
      this.setState({ movies, books, isLoading: false });
    } else {
      this.setState({ isLoading: "error" });
    }

    if (hostID === guestID) {
      this.setState({ isHost: true });
    } else {
      this.setState({ isHost: false });
    }
  };

  getPosts = (name) => {
    const { hostID } = this.props;
    return new Promise((resolve, reject) => {
      const data = firebase
        .firestore()
        .collection(name)
        .where("userID", "==", hostID)
        .get();
      resolve(data);
    });
  };

  checkChange = (e) => this.setState({ type: e.target.value });

  render() {
    console.log("rendering");
    const { movies, books, isHost, isLoading, type } = this.state;

    return (
      <div>
        <Form.Check
          type="radio"
          name="type"
          value="movie"
          label="movie"
          onChange={(e) => this.checkChange(e)}
        />
        <Form.Check
          type="radio"
          name="type"
          value="book"
          label="book"
          onChange={(e) => this.checkChange(e)}
        />
        {isLoading
          ? "loading . . ."
          : type
          ? type === "movie"
            ? movies.map((movie, index) => (
                <div>
                  <img src={movie[1].imgurl} alt={movie[1].title} />
                  {isHost ? (
                    <PostDelete key={movie[0]} type="movie" docID={movie[0]} />
                  ) : null}
                </div>
              ))
            : books.map((book, index) => (
                <div>
                  <img src={book[1].imgurl} alt={book[1].title} />
                  {isHost ? (
                    <PostDelete key={book[0]} type="book" docID={book[0]} />
                  ) : null}
                </div>
              ))
          : null}
      </div>
    );
  }
}

const UserPage = () => {
  const router = useRouter();
  const hostID = router.query.userId;
  const guestID = firebase.auth().currentUser.uid;
  console.log(hostID);
  console.log(guestID);

  return (
    <div>
      <Layout />
      {`${hostID}`}님의 컬렉션입니다
      {hostID ? <UserPost hostID={hostID} guestID={guestID} /> : null}
    </div>
  );
};

export default UserPage;