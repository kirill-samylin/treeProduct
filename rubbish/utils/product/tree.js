function treeItem(product, list) {
    product.isPassive = list.find((item) => product.category_id === item.category_id).isPassive;
    if (product.children && product.children.length) {
        product.children = tree(product.children, list);
    }
}

export function tree(products, listTree) {
    return products.map((product) => {
        const obj = {
            ...product
        };
        if (!obj.expanded) obj.expanded = false;
        if (obj.category_id) {
            treeItem(obj, listTree);
            return obj;
        }
        return obj;
    });
}
