import React, { useState } from "react";
import styles from "./Icons.module.scss";

const Icons = (props) => {
  const [favourites, setFavourites] = useState(
    localStorage.getItem(`favourites-${props.id}`)
  );
  const addPostToFavourites = (e) => {
    const id = Number(e.target.id);
    const item = localStorage.getItem(`favourites-${id}`);
    setFavourites(!favourites);
    // Если уже есть запись в хранилище браузера
    if (String(item) === String(true)) {
      localStorage.removeItem(`favourites-${id}`);
    }
    // Если записи нет то сохараняем
    else {
      localStorage.setItem(`favourites-${id}`, true);
    }
  };
  return (
    <div className={styles.icons}>
      <img
        src={
          props.showComment
            ? "./../../../../images/post/comment-active.svg"
            : "./../../../../images/post/comment.svg"
        }
        alt=""
        className={styles.all}
        onClick={props.showCommentsFunction}
      />
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
        onClick={props.editPost}
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
