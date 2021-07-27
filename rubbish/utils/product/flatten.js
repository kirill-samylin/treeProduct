export function flatten(products, parent_id, arr=[]) {
    for (let product of products) {
        const obj = {
            ...product,
            isPassive: false,
        }
        if (product.product_id) {
            obj.parent_id = parent_id;
        }
        if (product.category_id) {
            flatten(product.products, product.category_id, arr)
            flatten(product.children, product.category_id, arr)
        }
        arr.push(obj);
    }
    return arr;
}