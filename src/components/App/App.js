import React, { useState, useMemo, useEffect } from 'react';
import { Tree } from '../'
import { 
    testProductArray,
    productsTree,
    flattenProducts,
    statusChange,
} from '../../utils';

export const App = () => {
    const [products, setProducts] = useState([]);
    const [list, setList] = useState([]);
    const tree = useMemo(() => productsTree(products, list), [ products, list ]);

    const handleStatus = (product) => {
        //item, tree, status
        setProducts(statusChange(product, tree, !product.active));
    }

    useEffect(() => {
        const list = flattenProducts(testProductArray);
        const products = productsTree(testProductArray, list);
        setList(list);
        setProducts(products);
    }, [])
    
    return (
        <>
            {tree && tree.length ? 
                <Tree 
                    tree={products} 
                    handleStatus={handleStatus} 
                /> : 
                null
            }
        </>
    )
}