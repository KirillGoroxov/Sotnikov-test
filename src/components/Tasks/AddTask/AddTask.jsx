import React, { useState } from "react";
import styles from "./AddTask.module.scss";
const AddTask = (props) => {
  const newTaskText = props.newTaskText;
  const setNewTaskText = props.setNewTaskText;
  const addTask = props.addNewTask;
  const adding = props.adding;
  const setAdding = props.setAdding;
  return (
    <div className={styles.addContainer}>
      {!adding ? (
        <div className={styles.add} onClick={() => setAdding(true)}>
          <img src="./../../../../images/plus.svg" alt="" />
        </div>
      ) : (
        <div className={styles.input}>
          <input
            autoFocus
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
          />
          <img
            src="./../../../../images/post/check.svg"
            alt=""
            onClick={addTask}
          />
        </div>
      )}
    </div>
  );
};

export default AddTask;
