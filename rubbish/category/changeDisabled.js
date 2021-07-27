import { tree } from '..';

function set(item, status, arr) {
    // if (item.hasOwnProperty('product_id')) {
    //     arr.push({
    //         product_id: item.product_id,
    //         active: status,
    //     })
    // }
    if (item.category_id) {
        item.disabled = +status;
    } else {
        item.active = status;
    }
}

function setStatus(list=[], status=false, arr) {
    for (let branch of list) {
        set(branch, status, arr);
        if (branch.category_id) {
            setStatus(branch.products, status, arr);
            setStatus(branch.children, status, arr);
        }
    }
}

export function changeDisabled(item, list, status, arr=[]) {
    return list.map((branch) => {
        if (tree.isEqual(item, branch)) {
            set(branch, status, arr);
            setStatus(branch.products, !status, arr);
            setStatus(branch.children, status, arr);
        } else if (branch.category_id) {
            branch.products = changeDisabled(item, branch.products, !status, arr);
            branch.children = changeDisabled(item, branch.children, status, arr);
        }
        return branch;
    });
}