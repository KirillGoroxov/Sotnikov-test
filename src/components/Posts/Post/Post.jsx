import React, { useEffect, useState } from "react";
import styles from "./Post.module.scss";
import axios from "axios";
import Comments from "./Comments/Comments";
import Icons from "./Icons/Icons";
import Name from "./Name/Name";
import Title from "./Title/Title";
import Body from "./Body/Body";
const Post = (props) => {
  // имя пользователя
  const [nameUser, setNameUser] = useState(props.newName);
  // имя пользователя - значение инпута
  const [nameUserValue, setNameUserValue] = useState(props.newName);
  // Переменная для получения информации о редактировании
  const [globalEdit, setGlobalEdit] = useState(false);
  // показать/скрыть комментарии
  const [showComment, setShowComment] = useState(false);
  // Текст названия поста
  const [title, setTitle] = useState(props.title);
  // Тело поста
  const [body, setBody] = useState(props.body);
  // Режим редактирования
  const [edit, setEdit] = useState(false);
  // Открытие комментариев
  const [comments, setComments] = useState(null);
  useEffect(() => {
    const API_URL = "https://jsonplaceholder.typicode.com";
    if (props.userId < 11) {
      axios.get(API_URL + `/users/${props.userId}`).then((response) => {
        if (!globalEdit) {
          const name = response.data.name;
          setNameUser(name);
          setNameUserValue(name);
        }
      });
    }
  });
  const showCommentsFunction = () => {
    setShowComment(() => !showComment);
    axios
      .get(API_URL + `/comments`)
      .then((response) =>
        setComments(response.data.filter((c) => c.postId === props.id))
      );
  };
  // Нажатие на кнопку редактировать
  const editPost = () => {
    setNameUser(nameUser);
    setGlobalEdit(true);
    setEdit(() => !edit);
  };
  // В режиме редактирования функция для отмены
  const returnValues = () => {
    setNameUserValue(nameUser);
    setTitle(props.title);
    setBody(props.body);
    setEdit(() => !edit);
  };
  return (
    <div className={styles.post}>
      <Name
        id={props.id}
        edit={edit}
        setEdit={setEdit}
        nameUserValue={nameUserValue}
        setNameUserValue={setNameUserValue}
        returnValues={returnValues}
        checking={props.checking}
        setChecking={props.setChecking}
      />
      <Title setTitle={setTitle} edit={edit} title={title} />
      <Body body={body} setBody={setBody} edit={edit} />
      <Icons
        posts={props.posts}
        id={props.id}
        editPost={editPost}
        showComment={showComment}
        showCommentsFunction={showCommentsFunction}
        openModalWindow={props.openModalWindow}
      />
      <Comments comments={comments} showComment={showComment} />
    </div>
  );
};

export default Post;
