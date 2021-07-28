import React, { useEffect } from "react";
import styles from './Product.module.css';
import { PopupProduct, Menu, PopupCategory } from "..";
import { ProductTree } from "./ProductTree/ProductTree";
import { useSelector, useDispatch } from "react-redux";
import "cropperjs/dist/cropper.css";
import {
  treeAsync,
  selectProducts,
} from "../Tree/Tree.slice";

export const Product = () => {
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(treeAsync());
  }, [dispatch]);

  return (
    <>
      <section className={styles.app}>
        <Menu />
        <ProductTree
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
