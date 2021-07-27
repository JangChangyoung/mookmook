import React from "react";
import { Offcanvas } from "react-bootstrap";

const PostCreatePage = ({ show, handleClose }) => {
  console.log(show, handleClose);
  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Create Page</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body> Let uss make New Page!!!!!!!</Offcanvas.Body>
    </Offcanvas>
  );
};

export default PostCreatePage;
