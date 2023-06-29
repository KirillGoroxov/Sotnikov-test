import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./NavElem.module.scss";
const NavElem = (props) => {
  const location = useLocation();
  return (
    <div
      className={styles.link}
      style={{
        backgroundColor: location.pathname === props.to && "rgb(45, 67, 116)",
      }}
    >
      <Link
        to={props.to}
        style={{
          color: location.pathname === props.to && "#fff",
        }}
      >
        {props.title}
      </Link>
    </div>
  );
};

export default NavElem;
