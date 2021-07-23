export function flatten(products, arr=[]) {
    for (let product of products) {
        arr.push(product);
        if (Array.isArray(product.products)) { 
            flatten(product.products, arr)
        }
    }
    return arr;
}