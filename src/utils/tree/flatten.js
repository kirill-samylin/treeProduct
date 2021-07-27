export function flatten(tree, parent_id, arr = []) {
  for (let branch of tree) {
    const obj = {
      ...branch,
      isPassive: false,
    };
    if (obj.product_id) {
      obj.parent_id = parent_id;
    }
    if (obj.category_id) {
      flatten(obj.products, obj.category_id, arr);
      flatten(obj.children, obj.category_id, arr);
    }
    arr.push(obj);
  }
  return arr;
}