import React from "react";
import styles from "./Title.module.scss";
const Title = (props) => {
  const title = props.title;
  const setTitle = props.setTitle;

  return (
    <div className={styles.title}>
      {!props.edit ? (
        <span onClick={(e) => props.openPhotos(e)} id={props.id}>
          {title}
        </span>
      ) : (
        <>
          <input
            type="text"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </>
      )}
    </div>
  );
};

export default Title;
