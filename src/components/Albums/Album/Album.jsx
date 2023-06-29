import React, { useEffect, useState } from "react";
import styles from "./Album.module.scss";
import axios from "axios";
import Icons from "./Icons/Icons";
import Title from "./Title/Title";
import Name from "./Name/Name";
import { Link } from "react-router-dom";
const Album = (props) => {
  const [nameUser, setNameUser] = useState();
  // Второе значение имени для отмены изменений
  const [nameUserMain, setNameUserMain] = useState();
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(props.title);
  useEffect(() => {
    const API_URL = "https://jsonplaceholder.typicode.com/users/";
    axios.get(API_URL + props.userId).then((response) => {
      const name = response.data.name;
      setNameUser(name);
      setNameUserMain(name);
    });
  }, []);
  const cancelChanges = () => {
    setTitle(props.title);
    setEdit(false);
    setNameUser(nameUserMain);
  };
  return (
    <div className={styles.album}>
      <Name
        nameUser={nameUser}
        edit={edit}
        setEdit={setEdit}
        setNameUser={setNameUser}
        cancelChanges={cancelChanges}
        setChecking={props.setChecking}
        id={props.id}
      />
      <Title
        edit={edit}
        setEdit={setEdit}
        title={title}
        setTitle={setTitle}
        openPhotos={props.openPhotos}
        id={props.id}
      />
      <Icons
        id={props.id}
        setEdit={setEdit}
        edit={edit}
        openModalWindow={props.openModalWindow}
      />
    </div>
  );
};

export default Album;
