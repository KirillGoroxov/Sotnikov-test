import React, { useEffect, useState } from "react";
import styles from "./Filters.module.scss";
import axios from "axios";
import { nanoid } from "nanoid";
const Filters = (props) => {
  const activeFilter = props.activeFilter;
  const filterFunction = props.filterFunction;
  return (
    <div className={styles.filter}>
      <div className={styles.title}>Отсортировать по</div>
      <div className={styles.buttons}>
        <span
          id="title"
          onClick={filterFunction}
          className={activeFilter === "title" ? styles.active : null}
        >
          По названию
        </span>
        <span
          id="completed"
          onClick={filterFunction}
          className={activeFilter === "completed" ? styles.active : null}
        >
          Сначала невыполненные
        </span>
      </div>
    </div>
  );
};

export default Filters;
