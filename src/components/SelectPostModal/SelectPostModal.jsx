import React, { useState } from "react";
import styles from "./SelectPostModal.module.scss";
import DeletePostModal from "./../DeletePostModal/DeletePostModal";

const SelectPostModal = (props) => {
  // Модальное окно для удаления
  const [modalWindow, setModalWindow] = useState();
  // Модальное окно для добавления в избранное
  const [addPostToFavourites, setAddPostToFavourites] = useState(false);
  // Функция для добавления в избранное
  const addToFavourites = () => {
    const inputsArray = [...props.inputs];
    const inputsFilter = inputsArray.filter((input) => input.checked === true);
    let inputsIndex = [];
    inputsFilter.map((input) => inputsIndex.push(Number(input.id)));
    inputsIndex.map((index) =>
      localStorage.setItem(`favourites-${props.photo || ""}${index}`, true)
    );
    setAddPostToFavourites(false);
  };
  return (
    <>
      {props.checking && (
        <div className={styles.add}>
          <button onClick={() => setModalWindow(!modalWindow)}>Удалить</button>
          {!props.task && (
            <button onClick={() => setAddPostToFavourites(true)}>
              В избранное
            </button>
          )}
        </div>
      )}
      <DeletePostModal
        text={props.text}
        text_2={props.text_2}
        modalWindow={modalWindow}
        setChecking={props.setChecking}
        setModalWindow={setModalWindow}
        action={props.deleteCheckedPosts}
      />
      <DeletePostModal
        text={props.text_3}
        text_2={props.text_2}
        modalWindow={addPostToFavourites}
        setAddPostToFavourites={setAddPostToFavourites}
        setChecking={props.setChecking}
        setModalWindow={setModalWindow}
        action={addToFavourites}
      />
    </>
  );
};

export default SelectPostModal;
