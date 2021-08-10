/* eslint-disable react/no-array-index-key */
import React from "react";
import Router from "next/router";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/layout";

function DisplayPosts(props) {
  const { type, movies, books } = props;
  if (type !== null) {
    return type
      ? movies.map((movie, index) => (
          // eslint-disable-next-line react/button-has-type
          <button onClick={() => Router.push(`/post/movie_${movie.docID}`)}>
            <img
              key={index}
              width="200px"
              height="150px"
              src={movie.imgurl}
              alt={movie.title}
            />
          </button>
        ))
      : books.map((book, index) => (
          // eslint-disable-next-line react/button-has-type
          <button onClick={() => Router.push(`/post/book_${book.docID}`)}>
            <img
              key={index}
              width="200px"
              height="150px"
              src={book.imgurl}
              alt={book.title}
            />
          </button>
        ));
  }
  return "click type";
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      this.setState({ movies, books, isLoading: false });
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
          const data = doc.data();
          data.docID = doc.id;
          if (name === "book") books.push(data);
          else if (name === "movie") movies.push(data);
        });
      })
    );
    this.changeLoading(movies, books);
  };

  checkChange = (type) => this.setState({ type });

  render() {
    console.log("rendering");
    const { isLoading, type, movies, books } = this.state;

    return (
      <div>
        <Layout />
        <Form.Check
          type="radio"
          name="type"
          label="movie"
          onChange={() => this.checkChange(true)}
        />
        <Form.Check
          type="radio"
          name="type"
          label="book"
          onChange={() => this.checkChange(false)}
        />
        {isLoading ? (
          "loading . . ."
        ) : (
          <DisplayPosts type={type} movies={movies} books={books} />
        )}
      </div>
    );
  }
}

export default Home;
