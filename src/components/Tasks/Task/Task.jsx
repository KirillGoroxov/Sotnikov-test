import React, { useState, useEffect } from "react";
import styles from "./Task.module.scss";
import Checkbox from "./Checkbox/Checkbox";
import Title from "./Title/Title";
const Task = (props) => {
  const [checked, setChecked] = useState(false);
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(props.title);
  // функция для отметки поста
  const notice = () => {
    setChecked(() => !checked);
    const setChecking = props.setChecking;
    // Коллекция чекбоксов
    const inputs = document.getElementsByName("check");
    // Делаем из коллекции массив
    const inputsArray = [...inputs];
    // Узнаем есть в массиве значения true
    const inputsFilter = inputsArray.filter((input) => input.checked === true);
    // Если значений true в массиве нет меняем глобальную переменную на false
    if (inputsFilter.length === 0) setChecking(false);
    // В противном случае меняем на true
    else setChecking(true);
  };

  const cancelChanges = () => {
    setTitle(props.title);
    setEdit(false);
  };
  return (
    <div
      className={styles.task}
      style={{ textDecoration: props.completed && "line-through" }}
    >
      {!edit ? (
        <img
          src="./../../../../images/post/edit.svg"
          alt=""
          onClick={() => setEdit(!edit)}
        />
      ) : (
        <img
          src="./../../../../images/post/cross.svg"
          alt=""
          onClick={cancelChanges}
          className={styles.cross}
        />
      )}
      <Title
        edit={edit}
        title={title}
        setTitle={setTitle}
        sortTodos={props.sortTodos}
        id={props.id}
      />
      {!edit ? (
        <Checkbox notice={notice} id={props.id} checked={checked} />
      ) : (
        <img
          src="./../../../../images/post/check.svg"
          onClick={() => setEdit(false)}
        />
      )}
    </div>
  );
};

export default Task;
