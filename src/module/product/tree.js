function isRefer(item, product) {
    return item.category_id === product.category_id || item.parent_id === product.category_id
}

function someStatus(list, product, status) {
    return list.some((item) => item.product_id && isRefer(item, product) && item.active === status);
}

function treeItem(product, list) {
    product.active = someStatus(list, product, true);
    product.isPassive = someStatus(list, product, false);
    if (product.products && product.products.length) {
        product.products = tree(product.products, list);
    }
}

export function tree(products, listTree) {
    return products.map((product) => {
        if (!product.expanded) product.expanded = false;
        if (!product.product_id) {
            treeItem(product, listTree);
            return product;
        }
        return product;
    });
}