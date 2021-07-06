import React, { useState, useEffect, useCallback } from 'react';
import { Tree, ProductСreate } from '../';
import { 
    testProductArray,
} from '../../utils';
import { dishes } from '../../module';

const startList = dishes.flatten(testProductArray);
const startProducts = dishes.tree(testProductArray, startList);

export const App = () => {
    const [products, setProducts] = useState([]);
    const [list, setList] = useState([]);
    const [productСreatePopup, setProductСreatePopup] = useState(false);

    
    const handleStatus = (product) => {
        setProducts(dishes.setStatus(product, products, !product.active));
    };

    const handleExpand = (product) => {
        const updateProducts = dishes.set(product, products, 'expanded', !product.expanded);
        console.log(updateProducts.find(i => i.name === product.name)?.expanded);
        setProducts([...updateProducts]);
        //setProducts(dishes.tree(updateProducts, list));
    };

    const handleCreate = useCallback((category) => {
        console.log(category);
        setProductСreatePopup(true);
    }, []);

    const handleClose = useCallback(() => {
        setProductСreatePopup(false);
    }, []);

    useEffect(() => {
        setList(startList);
        setProducts(startProducts);
    }, []);
    
    return (
        <>  
            {products && products.length ? 
                <Tree 
                    tree={products} 
                    handleStatus={handleStatus}
                    handleExpand={handleExpand}
                    expanded={true}
                    handleCreate={handleCreate}
                /> : 
                null
            }
            <ProductСreate opened={productСreatePopup} handleClose={handleClose} />
        </>
    )
}