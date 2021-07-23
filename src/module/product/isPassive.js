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
