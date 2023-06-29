import React from "react";
import styles from "./Body.module.scss";
const Body = (props) => {
  const body = props.body;
  const edit = props.edit;
  return (
    <div className={styles.body}>
      {!edit && body}
      {edit && (
        <textarea
          value={body}
          onChange={(e) => props.setBody(e.target.value)}
        ></textarea>
      )}
    </div>
  );
};

export default Body;
