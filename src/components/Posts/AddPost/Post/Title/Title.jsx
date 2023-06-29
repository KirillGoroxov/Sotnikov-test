import React from "react";
import styles from "./Title.module.scss";
const Title = (props) => {
  const newTitle = props.newTitle;
  const setNewTitle = props.setNewTitle;
  return (
    <div className={styles.title}>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        onFocus={() => setNewTitle("")}
        onBlur={() => newTitle === "" && setNewTitle("Введите название поста")}
      />
    </div>
  );
};

export default Title;
