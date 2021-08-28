/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
import React from "react";
import Router from "next/router";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// import { Form } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/layout";
import styles from "./styles.module.scss";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: null,
      movies: null,
      isLoading: true,
      type: false,
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
          const data = doc.data();
          data.docID = doc.id;
          if (name === "book") books.push(data);
          else if (name === "movie") movies.push(data);
        });
      })
    );
    this.changeLoading(movies, books);
  };

  getPosts = (name) => {
    return new Promise((resolve) => {
      const data = firebase
        .firestore()
        .collection(name)
        .orderBy("colorhue")
        .limit(32)
        .get();
      resolve(data);
    });
  };

  changeLoading = (movies, books) => {
    if (books !== [] && movies !== []) {
      this.setState({ movies, books, isLoading: false });
    }
  };

  displayPosts = (props) => {
    const { type, movies, books } = props;
    if (movies || books) {
      return type
        ? books.map((book, index) => (
            <button
              key={index}
              onClick={() => Router.push(`/post/book_${book.docID}`)}
            >
              <div className="small-4 columns">
                <div
                  className={styles.cardcontainer}
                  onTouchStart="this.classList.toggle('hover');"
                >
                  <div className={styles.card}>
                    <div className={styles.front}>
                      <img
                        // 이거 테두리 색 씌우는건데 안한게 나은것 같아서 일단은 주석!
                        // style={{
                        //   border: "solid 0.7rem",
                        //   borderColor: book.imgcolor,
                        // }}
                        key={index}
                        width="200px"
                        height="150px"
                        src={book.imgurl}
                        alt={book.title}
                      />
                    </div>
                    <div className={styles.back}>
                      <div className={styles.detail_card}>
                        <img
                          key={index}
                          width="85px"
                          height="120px"
                          src={book.titleimg}
                          alt=""
                          className={styles.detail_image}
                        />
                        <div className={styles.aboutinfo}>
                          <div className={styles.detail_title}>
                            {book.title}
                          </div>
                          <div className={styles.infobox}>
                            <div
                              className={styles.colorbox}
                              style={{ backgroundColor: book.color }}
                            />
                            <div className={styles.username}>
                              by {book.displayName}
                            </div>
                          </div>
                          <div className={styles.famoustext}>
                            " {book.line} "
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))
        : movies.map((movie, index) => (
            <button
              key={index}
              onClick={() => Router.push(`/post/movie_${movie.docID}`)}
            >
              <div className="small-4 columns">
                <div
                  className={styles.cardcontainer}
                  onTouchStart="this.classList.toggle('hover');"
                >
                  <div className={styles.card}>
                    <div className={styles.front}>
                      <img
                        // 이거 테두리 색 씌우는건데 안한게 나은것 같아서 일단은 주석!
                        // style={{
                        //   border: "solid 0.7rem",
                        //   borderColor: movie.imgcolor,
                        // }}
                        key={index}
                        width="200px"
                        height="150px"
                        src={movie.imgurl}
                        alt={movie.title}
                      />
                    </div>
                    <div className={styles.back}>
                      <div className={styles.detail_card}>
                        <img
                          key={index}
                          width="85px"
                          height="120px"
                          src={movie.titleimg}
                          alt=""
                          className={styles.detail_image}
                        />
                        <div className={styles.aboutinfo}>
                          <div className={styles.detail_title}>
                            {movie.title}
                          </div>
                          <div className={styles.infobox}>
                            <div
                              className={styles.colorbox}
                              style={{ backgroundColor: movie.color }}
                            />
                            <div className={styles.username}>
                              by {movie.displayName}
                            </div>
                          </div>
                          <div className={styles.famoustext}>
                            " {movie.line} "
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ));
    }
    return "Error";
  };

  checkChange = (type) => this.setState({ type });

  loadingSkeleton = () => {
    // let wdt, hgt;
    // const innerWdt = window.innerWidth;
    // wdt = innerWdt < 717
    //   ? 1
    //   : innerWdt < 917
    //     ? 2
    //     : innerWdt < 1117
    //       ? 3
    //       : innerWdt < 1317

    return [...Array(32).keys()].map((v, i) => {
      return (
        <div className={styles["skeleton-wrapper"]} key={String(i)}>
          <SkeletonTheme color="#f2f2f2" highlightColor="#ddd">
            <Skeleton
              variant="rect"
              height={150}
              width={200}
              animation="wave"
            />
          </SkeletonTheme>
        </div>
      );
    });
  };

  render() {
    console.log("rendering");
    const { isLoading, type, movies, books } = this.state;

    return (
      <div>
        <Layout />
        <div className={styles["main-container"]}>
          <label htmlFor="switch-id" className={styles.switch}>
            <input
              type="checkbox"
              onChange={() => this.checkChange(!type)}
              id="switch-id"
            />
            <span />
          </label>
        </div>

        <div className={styles.container_row}>
          {isLoading
            ? this.loadingSkeleton()
            : this.displayPosts({ type, movies, books })}
        </div>
      </div>
    );
  }
}

export default Home;
