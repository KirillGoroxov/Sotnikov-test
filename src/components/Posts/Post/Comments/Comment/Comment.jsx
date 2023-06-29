import React from "react";
import styles from "./Comment.module.scss";
const Comment = (props) => {
  return (
    <div className={styles.comment}>
      <div className={styles.name}>{props.name}</div>
      <div className={styles.body}>{props.body}</div>
      <div className={styles.email}>{props.email}</div>
    </div>
  );
};

export default Comment;
