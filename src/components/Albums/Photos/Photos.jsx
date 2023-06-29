import axios from "axios";
import React, { useEffect, useState } from "react";
import Photo from "./Photo/Photo";
import styles from "./Photos.module.scss";

const Photos = (props) => {
  const [photos, setPhotos] = useState();
  useEffect(() => {
    const API_URL = "https://jsonplaceholder.typicode.com";
    axios.get(API_URL + "/photos").then((response) => {
      const photos = response.data;
      const filter = photos.filter((photo) => photo.albumId == props.albumId);
      setPhotos(filter);
    });
  }, []);
  return (
    <div className={styles.photos}>
      {photos &&
        photos.map((photo) => (
          <Photo url={photo.url} title={photo.title} key={photo.id} />
        ))}
    </div>
  );
};

export default Photos;
