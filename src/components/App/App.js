import React, { useState, useEffect, useCallback } from "react";
import { Tree, ProductСreate } from "../";
import { useSelector, useDispatch } from "react-redux";
import {
  changeStatus,
  changeExpand,
  treeAsync,
  selectProducts,
} from "./AppSlice";

export const App = () => {
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  const [productСreatePopup, setProductСreatePopup] = useState(false);

  const handleCreate = useCallback((category) => {
    console.log(category);
    setProductСreatePopup(true);
  }, []);

  const handleClose = useCallback(() => {
    setProductСreatePopup(false);
  }, []);

  useEffect(() => {
    dispatch(treeAsync());
  }, [dispatch]);

  return (
    <>
      <Tree
        tree={products}
        expanded={true}
      />
      <ProductСreate opened={productСreatePopup} handleClose={handleClose} />
    </>
  );
};
