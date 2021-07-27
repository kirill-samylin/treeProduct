import { isEqual } from '.';
export function set(item, tree, key, value) {
    for (let branch of tree) {
        if (isEqual(branch, item)) {
            branch[key] = value;
            break;
        } else if (branch.category_id) {
            branch.children = set(item, branch.children, key, value);
            branch.products = set(item, branch.products, key, value);
        }
    }
    return tree;
}