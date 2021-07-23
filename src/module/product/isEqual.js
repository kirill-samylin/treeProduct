export function isEqual(dishes, item) {
    return dishes.parent_id === item.parent_id && dishes.category_id === item.category_id && dishes.product_id === item.product_id;
}