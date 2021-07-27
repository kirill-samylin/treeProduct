import { isEqual } from '.';
export function remove(product, list) {
    for (let item of list) {
        if (isEqual(product, item)) {
            return list.filter((i) => !isEqual(product, i));
        } else if (item.category_id) {
            item.products = remove(product, item.products);
            item.children = remove(product, item.children);
        }
    }
    return list;
}