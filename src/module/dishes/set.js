import { isEqual, isDishes } from '.';
export function set2(item, tree, key, value) {
    return tree.map((branch) => {
        if (isEqual(branch, item)) {
            console.log(key, value)
            branch[key] = value;
        } else if (isDishes(branch)) {
            branch.products = set(item, branch.products, key, value);
        }
        console.log(branch.name)
        return branch;
    });
}
export function set(item, tree, key, value) {
    for (let branch of tree) {
        if (isEqual(branch, item)) {
            console.log(key, value)
            branch[key] = value;
            break
        } else if (isDishes(branch)) {
            branch.products = set(item, branch.products, key, value);
        }
        console.log(branch.name)
    }
    return tree;
}