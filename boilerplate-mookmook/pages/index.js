/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import styles from "styles/index.module.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PostCreatePage from "./post/create";
import SignInPage from "./account/signIn";

const Home = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [show2, setShow2] = useState(false);
  const handleShow2 = () => setShow2(true);
  const handleClose2 = () => setShow2(false);
  return (
    <div>
      <PostCreatePage show={show} onHide={handleClose} />
      <SignInPage show={show2} onHide={handleClose2} />
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-start">
              <Nav.Link onClick={handleShow}>+Create</Nav.Link>
              <Nav.Link href="#create">Book or Movie</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Brand className={styles.brandName} href="#home">
            Mook-Mook
          </Navbar.Brand>
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Nav.Link href="./contact">contact</Nav.Link>
              <Nav.Link onClick={handleShow2}>SignIn</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Home;
