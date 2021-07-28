import React, { useCallback } from "react";
import { Popup } from "..";
import styles from "./PopupСonfirm.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { selectData, handleClose } from "./PopupСonfirm.slice";
export const PopupСonfirm = () => {
  const { isOpen, title, cb } = useSelector(selectData);
  const dispatch = useDispatch();

  const onClose = useCallback(() => dispatch(handleClose()), [dispatch]);

  const handleConfirm = useCallback(() => {
    if (typeof cb === 'function') {
      cb()
        .then(() => onClose())
        .catch((err) => console.log(err))
    }
  }, [cb, onClose]);

  return (
    <Popup
      opened={isOpen}
      title={title}
      onClose={onClose}
    >
        <div className={styles.buttons}>
            <Button variant="primary" onClick={handleConfirm}>
              Да
            </Button>
            <Button variant="secondary" onClick={onClose}>
              Отмена
            </Button>
        </div>
    </Popup>
  );
};
