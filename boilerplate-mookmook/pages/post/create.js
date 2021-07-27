import React from "react";
import { Offcanvas } from "react-bootstrap";

const PostCreatePage = ({ show, onHide }) => {
  // console.log(show, onHide);
  return (
    <Offcanvas show={show} onHide={onHide}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Create Page</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body> Let uss make New Page!!!!!!!</Offcanvas.Body>
    </Offcanvas>
  );
};

export default PostCreatePage;
