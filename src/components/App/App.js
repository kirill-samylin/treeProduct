import React, { useEffect } from "react";
import styles from './App.module.css';
import { Tree, PopupProduct, Menu, PopupCategory, PopupСonfirm } from "..";
import { useSelector, useDispatch } from "react-redux";
import "cropperjs/dist/cropper.css";
import {
  getAsync,
  selectTree
} from "../Tree/Tree.slice";
import { getParams } from "../../utils";

export const App = () => {
  const { products } = useSelector(selectTree);
  const dispatch = useDispatch();

  useEffect(() => {
    const params = getParams(window.location.href);
    if (params.id) {
      dispatch(getAsync(params.id));
    } else {
      dispatch(getAsync("test"));
    }
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
      <PopupСonfirm />
    </>
  );
};
