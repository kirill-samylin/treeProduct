import React, { useEffect } from "react";
import styles from './App.module.css';
import { Tree, PopupProduct, Menu, PopupCategory } from "..";
import { useSelector, useDispatch } from "react-redux";
import "cropperjs/dist/cropper.css";
import {
  treeAsync,
  selectProducts,
} from "./App.slice";

export const App = () => {
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(treeAsync());
  }, [dispatch]);

  return (
    <>
      <section className={styles.app}>
        <Menu />
        <Tree
          id="root"
          tree={products}
          expanded={true}
        />  
      </section>
      <PopupProduct />
      <PopupCategory />
    </>
  );
};
