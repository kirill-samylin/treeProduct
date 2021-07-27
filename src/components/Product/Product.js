import React, { memo, useCallback } from 'react';
import styles from './Product.module.css';
import FileIcon from './icons/file.svg';
import { Button, Switch } from '../../elements';
import { useDispatch } from 'react-redux';
import {
    changeStatus,
    remove
} from '../App/App.slice';

export const Product = memo(({ product }) => {
    console.log('render Product')
    const { /*parent_id,*/ name, product_id, /*url,*/ active=false } = product;

    const dispatch = useDispatch();
    const onClick = useCallback(() => dispatch(changeStatus(product)), [product, dispatch]);
    const onRemove = useCallback(() => dispatch(remove(product)), [product, dispatch]);

    return (
        <li className={`${styles.item} list-group-item`} 
            data-id={product_id} 
            data-name="product">
            <div className={styles.information}>
                <div className={styles.header}>
                    <img className={styles.image} src={FileIcon} alt={name} />
                    <p className={styles.name}>{name}</p>
                </div> 
                <div className={styles.buttons}>
                    <Button icon='position' className='position' />
                    <Button icon='edit' />
                    <Button className="position2" icon='delete' onClick={onRemove} />
                    <Switch onClick={onClick} checked={active} passive={product.isPassive} />
                </div>
            </div>
        </li>
    )
});