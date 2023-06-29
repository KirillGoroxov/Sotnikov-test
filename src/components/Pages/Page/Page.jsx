import React from "react";
import styles from "./Page.module.scss";

const Page = (props) => {
  const changeQuantityPages = (e) => {
    props.setPages(e.target.id);
    localStorage.setItem(`pages-${props.item}`, e.target.id);
  };
  return (
    <span
      id={props.value}
      onClick={changeQuantityPages}
      className={styles.page}
      style={{
        backgroundColor: props.pages == props.value && "#a7a6ff",
      }}
    >
      {props.value}
    </span>
  );
};

export default Page;
