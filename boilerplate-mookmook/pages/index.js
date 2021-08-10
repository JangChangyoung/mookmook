/* eslint-disable react/no-array-index-key */
import React from "react";
import Router from "next/router";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/layout";
import styles from "./style.module.scss";

function DisplayPosts(props) {
  const { type, movies, books } = props;
  if (type !== null) {
    return type
      ? movies.map((movie, index) => (
          // eslint-disable-next-line react/button-has-type
          <button onClick={() => Router.push(`/post/movie_${movie.docID}`)}>
            <div className="small-4 columns">
              <div
                className={styles.cardcontainer}
                ontouchstart="this.classList.toggle('hover');"
              >
                <div className={styles.card}>
                  <div className={styles.front}>
                    <img
                      key={index}
                      width="200px"
                      height="150px"
                      src={movie.imgurl}
                      alt={movie.title}
                    />
                  </div>
                  <div className={styles.back}>
                    <p>
                      제목:{movie.title}
                      <br />
                      색상: {movie.color}
                      <br />
                      명대사: {movie.line}
                      <br />
                      리뷰: {movie.review}
                      <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))
      : books.map((book, index) => (
          // eslint-disable-next-line react/button-has-type
          <button onClick={() => Router.push(`/post/book_${book.docID}`)}>
            <div className="small-4 columns">
              <div
                className={styles.cardcontainer}
                ontouchstart="this.classList.toggle('hover');"
              >
                <div className={styles.card}>
                  <div className={styles.front}>
                    <img
                      key={index}
                      width="200px"
                      height="150px"
                      src={book.imgurl}
                      alt={book.title}
                    />
                  </div>
                  <div className={styles.back}>
                    <p>
                      제목:{book.title}
                      <br />
                      색상: {book.color}
                      <br />
                      명대사: {book.line}
                      <br />
                      리뷰: {book.review}
                      <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
          <div className={styles.container_row}>
            <DisplayPosts type={type} movies={movies} books={books} />
          </div>
        )}
      </div>
    );
  }
}

export default Home;
