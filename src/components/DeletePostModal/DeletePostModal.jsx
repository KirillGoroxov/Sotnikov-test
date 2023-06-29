import React from "react";
import styles from "./DeletePostModal.module.scss";
const DeletePostModal = (props) => {
  const setModalWindow = props.setModalWindow;
  const deletePosts = (e) => {
    props.action(e);
    setModalWindow(false);
    props.setChecking(false);
  };
  return (
    <>
      {props.modalWindow && (
        <div className={styles.modalWindow}>
          <div className={styles.warning}>
            <div>
              Вы дейсвительно хотите {props.text} {props.text_2}
            </div>
            <button onClick={deletePosts} id="yes">
              Да
            </button>
            <button onClick={() => setModalWindow(false)} id="no">
              Отмена
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DeletePostModal;
