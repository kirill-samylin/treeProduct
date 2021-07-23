import React, { createRef, useEffect, memo } from "react";
import { ReactSortable, Sortable, MultiDrag, Swap } from "react-sortablejs";
import styles from "./ProductTree.module.css";
import { ProductBranch } from "../ProductBranch/ProductBranch";
import cn from "classnames";

export const ProductTree = memo(({ id, tree, className, expanded }) => {
  function getKey({ category_id, product_id, parent_id }) {
    if (!parent_id) {
      return category_id;
    }
    if (!product_id) {
      return category_id;
    }
    return product_id;
  }

  return (
    <ReactSortable tag="ul" >
      {tree && tree.map((branch) => (
        <ProductBranch key={getKey(branch)} product={branch} />
      ))}
    </ReactSortable>
  );
});
