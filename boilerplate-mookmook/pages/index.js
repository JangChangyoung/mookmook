/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import { Navbar, Nav, Container, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PostCreatePage from "./post/create";
import SignUpPage from "./account/signUp";
import Contact from "./contact/index";
import style from "./style.module.scss";

const Home = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [show2, setShow2] = useState(false);
  const handleShow2 = () => setShow2(true);
  const handleClose2 = () => setShow2(false);
  const [show3, setShow3] = useState(false);
  const handleShow3 = () => setShow3(true);
  const handleClose3 = () => setShow3(false);

  return (
    <>
      <PostCreatePage show={show} onHide={handleClose} />
      <SignUpPage show={show2} onHide={handleClose2} />
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-start">
              <Nav.Link onClick={handleShow}>+Create</Nav.Link>
              <Nav.Link href="#create">Book or Movie</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Brand className={style.brandName} href="#home">
            Mook-Mook
          </Navbar.Brand>
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Nav.Link onClick={handleShow2}>Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid>
        <Contact show={show3} onHide={handleClose3} />
        <Image
          className={style.contact}
          src="img/contact.png"
          width="50"
          height="50"
          onClick={handleShow3}
          rounded
        />
      </Container>
    </>
  );
};

export default Home;

// const handleShow = () => {
//   if(type === 'a') {
//     setShow(true)
//   }
//   if(type === 'b') {

//   }
// }

// const [shows, setShows] = useState({ show1: false, show2: false, show3: false});
