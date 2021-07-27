import { isEqual } from '.';
export function insert(product, list) {
    for (let item of list) {
        if (isEqual(product.parent_item, item)) {
            if (product.category_id) {
                item.children.unshift(product);
            } else {
                item.products.unshift(product);
            }
            break;
        } else if (item.category_id) {
            insert(product, item.products);
            insert(product, item.children);
        }
    }
    return list;
}