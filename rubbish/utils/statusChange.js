
function setStatus(item, status, arr) {
    if (item.hasOwnProperty('product_id')) {
        arr.push({
            product_id: item.product_id,
            active: status,
        })
    }
    item.active = status
}

function treeStatusChange(tree=[], status=false, arr) {
    for (let branch of tree) {
        setStatus(branch, status, arr);
        if (branch.products && branch.products.length) {
            treeStatusChange(branch.products, status, arr);
        }
    }
}

export function statusChange(item, tree, status, arr=[]) {
    return tree.map((branch) => {
        if (branch.parent_id === item.parent_id && branch.category_id === item.category_id && branch.product_id === item.product_id) {
            setStatus(branch, status, arr);
            treeStatusChange(branch.products, status, arr)
        } else if (branch.products && branch.products.length) {
            branch.products = statusChange(item, branch.products, status, arr);
        }
        return branch;
    });
}