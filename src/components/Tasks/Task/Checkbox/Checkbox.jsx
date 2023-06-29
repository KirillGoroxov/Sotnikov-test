import React from "react";
import styles from "./Checkbox.module.scss";

const Checkbox = (props) => {
  return (
    <label className={styles.label}>
      <div className={styles.fakeCheck}>
        {props.checked && <img src="./../../../../images/post/check.svg" />}
      </div>
      <input
        onClick={props.notice}
        id={props.id}
        type="checkbox"
        name="check"
        className={styles.checkbox}
      />
    </label>
  );
};

export default Checkbox;
