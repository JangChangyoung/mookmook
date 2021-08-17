/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import { Navbar, Nav, Container, Image, Button } from "react-bootstrap";

import firebase from "firebase";

import PostCreatePage from "../pages/post/create";
import SignUpPage from "../pages/account/signUp";
import Contact from "../pages/contact/index";

import style from "./style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const Layout = () => {
  const user = firebase.auth().currentUser;

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
          <Navbar id="basic-navbar-nav">
            <Nav className="justify-content-start">
              <Nav.Link onClick={handleShow}>
                <Button variant="outline-dark">
                  <i className="bi bi-patch-plus" /> Create
                </Button>
              </Nav.Link>
            </Nav>
          </Navbar>
          <Navbar.Brand className={style.brandName} href="/">
            Mook-Mook
          </Navbar.Brand>
          <Navbar id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link onClick={handleShow2}>
                {user ? "Logout" : "Login"}
              </Nav.Link>
              {user ? (
                <Nav.Link href={`/user/${user.uid}`}>
                  MyPage
                </Nav.Link>
              ) : null}
            </Nav>
          </Navbar>
        </Container>
      </Navbar>
      <Container fluid>
        <Contact show={show3} onHide={handleClose3} />
        <Image
          className={style.contact}
          src="/assets/contact.png"
          width="50"
          height="50"
          onClick={handleShow3}
          rounded
        />
      </Container>
    </>
  );
};

export default Layout;
