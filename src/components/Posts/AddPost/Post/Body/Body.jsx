import React from "react";
import styles from "./Body.module.scss";
const Body = (props) => {
  const newBody = props.newBody;
  const setNewBody = props.setNewBody;
  return (
    <div className={styles.body}>
      <textarea
        type="text"
        value={newBody}
        onChange={(e) => setNewBody(e.target.value)}
        onFocus={() => setNewBody("")}
        onBlur={() => newBody === "" && setNewBody("Введите текст поста")}
      />
      <img
        src="./../../../../../../images/plus.svg"
        alt=""
        onClick={() => props.addNewPost()}
      />
    </div>
  );
};

export default Body;
