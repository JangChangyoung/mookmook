/* eslint-disable no-useless-catch */
import React, { useState } from 'react';

import styles from 'pages/contact/styles.module.scss';

const Contact = () => {
  const [question, setQuestion] = useState('');

  const handleQuestion = ({ target: { value } }) => setQuestion(value);

  const handleSubmit = async () => {
    try {
      if (question.length > 8) {
        await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
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
      <button type="button" onClick={handleSubmit}>전송</button>
    </div>
  );
};

export default Contact;
