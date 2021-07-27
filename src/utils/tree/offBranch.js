import { tree } from "..";

function set(item, arr) {
  if (item.category_id) {
    arr.push({
      category_id: item.product_id,
      disabled: 1,
    });
    item.disabled = 1;
  } else {
    arr.push({
      product_id: item.product_id,
      active: 0,
    });
    item.active = 0;
  }
}

function setStatus(list = [], arr) {
  for (let branch of list) {
    set(branch, arr);
    if (branch.category_id) {
      setStatus(branch.products, arr);
      setStatus(branch.children, arr);
    }
  }
}

export function offBranch(item, list, arr = []) {
  return list.map((branch) => {
    if (tree.isEqual(item, branch)) {
      set(branch, arr);
      setStatus(branch.products, arr);
      setStatus(branch.children, arr);
    } else if (branch.category_id) {
      branch.products = offBranch(item, branch.products, arr);
      branch.children = offBranch(item, branch.children, arr);
    }
    return branch;
  });
}
