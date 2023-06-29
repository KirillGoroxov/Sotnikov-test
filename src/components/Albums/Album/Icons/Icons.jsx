import React, { useState } from "react";
import styles from "./Icons.module.scss";

const Icons = (props) => {
  const [favourites, setFavourites] = useState(
    localStorage.getItem(`favourites-photo-${props.id}`)
  );
  const addPostToFavourites = (e) => {
    const item = localStorage.getItem(`favourites-photo-${e.target.id}`);
    setFavourites(!favourites);
    // Если уже есть запись в хранилище браузера
    if (String(item) === String(true)) {
      localStorage.removeItem(`favourites-photo-${e.target.id}`);
    }
    // Если записи нет то сохараняем
    else localStorage.setItem(`favourites-photo-${e.target.id}`, true);
  };
  return (
    <div className={styles.icons}>
      <img
        src={
          favourites
            ? "./../../../../images/post/star-active.svg"
            : "./../../../../images/post/star.svg"
        }
        alt=""
        className={styles.all}
        onClick={addPostToFavourites}
        id={props.id}
      />
      <img
        src="./../../../../images/post/edit.svg"
        alt=""
        className={styles.all}
        onClick={() => props.setEdit(!props.edit)}
      />
      <img
        src="./../../../../images/post/delete.svg"
        alt=""
        onClick={props.openModalWindow}
        id={props.id}
      />
    </div>
  );
};

export default Icons;
