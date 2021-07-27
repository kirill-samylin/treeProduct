import { isDishes } from ".";
export function isPassive(tree) {
  return tree.map((branch) => {
    if (isDishes(branch)) {
      branch.isPassive = branch.products.some((item) => item.active);
      branch.products = isPassive(branch.products);
    }
    return branch;
  });
}

function isAllActive(products) {
  return products.some((product) => product.active);
}

function isAllCategory(children) {
  for (let category of children) {
    const allActiveProducts = isAllActive(category.products);
    const allActiveCategory = isAllCategory(category.children);
    category.isPassive = allActiveProducts && allActiveCategory;
  }
  return true;
}

function setPassive(list, parent_id) {
  const item = list.find((item) => item.category_id === parent_id);
  if (!item) return;
  item.isPassive = true;
  if (item.parent_id) {
    setPassive(list, item.parent_id);
  }
}

export function getPassive(list) {
  const passiveItems = list.filter((item) => item.active === 0);
  const uniqueItems = passiveItems.reduce((arr, item) => {
    if (!arr.find((i) => i.parent_id === item.parent_id)) {
      arr.push(item);
    }
    return arr;
  }, []);
  for (let item of uniqueItems) {
    setPassive(list, item.parent_id);
  }
  return list;
}
