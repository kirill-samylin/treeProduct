import React, { useEffect } from "react";
import styles from './App.module.css';
import "cropperjs/dist/cropper.css";
import { ParamsProvider } from '../../contexts/ParamsContext';
import { Tree, PopupProduct, Menu, PopupCategory, PopupСonfirm } from "..";
import { useSelector, useDispatch } from "react-redux";
import {
  getAsync,
  selectTree
} from "../Tree/Tree.slice";
import { getParams } from "../../utils";

export const App = (data) => {
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
    <ParamsProvider value={data}>
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
    </ParamsProvider>
  );
};
