import React, { useState } from "react";
import { useRouter } from "next/router";
import { Form, Card, Button } from "react-bootstrap";
import Layout from "../../components/layout";
import DisplayPosts from "../../components/displayPosts";

const UserPage = () => {
  const router = useRouter();
  const host = router.query.userId;

  const [color, setColor] = useState(false);
  const handleColor = (color) => setColor(color);

  const [countMovie, setMovie] = useState(0);
  const countMovies = (movie) => setMovie(movie);

  const [countBook, setBook] = useState(0);
  const countBooks = (book) => setMovie(book);

  return (
    <div>
      <Layout />
      <div>
        <Card class="text-center">
          <Card.Header>{`${host}`}님의 컬렉션입니다</Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p>
                {countMovie}권의 영화를 보고, {countBook}권의 책을 읽으셨어요
              </p>
              <br />
              <footer className="blockquote-footer">
                가장 마음에 드는 후기를 하나 선택해주세요
              </footer>
            </blockquote>
          </Card.Body>
        </Card>
      </div>

      {host ? (
        <DisplayPosts
          host={host}
          color={color}
          countMovies={countMovies}
          countBooks={countBooks}
        />
      ) : null}
    </div>
  );
};

export default UserPage;