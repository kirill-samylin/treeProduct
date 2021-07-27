import React, { memo, useCallback } from 'react';
import styles from './Category.module.css';
import cn from 'classnames';
import FolderIcon from './icons/folder.svg';
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
import * as popupСonfirm from "../PopupСonfirm/PopupСonfirm.slice";

export const Category = memo(({ product }) => {
    console.log('render Category');

    const { category_id, parent_id, name_ru, products, children, /*url,*/ disabled, expanded } = product;

    const dispatch = useDispatch();
    const onClick = useCallback(() => dispatch(changeStatus(product)), [product, dispatch]);
    const onClickExpanded = useCallback(() => dispatch(changeExpand(product)), [product, dispatch]);
    const onCreateProduct = useCallback(() => dispatch(popupProduct.handleOpen(product)), [product, dispatch]);
    const onCreateCategory = useCallback(() => dispatch(popupCategory.handleOpen(product)), [product, dispatch]);
    const onRemove = useCallback(() => dispatch(remove(product)), [product, dispatch]);

    const onConfirm = useCallback(() => dispatch(popupСonfirm.handleOpen({
        data: product,
        title: `Удалить категорию ${name_ru} ?`,
        cb: onRemove,
    })), [product, dispatch, onRemove, name_ru]);

    return (
        <li className={`${styles.item} list-group-item`} 
            data-id={category_id} 
            data-name="category">
            <div className={styles.information}>
                <div onClick={onClickExpanded} className={cn(styles.header, styles.cursor)}>
                    <Button icon={expanded ? 'open' : 'close'} opacity={products && !products.length} />
                    <img className={styles.image} src={FolderIcon} alt={name_ru} />
                    <p className={styles.name}>{name_ru}</p>
                </div> 
                <div className={styles.buttons}>
                    <Button icon='position' className='position' />
                    <Button onClick={onCreateCategory} icon='folder_plus' />
                    <Button onClick={onCreateProduct} icon='insert' />
                    <Button icon='edit' />
                    <Button className="position2" icon='delete' onClick={onConfirm} />
                    <Switch onClick={onClick} checked={!disabled} passive={product.isPassive} />
                </div>
            </div>
                <Tree
                id={category_id}
                products={products}
                categories={children} 
                expanded={expanded}
                className={styles.view}
            />
        </li>
    )
});