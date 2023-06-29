import React from "react";
import styles from "./Title.module.scss";
const Title = (props) => {
  const edit = props.edit;
  const title = props.title;
  return (
    <div className={styles.title}>
      {!edit && title}
      {edit && (
        <textarea
          type="text"
          value={title}
          onChange={(e) => props.setTitle(e.target.value)}
        />
      )}
    </div>
  );
};

export default Title;
