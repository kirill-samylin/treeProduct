import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Tree } from '../'
import { 
    testProductArray,
} from '../../utils';
import { dishes } from '../../module';

export const App = () => {
    const [products, setProducts] = useState([]);
    const [list, setList] = useState([]);
    
    const tree = useMemo(() => {
        return dishes.tree(products, list);
    }, [ products, list ]);
    
    const handleStatus = (product) => {
        setProducts(dishes.setStatus(product, products, !product.active));
    }

    const handleExpand = (product) => {
        //console.log(dishes.set(product, tree, 'expanded', !product.expanded ));
        const arr = dishes.set(product, products, 'expanded', !product.expanded);
        console.log(arr)
        setProducts(arr);
    }

    useEffect(() => {
        const list = dishes.flatten(testProductArray);
        const products = dishes.tree(testProductArray, list);
        setList(list);
        setProducts(products);
    }, [])
    
    return (
        <>
            {products && products.length ? 
                <Tree 
                    tree={products} 
                    handleStatus={handleStatus}
                    handleExpand={handleExpand}
                /> : 
                null
            }
        </>
    )
}