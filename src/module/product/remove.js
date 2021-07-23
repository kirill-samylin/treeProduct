import { isEqual, isDishes } from '.';
export function remove(product, list) {
    for (let item of list) {
        if (isEqual(product, item)) {
            return list.filter((i) => !isEqual(product, i));
        } else if (isDishes(item)) {
            item.products = remove(product, item.products);
        }
    }
    return list;
}