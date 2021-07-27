import React, { useCallback } from "react";
import styles from "./Menu.module.css";
import cn from "classnames";
import { useDispatch } from 'react-redux';
import { Button } from "react-bootstrap";
import RefreshIcon from './icons/refresh.svg';
import {
  handleOpen,
} from "../PopupCategory/PopupCategory.slice";
import {
  treeAsync,
} from "../App/App.slice";

export const Menu = ({ className }) => {
  const dispatch = useDispatch();
  const handleOpened = useCallback(() => dispatch(handleOpen({ parent_id: "root"})), [dispatch]);
  const update = useCallback(() => dispatch(treeAsync(1)), [dispatch]);
  return (
    <div className={cn(styles.menu, className)}>
      <h2 className={styles.title}>Меню ресторана:</h2>
      <Button onClick={handleOpened} variant="primary" size="sm">
        Добавить категорию
      </Button>
      <Button onClick={update} variant="primary" size="sm" className="ml-2">
        <img src={RefreshIcon} alt="refresh" className={styles.refresh}/>
      </Button>
    </div>
  );
};
