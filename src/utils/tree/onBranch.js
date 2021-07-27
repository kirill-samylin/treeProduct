import { isEqual } from ".";

function set(item, arr) {
  if (item.category_id) {
    arr.push({
      category_id: item.product_id,
      disabled: 0,
    });
    item.disabled = 0;
  } else {
    arr.push({
      product_id: item.product_id,
      active: 1,
    });
    item.active = 1;
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

export function onBranch(item, list, arr = []) {
  return list.map((branch) => {
    if (isEqual(item, branch)) {
      set(branch, arr);
      setStatus(branch.products, arr);
      setStatus(branch.children, arr);
    } else if (branch.category_id) {
      branch.products = onBranch(item, branch.products, arr);
      branch.children = onBranch(item, branch.children, arr);
    }
    return branch;
  });
}
