export function insert(product, list) {
  if (product.parent_id === "root" && product.category_id) {
    return [product, ...list];
  }
  for (let item of list) {
    if (product.parent_id === item.category_id) {
      if (product.category_id) {
        item.children.unshift(product);
      } else {
        item.products.unshift(product);
      }
      break;
    } else if (item.category_id) {
      insert(product, item.children);
    }
  }
  return list;
}
