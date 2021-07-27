function getItem(product, list) {
    product.isPassive = list.find((item) => product.category_id === item.category_id).isPassive;
    if (product.children && product.children.length) {
        product.children = get(product.children, list);
    }
}

export function get(products, listTree) {
    return products.map((product) => {
        const obj = {
            ...product
        };
        if (!obj.expanded) obj.expanded = false;
        if (obj.category_id) {
            getItem(obj, listTree);
            return obj;
        }
        return obj;
    });
}
