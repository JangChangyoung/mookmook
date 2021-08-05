import React, { useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useRouter } from "next/router";
import { Form } from "react-bootstrap";
import PostDelete from "pages/post/delete";
import Layout from "../../components/layout";
import "bootstrap/dist/css/bootstrap.min.css";
// import { resolveHref } from "next/dist/next-server/lib/router/router";
// import { set } from "immutable";

class UserPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // posts: this.postUploading(),
      books: null,
      movies: null,
      isLoading: true,
      type: null,
    };
  }

  componentDidMount() {
    this.postUploading();
  }

  changeLoading = (movies, books) => {
    if (books !== [] && movies !== []) {
      console.log(books, movies);
      this.setState({ movies, books, isLoading: false });
    } else {
      this.setState({ isLoading: "error" });
    }
  };

  getPosts = (name) => {
    return new Promise((resolve, reject) => {
      console.log("this", this.props.uid);
      const data = firebase
        .firestore()
        .collection(name)
        .where("userID", "==", this.props.uid)
        .get();
      resolve(data);
    });
  };

  postUploading = async () => {
    console.log("loading");
    const books = [];
    const movies = [];

    await Promise.all(
      ["book", "movie"].map(async (name) => {
        const docs = await this.getPosts(name);
        docs.forEach((doc) => {
          if (name === "book") books.push(doc.data());
          else if (name === "movie") movies.push(doc.data());
        });
      })
    );
    this.changeLoading(movies, books);
  };

  checkChange = (e) => this.setState({ type: e.target.value });

  render() {
    console.log("rendering");
    const { movies, books, isLoading, type } = this.state;

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
                  <img key={index} src={movie.imgurl} alt={movie.title} />
                  <PostDelete uid={this.props.uid} docID={index} type="movie" />
                </div>
              ))
            : books.map((book, index) => (
                <div>
                  <img key={index} src={book.imgurl} alt={book.title} />
                  <PostDelete uid={this.props.uid} docID={index} type="book" />
                </div>
              ))
          : null}
      </div>
    );
  }
}

const UserPage = () => {
  const router = useRouter();
  const { userId } = router.query;

  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // data request
  //   setLoading(false);
  // }, []);
  console.log("rendering");

  return (
    <div>
      <Layout />
      {`user: ${userId}`}
      {userId ? <UserPost uid={userId} /> : null}
    </div>
  );
};

export default UserPage;
