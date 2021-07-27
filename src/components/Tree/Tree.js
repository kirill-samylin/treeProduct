import React, { createRef, useEffect, memo } from "react";
import styles from "./Tree.module.css";
import { Category, Product } from "../";
import cn from "classnames";

export const Tree = memo(({ id, categories, products, className, expanded }) => {
  const treeElement = createRef(null);

  const onEnd = (evt) => {
    const oldIndex = evt.oldIndex;
    const index = evt.newIndex;
    const item = evt.item;
    const parent = evt.to;
    const oldParent = evt.from;
    const id = item.dataset.id;
    const name = item.dataset.name;
    const categoryId = parent.dataset.id;
    const oldCategoryId = oldParent.dataset.id;

    if (oldIndex === index && parent === oldParent) return;

    console.log({
      "id предмета": id,
      "id категории куда суем": categoryId,
      "id категории откуда удаляем": oldCategoryId,
      "index - место куда вставляем": index,
      "oldIndex - место откуда вырезаем": oldIndex,
      "тип": name,
    });
  };

  const onMove = (evt) => {
    const parent = evt.to;
    const item = evt.dragged;
    const category_id = parent.dataset.id;
    const name = item.dataset.name;
    if (category_id === "root" && name === "product") return false;
    return true;
  };

  useEffect(() => {
    window.$(treeElement.current).sortable({
      fallbackOnBody: false,
      // selectedClass: styles.selected,
      // multiDrag: true,
      group: {
        name: "list",
      },
      animation: 200,
      ghostClass: "ghost",
      handle: ".position",
      onEnd,
      onMove,
    });
  }, [treeElement]);

  return (
    <ul
      ref={treeElement}
      data-id={id}
      className={cn(styles.tree, className, "list-group", {
        [styles.open]: expanded,
      })}
    >
      {Array.isArray(products) &&
        products.map((product) => <Product key={product.product_id} product={product} />
      )}
      {Array.isArray(categories) &&
        categories.map((category) => <Category key={category.category_id} product={category} />
      )}
    </ul>
  );
});
