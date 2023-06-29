import React from "react";
import styles from "./Navbar.module.scss";
import NavElem from "./NavElem/NavElem";

const Navbar = () => {
  return (
    <div className={styles.navWrapper}>
      <NavElem title="Посты" to="/posts" />
      <NavElem title="Фото" to="/albums" />
      <NavElem title="Задачи" to="/tasks" />
    </div>
  );
};

export default Navbar;
