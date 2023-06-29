import React, { useEffect, useState } from "react";
import styles from "./Filters.module.scss";
import axios from "axios";
import { nanoid } from "nanoid";
const Filters = (props) => {
  const activeFilter = props.activeFilter;
  const filterByNameFunction = props.filterByNameFunction;
  const filterByTitle = props.filterByTitle;
  const filterByFavourites = props.filterByFavourites;
  const reversePosts = props.reversePosts;
  const [users, setUsers] = useState();
  const [names, setNames] = useState();
  const [name, setName] = useState("Имени");
  useEffect(() => {
    const API_URL = "https://jsonplaceholder.typicode.com/users";
    axios.get(API_URL).then((response) => {
      const users = response.data;
      const names = users.map((user) => {
        return user.name;
      });
      setNames(names);
      setUsers(users);
    });
  }, []);
  const filterUsers = () => {
    const select = document.getElementById("name");
    const user = users.filter((user) => user.name === select.value)[0];
    setName(user.name);
    filterByNameFunction(user.id);
  };
  return (
    <div className={styles.filter}>
      <div className={styles.title}>Отсортировать по</div>
      <div className={styles.buttons}>
        <span
          id="title"
          onClick={filterByTitle}
          className={activeFilter === "title" ? styles.active : null}
        >
          По названию
        </span>
        <span
          onClick={filterByFavourites}
          id="favourites"
          className={activeFilter === "favourites" ? styles.active : null}
        >
          Сначала избранное
        </span>
        {names && (
          <select className={styles.select} onChange={filterUsers} id="name">
            <option hidden>{name}</option>
            {names.map((name) => (
              <option key={nanoid()} value={name}>
                {name}
              </option>
            ))}
          </select>
        )}
        <img
          src="./../../../../images/reverse.svg"
          className={styles.reverse}
          alt=""
          onClick={reversePosts}
        />
      </div>
    </div>
  );
};

export default Filters;
