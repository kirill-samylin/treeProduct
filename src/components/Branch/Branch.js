import React, { memo, useCallback } from 'react';
import styles from './Branch.module.css';
import cn from 'classnames';
import FolderIcon from './icons/folder.svg';
import FileIcon from './icons/file.svg';
import { Tree } from '../';
import { Button, Switch } from '../../elements';
import { useDispatch } from 'react-redux';
import {
    changeStatus,
    changeExpand,
    remove
} from '../App/App.slice';

import * as popupProduct from "../PopupProduct/PopupProduct.slice";
import * as popupCategory from "../PopupCategory/PopupCategory.slice";

export const Branch = memo(({ product }) => {
    console.log('render Branch')
    const { category_id, /*parent_id,*/ name, products, product_id, /*url,*/ active=false, expanded } = product;

    const dispatch = useDispatch();
    const onClick = useCallback(() => dispatch(changeStatus(product)), [product, dispatch]);
    const onClickExpanded = useCallback(() => dispatch(changeExpand(product)), [product, dispatch]);
    const onCreateProduct = useCallback(() => dispatch(popupProduct.handleOpen(product)), [product, dispatch]);
    const onCreateCategory = useCallback(() => dispatch(popupCategory.handleOpen(product)), [product, dispatch]);
    const onRemove = useCallback(() => dispatch(remove(product)), [product, dispatch]);

    return (
        <li className={`${styles.item} list-group-item`} 
            data-id={!product_id ? category_id : product_id} 
            data-name={!product_id ? "category" : "product"}>
            <div className={styles.information}>
                <div onClick={!product_id ? onClickExpanded : undefined} className={cn(styles.header, {
                    [styles.cursor]: !product_id,
                })}>
                    {(!product_id) ? 
                        <Button icon={expanded ? 'open' : 'close'} opacity={products && !products.length} />
                    : null}
                    <img className={styles.image} src={(!product_id) ? FolderIcon : FileIcon} alt={name} />
                    <p className={styles.name}>{name}</p>
                </div> 
                <div className={styles.buttons}>
                    <Button icon='position' className='position' />
                    {(!product_id) ? <Button onClick={onCreateCategory} icon='folder_plus' /> : null }
                    {(!product_id) ? <Button onClick={onCreateProduct} icon='insert' /> : null }
                    <Button icon='edit' />
                    <Button className="position2" icon='delete' onClick={onRemove} />
                    <Switch onClick={onClick} checked={active}/>
                </div>
            </div>
            {!product_id ? 
                <Tree
                    id={category_id}
                    tree={products} 
                    expanded={expanded}
                    className={styles.view}
                />
            : null}
            
        </li>
    )
});