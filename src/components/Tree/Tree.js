import React, { createRef, useEffect, memo } from 'react';
import styles from'./Tree.module.css';
import { Branch } from '../';
import cn from 'classnames';

export const Tree = memo(({ id, tree, className, expanded }) => {
    const treeElement = createRef(null);
    
    function getKey({ category_id, product_id, parent_id, }) {
        if (!parent_id) {
            return category_id
        } 
        if (!product_id) {
            return category_id;
        }
        return product_id;
    }
    const onSort = () => {

        console.log('1234')
        return false
    };
    const onEnd = (evt) => {
        const item = evt.item;  // dragged HTMLElement
        const parent = evt.from;
        const id = item.dataset.id;
        const name = item.dataset.name;
        const category_id = parent.dataset.id;
        const index = evt.newIndex;
        console.log({
            'id предмета': id,
            'id категории куда суем': category_id,
            'index - место куда вставляем': index,
            'тип': name,
        });
        // evt.to;    // target list
        // evt.from;  // previous list
        // evt.oldIndex;  // element's old index within old parent
        // evt.newIndex;  // element's new index within new parent
        // evt.oldDraggableIndex; // element's old index within old parent, only counting draggable elements
        // evt.newDraggableIndex; // element's new index within new parent, only counting draggable elements
        // evt.clone // the clone element
        // evt.pullMode;
        // console.log(item)
        // console.log(id, category_id)
        // console.log(evt.oldIndex, evt.newIndex)
    };
    const onMove = (evt) => {
        const parent = evt.to;
        const item = evt.dragged;
        const category_id = parent.dataset.id;
        const name = item.dataset.name;
        if (category_id === "root" && name === "product") return false
        return true
    };
    useEffect(() => {
        window.$(treeElement.current).sortable({ 
            fallbackOnBody: false,
            // selectedClass: styles.selected,
            // multiDrag: true,
            group: {
                name: 'list',
            },
            animation: 200,
            ghostClass: 'ghost',
            handle: '.position',
            onSort: onSort,
            onEnd,
            onMove,
        });
    }, [treeElement]);

    return (
        <ul ref={treeElement} data-id={id} className={cn(styles.tree, className, 'list-group', {
            [styles.open]: expanded,
        })}>
            {tree && tree.map((branch) => (
                <Branch 
                    key={getKey(branch)} 
                    product={branch}
                />
            ))}
        </ul>
    )
});