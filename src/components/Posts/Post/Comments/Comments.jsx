import React from "react";
import styles from "./Comments.module.scss";
import Comment from "./Comment/Comment";

const Comments = (props) => {
  const comments = props.comments;
  return (
    <div className={styles.comments}>
      {props.showComment &&
        comments &&
        comments.map((c, index) => (
          <Comment key={index} name={c.name} email={c.email} body={c.body} />
        ))}
    </div>
  );
};

export default Comments;
