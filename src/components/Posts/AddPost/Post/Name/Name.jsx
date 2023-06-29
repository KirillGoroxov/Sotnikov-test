import { useEffect, useState } from "react";
import styles from "./Name.module.scss";
import axios from "axios";
import { nanoid } from "nanoid";
const Name = (props) => {
  const setNewName = props.setNewName;
  const [names, setNames] = useState([]);
  useEffect(() => {
    const API_URL = "https://jsonplaceholder.typicode.com/users";
    axios.get(API_URL).then((response) => {
      const users = response.data;
      const names = users.map((user) => {
        return user.name;
      });
      setNames(names);
    });
  }, []);
  const selectName = (e) => {
    setNewName(e.target.value);
  };
  return (
    <div className={styles.name}>
      {names && (
        <select className={styles.select} onClick={selectName}>
          <option hidden>{props.newName}</option>
          {names.map((name) => (
            <option key={nanoid()} value={name}>
              {name}
            </option>
          ))}
        </select>
      )}
      <img
        src="./../../../../../../images/post/cross.svg"
        alt=""
        onClick={() => props.setAdding(false)}
      />
    </div>
  );
};

export default Name;
