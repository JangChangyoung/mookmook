import React from "react";
import styles from "./styles.module.scss";

const CardFlipPage = () => {
  return (
    <>
      <div className={styles.container_row}>
        <div className="small-4 columns">
          <div
            className={styles.cardcontainer}
            ontouchstart="this.classList.toggle('hover');"
          >
            <div className={styles.card}>
              <div className={styles.front}>
                <h2>Front</h2>
              </div>
              <div className={styles.back}>
                <h2>Back</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="small-4 columns">
          <div
            className={styles.cardcontainer}
            ontouchstart="this.classList.toggle('hover');"
          >
            <div className={styles.card}>
              <div className={styles.front}>
                <h2>Front</h2>
              </div>
              <div className={styles.back}>
                <h2>Back</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="small-4 columns">
          <div
            className={styles.cardcontainer}
            ontouchstart="this.classList.toggle('hover');"
          >
            <div className={styles.card}>
              <div className={styles.front}>
                <h2>Front</h2>
              </div>
              <div className={styles.back}>
                <h2>Back</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardFlipPage;
