import React from "react";
import styles from "./Post.module.scss";
import Name from "./Name/Name";
import Title from "./Title/Title";
import Body from "./Body/Body";
const Post = (props) => {
  return (
    <div className={styles.post}>
      <Name
        setAdding={props.setAdding}
        newName={props.newName}
        setNewName={props.setNewName}
      />
      <Title newTitle={props.newTitle} setNewTitle={props.setNewTitle} />
      <Body
        newBody={props.newBody}
        setNewBody={props.setNewBody}
        addNewPost={props.addNewPost}
      />
    </div>
  );
};

export default Post;
