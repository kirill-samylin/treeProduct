import { isEqual } from '.';
export function remove(product, list) {
    for (let item of list) {
        if (isEqual(product, item)) {
            return list.filter((i) => !isEqual(product, i));
        } else if (Array.isArray(item.products)) {
            item.products = remove(product, item.products);
        }
    }
    return list;
}