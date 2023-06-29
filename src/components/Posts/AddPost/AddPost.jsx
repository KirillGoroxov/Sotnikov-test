import React from "react";
import styles from "./AddPost.module.scss";
import Post from "./Post/Post";

const AddPost = (props) => {
  const adding = props.adding;
  const setAdding = props.setAdding;
  return (
    <div className={styles.addContainer}>
      {!adding ? (
        <div className={styles.add} onClick={() => setAdding(true)}>
          <img src="./../../../../images/plus.svg" alt="" />
        </div>
      ) : (
        <Post
          setAdding={setAdding}
          addNewPost={props.addNewPost}
          newName={props.newName}
          setNewName={props.setNewName}
          newTitle={props.newTitle}
          setNewTitle={props.setNewTitle}
          newBody={props.newBody}
          setNewBody={props.setNewBody}
        />
      )}
    </div>
  );
};

export default AddPost;
