import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import { resolveHref } from "next/dist/next-server/lib/router/router";
// import { set } from "immutable";
import Layout from "../components/layout";

class Home extends React.Component {
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
      const data = firebase.firestore().collection(name).get();
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
        <Layout />
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
                <img key={index} src={movie.imgurl} alt={movie.title} />
              ))
            : books.map((book, index) => (
                <img key={index} src={book.imgurl} alt={book.title} />
              ))
          : null}
      </div>
    );
  }
}

export default Home;
