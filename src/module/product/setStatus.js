import { isEqual, isDishes } from '.';

function set(item, status, arr) {
    if (item.hasOwnProperty('product_id')) {
        arr.push({
            product_id: item.product_id,
            active: status,
        })
    }
    item.active = status;
}

function treeSetStatus(tree=[], status=false, arr) {
    for (let branch of tree) {
        set(branch, status, arr);
        if (isDishes(branch)) {
            treeSetStatus(branch.products, status, arr);
        }
    }
}

export function setStatus(item, tree, status, arr=[]) {
    return tree.map((branch) => {
        if (isEqual(item, branch)) {
            set(branch, status, arr);
            treeSetStatus(branch.products, status, arr);
        } else if (isDishes(branch)) {
            branch.products = setStatus(item, branch.products, status, arr);
        }
        return branch;
    });
}