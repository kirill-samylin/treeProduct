function isRefer(item, product) {
    return item.category_id === product.category_id || item.parent_id === product.category_id
}

function someStatus(list, product, status) {
    return list.some((item) => item.product_id && isRefer(item, product) && item.active === status);
}

function productsItem(product, list) {
    product.active = someStatus(list, product, true);
    product.isPassiveProduct = someStatus(list, product, false);
    if (product.products && product.products.length) {
        product.products = productsTree(product.products, list);
    }
}

export function productsTree(products, listTree) {
    return products.map((product) => {
        product.view = 'close';
        if (!product.product_id) {
            productsItem(product, listTree);
            return product;
        }
        return product;
    });
}