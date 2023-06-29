import React, { useState } from "react";
import styles from "./Name.module.scss";

const Name = (props) => {
  const edit = props.edit;
  const nameUser = props.nameUser;
  const setNameUser = props.setNameUser;
  const setChecking = props.setChecking;
  const [checked, setChecked] = useState(false);
  // функция для отметки поста
  const notice = () => {
    const setChecking = props.setChecking;
    // Коллекция чекбоксов
    const inputs = document.getElementsByName("check-album");
    // Делаем из коллекции массив
    const inputsArray = [...inputs];
    // Узнаем есть в массиве значения true
    const inputsFilter = inputsArray.filter((input) => input.checked === true);
    setChecked(() => !checked);
    // Если значений true в массиве нет меняем глобальную переменную на false
    if (inputsFilter.length === 0) setChecking(false);
    // В противном случае меняем на true
    else setChecking(true);
  };
  return (
    <div className={styles.name}>
      {!edit ? (
        <>
          {nameUser}
          <label className={styles.label}>
            <div className={styles.fakeCheck}>
              {checked && <img src="./../../../../../images/post/check.svg" />}
            </div>
            <input
              id={props.id}
              type="checkbox"
              name="check-album"
              onClick={notice}
              className={styles.checkbox}
            />
          </label>
        </>
      ) : (
        <>
          <img
            src="./../../../../../images/post/cross.svg"
            alt=""
            onClick={props.cancelChanges}
          />
          <input
            value={nameUser}
            onChange={(e) => setNameUser(e.target.value)}
          />
          <img
            src="./../../../../../images/post/check.svg"
            onClick={() => props.setEdit(false)}
            alt=""
          />
        </>
      )}
    </div>
  );
};

export default Name;
