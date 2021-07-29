/* eslint-disable react/prop-types */
/* eslint-disable no-useless-catch */
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "pages/contact/styles.module.scss";

const Contact = ({ show, onHide }) => {
  const [question, setQuestion] = useState("");

  const handleQuestion = ({ target: { value } }) => setQuestion(value);
  const handleClose = () => onHide(false);
  const handleSubmit = async () => {
    try {
      if (question.length > 8) {
        await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question }),
        });
        handleClose();
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide} dialogClassName={styles.modalposition}>
        <Modal.Header closeButton>
          <Modal.Title>Give Us FeedBack</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            className={styles.inputstyle}
            placeholder="🙋‍♂️문의사항이 있다면 적어주세요"
            value={question}
            onChange={handleQuestion}
          />
        </Modal.Body>
        <Modal.Footer className={styles.speechbubble}>
          <Button variant="secondary" onClick={handleSubmit}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Contact;
