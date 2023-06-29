import React, { useState } from "react";
import styles from "./Photo.module.scss";
const Photo = (props) => {
  const [modal, setModal] = useState(false);
  const hideModal = (e) => {
    if (e.target.id !== "imgModal") setModal(false);
  };
  return (
    <>
      <div className={styles.photo}>
        <img src={props.url} alt="" onClick={() => setModal(true)} />
        <div className={styles.title}>{props.title}</div>
      </div>
      {modal && (
        <div className={styles.modal} onClick={hideModal}>
          <img
            src="./../../../../../../images/post/cross.svg"
            className={styles.cross}
            alt=""
            onClick={() => setModal(false)}
          />
          <img src={props.url} alt="" id="imgModal" />
        </div>
      )}
    </>
  );
};

export default Photo;
