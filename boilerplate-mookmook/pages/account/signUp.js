/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
import React from "react";
import { useSelector } from "react-redux";
import { Offcanvas, Button, Image } from "react-bootstrap";

// import { styles } from "./styles.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { provider, auth } from "../_app";

// let firebaseui = require('firebaseui');

const SignUpPage = ({ show, onHide }) => {
  const e = useSelector((store) => store.account.get("displayName"));

  function loginFacebook() {
    auth().signInWithPopup(provider.facebook);
  }

  function loginGoogle() {
    auth().signInWithPopup(provider.google);
  }

  function logout() {
    auth()
      .signOut()
      .catch((err) => {
        console.error("logout error: ", err);
      });
  }

  return (
    <Offcanvas show={show} onHide={onHide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>SignUp</Offcanvas.Title>
        <Offcanvas.Title>{`hi ${e}`}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Image
          src="/assets/facebook_login.png"
          onClick={loginFacebook}
          width="250"
          height="65"
        />
        <br />
        <br />
        <Image
          src="/assets/btn_google_signin_dark_normal_web@2x.png"
          width="250"
          height="50"
          onClick={loginGoogle}
        />
        <br />
        <br />
        <Button onClick={logout}>Logout</Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SignUpPage;
