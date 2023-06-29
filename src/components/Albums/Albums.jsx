import React, { useEffect, useState } from "react";
import Pages from "../Pages/Pages";
import axios from "axios";
import styles from "./Albums.module.scss";
import Album from "./Album/Album";
import DeletePostModal from "./../DeletePostModal/DeletePostModal";
import SelectPostModal from "./../SelectPostModal/SelectPostModal";
import Photos from "./Photos/Photos";

const Albums = () => {
  // Фотографии, которые получим из API
  const [albums, setAlbums] = useState();
  // сколько страниц выводить
  const [pages, setPages] = useState(localStorage.getItem("pages-photos"));
  // Получаем в коллекцию чекбоксы
  const inputs = document.getElementsByName("check-album");
  const [modalWindow, setModalWindow] = useState(false);
  const [filterAlbums, setFilterAlbums] = useState();
  const [checking, setChecking] = useState();
  // открытие фото по клику на альбом
  const [photos, setPhotos] = useState(false);
  // id альбома для его открытия
  const [albumId, setAlbumId] = useState();
  const API_URL = "https://jsonplaceholder.typicode.com";
  useEffect(() => {
    if (pages === "Все") {
      axios.get(API_URL + "/albums").then((response) => {
        setAlbums(response.data);
      });
    } else {
      axios
        .get(API_URL + "/albums" + `?_start=${0}&_limit=${pages}`)
        .then((response) => {
          setAlbums(response.data);
        })
        .catch((error) => console.log(error.request));
    }
  }, [pages]);
  const deleteAlbum = () => {
    setAlbums(filterAlbums);
  };
  const openModalWindow = (e) => {
    const id = Number(e.target.id);
    setModalWindow(() => !modalWindow);
    const filter = albums.filter((album) => {
      return album.id != id;
    });
    setFilterAlbums(filter);
    axios.delete(API_URL + `/albums/${id}`);
  };
  //  Удаление нескольких постов
  const deleteCheckedPosts = () => {
    const inputsArray = [...inputs];
    const inputsFilter = inputsArray.filter((input) => input.checked === true);
    let inputsIndex = [];
    inputsFilter.map((input) => inputsIndex.push(Number(input.id)));
    const filterAlbums = albums.filter(
      (album) => !inputsIndex.includes(album.id)
    );
    setAlbums(filterAlbums);
  };
  const openPhotos = (e) => {
    setPhotos(true);
    setAlbumId(e.target.id);
  };
  return (
    <>
      <Pages item="photos" pages={pages} setPages={setPages} />
      <div className={styles.photos}>
        {albums &&
          !photos &&
          albums.map((album) => (
            <Album
              id={album.id}
              key={album.id}
              url={album.url}
              title={album.title}
              userId={album.userId}
              modalWindow={modalWindow}
              openModalWindow={openModalWindow}
              setChecking={setChecking}
              openPhotos={openPhotos}
            />
          ))}
      </div>
      <DeletePostModal
        text="удалить"
        text_2="альбом?"
        modalWindow={modalWindow}
        action={deleteAlbum}
        setModalWindow={setModalWindow}
        setChecking={setChecking}
      />
      <SelectPostModal
        inputs={inputs}
        checking={checking}
        setChecking={setChecking}
        deleteCheckedPosts={deleteCheckedPosts}
        photo="photo-"
        text="удалить"
        text_2="выбранные альбомы?"
        text_3="добавить в избранное"
      />
      {photos && <Photos albumId={albumId} />}
    </>
  );
};

export default Albums;
