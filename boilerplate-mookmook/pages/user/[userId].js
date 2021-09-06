import React, { useState } from "react";
import { useRouter } from "next/router";
import { Card, Button, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import styles from "./styles.module.scss";

import Layout from "../../components/layout";
import DisplayPosts from "../../components/displayPosts";
import { Scrollbars } from "react-custom-scrollbars";

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

const UserPage = () => {
  const router = useRouter();
  const host = router.query.userId;

  const [color, setColor] = useState(false);
  const handleColor = (color) => setColor(color);

  const [countMovie, setMovie] = useState(0);
  const countMovies = (movie) => setMovie(movie);

  const [countBook, setBook] = useState(0);
  const countBooks = (book) => setMovie(book);

  const account = useSelector((store) => store.account);
  const displayName = account.get("displayName");
  const photoURL = account.get("photoURL");
  const email = account.get("email");

  return (
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
        {/* <div className={styles.row}> */}
        <div className={styles.side}>
          <h2>Profile</h2>
          <a>당신은 상위 몇퍼센트입니다</a>
          <br />
          <br /> <br />
          <br />
          <div className={styles["post-component"]}>
            <Image
              className={styles.image}
              src={photoURL}
              width="80"
              height="80"
            />
            <div className={styles.text}>{displayName}</div>
            <div className={styles.email}>{email}</div>
          </div>
          <br />
          <br /> <br />
          <br /> <br />
          <br />
          <h3>
            {countMovie}권의 영화를 보고,
            <br /> {countBook}권의 책을 읽으셨어요
          </h3>
          <br />
          <p>가장 마음에 드는 후기를 하나 선택해주세요</p>
        </div>
        <div className={styles.main}>
          {" "}
          {host ? (
            <DisplayPosts
              types="all"
              style={{ zIndex: "-1", paddingLeft: "-300px" }}
              host={host}
              color={color}
              countMovies={countMovies}
              countBooks={countBooks}
            />
          ) : null}
        </div>
      </div>
      {/* </div> */}
      <div className={styles.footer}>
        <a>
          mookmook@knu.ac.kr
          <br />
          contact: 010-1234-5678
        </a>
      </div>
    </Scrollbars>
  );
};

export default UserPage;
