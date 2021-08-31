/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable max-classes-per-file */
import React, { Component } from "react";
import axios from "axios";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./style.module.scss";

class MovieInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id, year, title, imgurl, rating, director, actor, selectTitle } =
      this.props;

    return (
      <>
        <div className={style.card}>
          <body>
            <div className="wrapper">
              <a href={id} className={style.product_img}>
                <img src={imgurl} alt="" height="200" width="170" />
              </a>
              <div className={style.product_info}>
                <div className={style.product_text}>
                  <h1>{title.replace(/<b>/gi, "").replace(/<\/b>/gi, "")}</h1>
                  <h2>by {director.replaceAll("|", " ")}</h2>
                  <p>
                    배우: {actor} <br />
                    개봉년도: {year} <br />
                    평점: {rating}🏆
                  </p>
                </div>
                <div className={style.product_price_btn}>
                  <button
                    type="button"
                    onClick={() => selectTitle(title, imgurl)}
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>
          </body>
        </div>
      </>
    );
  }
}

class BookInfo extends Component {
  constructor(props) {
    super(props);
  }

  lengthlimit = (title) => {
    if (title.length > 26) {
      const titles = `${title
        .replace(/<b>/gi, "")
        .replace(/<\/b>/gi, "")
        .substring(0, 24)}..`;
      return titles;
    }
    return title.replace(/<b>/gi, "").replace(/<\/b>/gi, "");
  };

  render() {
    const { id, year, title, imgurl, price, author, publisher, selectTitle } =
      this.props;

    return (
      <>
        <div className={style.card}>
          <body>
            <div className="wrapper">
              <a href={id} className={style.product_img}>
                <img src={imgurl} alt="" height="200" width="170" />
              </a>
              <div className={style.product_info}>
                <div className={style.product_text}>
                  <h1>{this.lengthlimit(title)}</h1>
                  <h2>by {author.replaceAll("|", " ")}</h2>
                  <p>
                    출판사: {publisher} <br />
                    {/* 대부분 없어서 뺌 출간일: {year} <br /> */}
                    가격: {price} 원
                  </p>
                </div>
                <div className={style.product_price_btn}>
                  <button
                    type="button"
                    onClick={() => selectTitle(title, imgurl)}
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>
          </body>
        </div>
      </>
    );
  }
}

class ModalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      items: [],
    };
  }

  handleChange = (e) => this.setState({ search: e.target.value });

  handleClick = async (type) => {
    const title = this.state.search;
    const api = type === "movie" ? "Movies" : "Books";

    if (title) {
      const {
        data: {
          data: { items },
        },
      } = await axios.get(
        `http://localhost:3000/api/get${api}?keyword=${encodeURIComponent(
          title
        )}`
      );
      this.setState({ items });
    }
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }

  render() {
    const { items } = this.state;
    const { type, isOpen, closeModal, selectTitle, handleSubmit } = this.props;

    return (
      <Modal show={isOpen} onHide={closeModal} scrollable>
        <ModalHeader closeButton className={style.modal_header}>
          <ModalTitle>Search {type}</ModalTitle>
        </ModalHeader>
        <ModalBody className={style.modal_body}>
          <Form>
            <Row className={style.search_bar}>
              <Col sm={9}>
                <Form.Control
                  onKeyPress={e => this.handleKeyPress(e,type)}
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.search}
                  placeholder="title"
                />
              </Col>
              <Col xs="auto">
                <Button
                  variant="outline-secondary"
                  onClick={() => this.handleClick(type)}
                >
                  Search
                </Button>
              </Col>
            </Row>
          </Form>

          {type ? (
            type === "movie" ? (
              <div className={style.movies}>
                {items.map((movie, index) => (
                  <MovieInfo
                    key={index}
                    id={movie.link}
                    year={movie.pubDate}
                    title={movie.title}
                    imgurl={movie.image}
                    rating={movie.userRating}
                    director={movie.director}
                    actor={movie.actor}
                    selectTitle={selectTitle}
                  />
                ))}
              </div>
            ) : (
              <div className="books">
                {items.map((book, index) => (
                  <BookInfo
                    key={index}
                    id={book.link}
                    year={book.pubDate}
                    title={book.title}
                    imgurl={book.image}
                    price={book.price}
                    author={book.author}
                    publisher={book.publisher}
                    selectTitle={selectTitle}
                  />
                ))}
              </div>
            )
          ) : (
            ""
          )}
        </ModalBody>
        <ModalFooter className={style.modal_footer}>
          <Button variant="secondary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  openModal = () => this.setState({ isOpen: true });

  closeModal = () => this.setState({ isOpen: false });

  render() {
    const { type, selectTitle } = this.props;

    return (
      <>
        {type ? (
          <Button variant="outline-primary" onClick={this.openModal}>
            Search
          </Button>
        ) : null}
        {this.state.isOpen ? (
          <ModalForm
            type={type}
            closeModal={this.closeModal}
            isOpen={this.state.isOpen}
            handleSubmit={this.closeModal}
            selectTitle={selectTitle}
          />
        ) : null}
      </>
    );
  }
}

export default Search;
