import React, { useState } from "react";
import { useRouter } from "next/router";
import { Card, Button, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";
import styles from "./styles.module.scss";

import Layout from "../../components/layout";
import DisplayPosts from "../../components/displayPosts";
import ColorSelect from "../../components/colorSelect";

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

const UserPage = () => {
  const router = useRouter();
  const host = router.query.userId;

  const [color, setColor] = useState(null);
  const changeColor = (color) => setColor(color);

  const [countMovie, setMovie] = useState(0);
  const countMovies = (movie) => setMovie(movie);

  const [countBook, setBook] = useState(0);
  const countBooks = (book) => setBook(book);

  const account = useSelector((store) => store.account);
  const displayName = account.get("displayName");
  const photoURL = account.get("photoURL");
  const email = account.get("email");

  return (
<<<<<<< Updated upstream
    <Scrollbars
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
      autoHeight
      autoHeightMin="100vh"
      universal
    >
      <Layout />
      <ColorSelect changeColor={changeColor} />
      <div className={styles.container}>
        <div className={styles.side}>
          <h2>Profile</h2>
          <div className={styles["post-component"]}>
            <Image
              className={styles.image}
              src={photoURL}
              width="80"
              height="80"
            />
            <p>
              {displayName}님은 상위{" "}
              <span style={{ color: "red" }}>0.00 %</span> 입니다
            </p>
          </div>
          <br />
          <br /> <br />
          <br /> <br />
          <br />
          <h3>
            {countMovie}개의 영화를 보고,
            <br /> {countBook}권의 책을 읽으셨어요!
          </h3>
          <br />
          <p>가장 마음에 드는 후기를 하나 선택해주세요</p>
=======
    <>
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        autoHeight
        autoHeightMin="100vh"
        universal={true}
      >
        <Layout />
        <div className={styles.container}>
          <div className={styles.side}>
            <h2>Profile</h2>
            <div className={styles["post-component"]}>
              <Image
                className={styles.image}
                src={photoURL}
                width="80"
                height="80"
              />
              <p>
                {displayName}님은 상위{" "}
                <span style={{ color: "red" }}>0.00 %</span> 입니다
              </p>
            </div>
            <br />
            <br /> <br />
            <br /> <br />
            <br />
            <h3>
              {countMovie}개의 영화를 보고,
              <br /> {countBook}권의 책을 읽으셨어요!
            </h3>
            <br />
            <p>가장 마음에 드는 후기를 하나 선택해주세요</p>
          </div>
          <div className={styles.main}>
            {" "}
            {host ? (
              <DisplayPosts
                types="all"
                host={host}
                color={color}
                countMovies={countMovies}
                countBooks={countBooks}
              />
            ) : null}
          </div>
>>>>>>> Stashed changes
        </div>
        <div className={styles.main}>
          {" "}
          {host ? (
            <DisplayPosts
              types="all"
              host={host}
              color={color}
              countMovies={countMovies}
              countBooks={countBooks}
            />
          ) : null}
        </div>
      </div>
      <div className={styles.footer}>
        <p>mookmook@knu.ac.kr</p>
        <p>contact: 010-1234-5678</p>
      </div>
    </Scrollbars>
  );
};

export default UserPage;
