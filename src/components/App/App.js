import React, { useEffect } from "react";
import styles from './App.module.css';
import { Tree, PopupProduct, Menu, PopupCategory } from "..";
import { useSelector, useDispatch } from "react-redux";
import "cropperjs/dist/cropper.css";
import {
  treeAsync,
  selectTree
} from "./App.slice";

export const App = () => {
  const { products } = useSelector(selectTree);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(treeAsync(1));
  }, [dispatch]);

  return (
    <>
      <section className={styles.app}>
        <Menu />
        <Tree
          id="root"
          categories={products}
          expanded={true}
        />  
      </section>
      <PopupProduct />
      <PopupCategory />
    </>
  );
};
