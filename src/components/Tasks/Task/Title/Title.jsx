import React from "react";
import styles from "./Title.module.scss";

const Title = (props) => {
  const edit = props.edit;
  const title = props.title;
  return (
    <>
      {!edit && (
        <div className={styles.text} onClick={props.sortTodos} id={props.id}>
          {title}
        </div>
      )}
      {edit && (
        <input
          autoFocus
          value={title}
          onChange={(e) => props.setTitle(e.target.value)}
        />
      )}
    </>
  );
};

export default Title;
