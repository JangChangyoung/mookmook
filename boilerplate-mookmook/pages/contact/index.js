/* eslint-disable no-useless-catch */
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "pages/contact/styles.module.scss";
import Button from "react-bootstrap/Button";

const Contact = () => {
  const [question, setQuestion] = useState("");

  const handleQuestion = ({ target: { value } }) => setQuestion(value);

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
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className={styles.container}>
      contact page
      <input value={question} onChange={handleQuestion} />
      <Button variant="primary" type="button" onClick={handleSubmit}>
        전송
      </Button>
    </div>
  );
};

export default Contact;
