import React, { createRef, useEffect, memo } from 'react';
import styles from'./Tree.module.css';
import { Branch } from '../';
import cn from 'classnames';

export const Tree = memo(({ tree, className, handleStatus, handleExpand, expanded }) => {
    const treeElement = createRef(null);
    
    console.log('render tree')
    
    function getKey({ category_id, product_id, parent_id, }) {
        if (!parent_id) {
            return category_id
        } 
        if (!product_id) {
            return category_id;
        }
        return product_id;
    }
    useEffect(() => {
        window.$(treeElement.current).sortable({ 
            // fallbackOnBody: false,
            group: 'list',
            animation: 200,
            ghostClass: 'ghost',
            handle: '.position',
        });
    }, [treeElement, expanded]);

    return (
        <ul ref={treeElement} className={cn(styles.tree, className, 'list-group m-4', {
            [styles.open]: expanded,
        })}>
            {tree && tree.map((branch) => (
                <Branch 
                    key={getKey(branch)} 
                    product={branch} 
                    handleStatus={handleStatus} 
                    handleExpand={handleExpand}
                />
            ))}
        </ul>
    )
});