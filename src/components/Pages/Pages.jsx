import React from "react";
import styles from "./Pages.module.scss";
import Page from "./Page/Page";

const Pages = (props) => {
  return (
    <div className={styles.pages}>
      <Page
        value="10"
        pages={props.pages}
        setPages={props.setPages}
        item={props.item}
      />
      <Page
        value="20"
        pages={props.pages}
        setPages={props.setPages}
        item={props.item}
      />
      <Page
        value="50"
        pages={props.pages}
        setPages={props.setPages}
        item={props.item}
      />
      <Page
        value="100"
        pages={props.pages}
        setPages={props.setPages}
        item={props.item}
      />
      <Page
        value="Все"
        pages={props.pages}
        setPages={props.setPages}
        item={props.item}
      />
    </div>
  );
};

export default Pages;
