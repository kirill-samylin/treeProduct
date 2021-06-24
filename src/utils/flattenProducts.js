export function flattenProducts(products, arr=[]) {
    for (let product of products) {
        arr.push(product);
        if (Array.isArray(product.products)) { 
            flattenProducts(product.products, arr)
        }
    }
    return arr;
}