import React, { useState } from "react";
import styles from "./Name.module.scss";
const Name = (props) => {
  const edit = props.edit;
  const setEdit = props.setEdit;
  const nameUserValue = props.nameUserValue;
  const returnValues = props.returnValues;

  // Локальная переменная
  const [checked, setChecked] = useState(false);
  // функция для отметки поста
  const notice = () => {
    const setChecking = props.setChecking;
    // Коллекция чекбоксов
    const inputs = document.getElementsByName("check");
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
      {!edit && nameUserValue}
      {!edit && (
        <>
          <label className={styles.label}>
            <div className={styles.fakeCheck}>
              {checked && (
                <img src="./../../../../../../images/post/check.svg" />
              )}
            </div>
            <input
              id={props.id}
              type="checkbox"
              name="check"
              onClick={notice}
              className={styles.checkbox}
            />
          </label>
        </>
      )}
      {/* Режим редактирования */}
      {edit && (
        <>
          <img
            src="./../../../../../images/post/cross.svg"
            alt=""
            onClick={returnValues}
          />
          <input
            autoFocus
            type="text"
            value={nameUserValue}
            onChange={(e) => props.setNameUserValue(e.target.value)}
          />
          <img
            src="./../../../../../images/post/check.svg"
            alt=""
            onClick={() => setEdit(false)}
          />
        </>
      )}
    </div>
  );
};

export default Name;
