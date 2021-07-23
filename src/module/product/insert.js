import { isEqual } from '.';
export function insert(product, list) {
    for (let item of list) {
        console.log(product.parent_item)
        if (isEqual(product.parent_item, item)) {
            //delete product.parent_item;
            item.products.unshift(product);
            break;
        } else if (Array.isArray(item.products)) {
            insert(product, item.products);
        }
    }
    return list;
}