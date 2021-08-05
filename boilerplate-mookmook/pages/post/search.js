import React, { Component } from "react";
import axios from "axios";
import { Form, Modal, Button, Card, Row, Col } from "react-bootstrap";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import "bootstrap/dist/css/bootstrap.min.css";
import Color from "color-thief-react";

class MovieInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id, year, title, imgurl, rating, director, actor, selectTitle } =
      this.props;
    function chBackcolor() {
      document.Card.style.background = "#DDDDDD";
    }
    return (
      <>
        <Card href={id}>
          <Card.Img variant="top" src={imgurl} />
          <Card.Body>
            <Card.Title>
              {title.replace(/<b>/gi, "").replace(/<\/b>/gi, "")}
            </Card.Title>
            <Card.Text>
              <bold>year: </bold> {year}
              <br></br>
              <bold>rating: </bold> {rating}
              <br></br>
              <bold>director: </bold> {director}
              <br></br>
              <bold>actor: </bold> {actor}
              <br></br>
            </Card.Text>
            <Button onClick={() => selectTitle(title)} variant="outline-info">
              Select
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  }
}

class BookInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id, year, title, imgurl, price, author, publisher, selectTitle } =
      this.props;

    return (
      <>
        <Card href={id}>
          <Card.Img variant="top" src={imgurl} />
          <Card.Body>
            <Card.Title>
              {title.replace(/<b>/gi, "").replace(/<\/b>/gi, "")}
            </Card.Title>
            <Card.Text>
              <bold>저자: </bold> {author}
              <br></br>
              <bold>출판사: </bold> {publisher}
              <br></br>
              <bold>출간일: </bold> {year}
              <br></br>
              <bold>가격: </bold> {price}
              <br></br>
            </Card.Text>
            <Button onClick={() => selectTitle(title)} variant="outline-info">
              Select
            </Button>
          </Card.Body>
        </Card>
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

  render() {
    const { items } = this.state;
    const { type, isOpen, closeModal, selectTitle, handleSubmit } = this.props;

    return (
      <Modal show={isOpen} onHide={closeModal}>
        <ModalHeader closeButton>
          <ModalTitle>{type} 검색하기</ModalTitle>
        </ModalHeader>
        <ModalBody>
          {/*  */}
          <Form>
            <Row className="align-items-center">
              <Col xs="auto">
                <Form.Control
                  className="mb-2"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.search}
                  placeholder="title"
                />
              </Col>
              <Col xs="auto">
                <Button onClick={() => this.handleClick(type)}>검색</Button>
              </Col>
            </Row>
          </Form>
          {/* ------------------------------------ */}
          {/* <Form.Group>
            <Form.Label>title: </Form.Label>
            <Form.Control
              type="text"
              onChange={this.handleChange}
              value={this.state.search}
              placeholder="name input"
            />
            <Button onClick={() => this.handleClick(type)}>검색</Button>
          </Form.Group> */}
        </ModalBody>
        {type ? (
          type === "movie" ? (
            <div className="movies">
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
        <ModalFooter>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
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
            Search {type}
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
