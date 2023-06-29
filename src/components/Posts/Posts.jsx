import React, { useEffect, useState } from "react";
import Post from "./Post/Post";
import axios from "axios";
import styles from "./Posts.module.scss";
import Pages from "../Pages/Pages";
import DeletePostModal from "./../DeletePostModal/DeletePostModal";
import SelectPostModal from "./../SelectPostModal/SelectPostModal";
import Filters from "./Filters/Filters";
import AddPost from "./addPost/AddPost";

const Posts = () => {
  // Посты, которые получим из API
  const [posts, setPosts] = useState();
  // Все посты из API
  const [allPosts, setAllPosts] = useState();
  // сколько страниц выводить
  const [pages, setPages] = useState(localStorage.getItem("pages-posts"));
  // модальное окно
  const [modalWindow, setModalWindow] = useState(false);
  // удаление постов
  const [filterPosts, setFilterPosts] = useState();
  // отметка чекбокса
  const [checking, setChecking] = useState(false);
  // Получаем в коллекцию чекбоксы
  const inputs = document.getElementsByName("check");
  // Фильтры
  const [activeFilter, setActiveFilter] = useState("");
  const [filterByName, setFilterByName] = useState(false);
  // развернут ли массив с постами
  const [isReversed, setIsReversed] = useState(false);
  // режим добавления поста
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("Выберите имя");
  const [newTitle, setNewTitle] = useState("Введите название поста");
  const [newBody, setNewBody] = useState("Введите текст поста");
  const API_URL = "https://jsonplaceholder.typicode.com";
  const requestPosts = () => {
    axios.get(API_URL + "/posts").then((response) => {
      setAllPosts(response.data);
    });
    if (!filterByName && !isReversed) {
      if (pages === "Все") {
        axios
          .get(API_URL + "/posts")
          .then((response) => {
            const data = response.data;
            setPosts(data);
          })
          .catch((error) => console.log(error));
      } else {
        axios
          .get(API_URL + "/posts" + `?_start=${0}&_limit=${pages}`)
          .then((response) => {
            const data = response.data;
            setPosts(data);
          })
          .catch((error) => console.log(error));
      }
    }
  };
  useEffect(() => {
    requestPosts();
  }, [pages]);
  // Открытие модального окна
  const openModalWindow = (e) => {
    const id = Number(e.target.id);
    setModalWindow(() => !modalWindow);
    const filter = posts.filter((post) => {
      return post.id != id;
    });
    setFilterPosts(filter);
    axios.delete(API_URL + `/posts/${id}`);
  };
  // Удаление поста
  const deletePost = () => {
    setPosts(filterPosts);
    setModalWindow(false);
  };
  //  Удаление нескольких постов
  const deleteCheckedPosts = () => {
    const inputsArray = [...inputs];
    const inputsFilter = inputsArray.filter((input) => input.checked === true);
    let inputsIndex = [];
    inputsFilter.map((input) => inputsIndex.push(Number(input.id)));
    const filterPosts = posts.filter((post) => !inputsIndex.includes(post.id));
    setPosts(filterPosts);
  };
  // Добавление нового поста
  const addNewPost = () => {
    if (
      newTitle !== "" &&
      newTitle !== "Введите название поста" &&
      newBody !== "" &&
      newBody !== "Введите текст поста"
    ) {
      const id = posts.length + 1;
      const newPost = {
        userId: 11,
        id: id,
        title: newTitle,
        body: newBody,
      };
      setPosts([newPost, ...posts]);
      setAdding(false);
      setNewTitle("Введите название поста");
      setNewBody("Введите текст поста");
      axios.post(API_URL + "posts", newPost);
    }
  };
  // Сортировка постов по названию
  const filterByTitle = (e) => {
    const id = e.target.id;
    // отмена фильтра
    if (!filterByName) {
      if (activeFilter === id) {
        setActiveFilter("");
        requestPosts();
      } else {
        setActiveFilter(id);
        const sortPosts = posts.sort((x, y) => {
          if (x.title < y.title) return -1;
          if (x.title > y.title) return 1;
        });
        setPosts(sortPosts);
      }
    }
  };
  // Сортировка постов по имени
  const filterByNameFunction = (userId) => {
    setFilterByName(() => !filterByName);
    const filterPosts = allPosts.filter((post) => post.userId === userId);
    setPosts(filterPosts);
  };
  // Сортировка постов по избранному
  const filterByFavourites = (e) => {
    if (!filterByName) {
      const id = e.target.id;
      // убрать фильтр
      if (activeFilter === id) {
        setActiveFilter("");
        requestPosts();
      }
      // добавить фильтр
      else {
        setActiveFilter(id);
        const sort = posts.map((post) => {
          if (localStorage.getItem(`favourites-${post.id}`)) return post.id;
          else return null;
        });
        const filterSort = sort.filter((post) => post !== null);
        const sortPosts = posts.sort((x, y) => {
          return filterSort.indexOf(y.id) - filterSort.indexOf(x.id);
        });
        setPosts(sortPosts);
      }
    }
  };
  const reversePosts = () => {
    setIsReversed(() => !isReversed);
    const reversedPosts = posts.reverse();
    setPosts(reversedPosts);
  };
  return (
    <>
      <Filters
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        filterByTitle={filterByTitle}
        filterByNameFunction={filterByNameFunction}
        filterByFavourites={filterByFavourites}
        reversePosts={reversePosts}
      />
      <Pages pages={pages} setPages={setPages} item="posts" />
      <AddPost
        adding={adding}
        setAdding={setAdding}
        newName={newName}
        setNewName={setNewName}
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        newBody={newBody}
        setNewBody={setNewBody}
        addNewPost={addNewPost}
      />
      <div className={styles.posts}>
        {posts &&
          posts.map((post) => (
            <Post
              openModalWindow={openModalWindow}
              id={post.id}
              key={post.id}
              posts={posts}
              title={post.title}
              body={post.body}
              userId={post.userId}
              checking={checking}
              setChecking={setChecking}
              newName={newName}
            />
          ))}
      </div>
      {/* Модальное окно для удаления поста */}
      <DeletePostModal
        setChecking={setChecking}
        modalWindow={modalWindow}
        setModalWindow={setModalWindow}
        action={deletePost}
        text="удалить"
        text_2="пост"
      />
      {/* Модальное окно для выбора постов */}
      <SelectPostModal
        inputs={inputs}
        checking={checking}
        setChecking={setChecking}
        deleteCheckedPosts={deleteCheckedPosts}
        text="удалить выбранные"
        text_2="посты?"
        text_3="добавить в избранное"
      />
    </>
  );
};

export default Posts;
