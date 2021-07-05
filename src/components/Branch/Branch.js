import React, { memo } from 'react';
import styles from './Branch.module.css';
import DefaultIcon from './icons/restaurant.svg';
import { Tree } from '../';
import { Button, Switch } from '../../elements';
import cn from 'classnames';
export const Branch = memo(({ product, handleStatus, handleExpand }) => {
    console.log('render Branch')
    const { category_id, parent_id, name, products, product_id, url, active=false, expanded } = product;

    const onClick = () => handleStatus(product);
    const onClickExpanded = () => handleExpand(product);

    return (
        <li className={`${styles.item} list-group-item`}>
            <div className={styles.information}>
                <div className={styles.header}>
                    {(!product_id) ? 
                        <Button onClick={onClickExpanded} icon={expanded ? 'open' : 'close'} opacity={products && !products.length} />
                    : null}
                    <img className={styles.image} src={url || DefaultIcon} alt={name} />
                    <p className={styles.name}>{name}</p>
                </div> 
                <div className={styles.buttons}>
                    <Button icon='position' className='position' />
                    <Button icon='edit' />
                    <Button icon='delete' />
                    {(!product_id) ? <Button icon='insert' /> : null }
                    <Switch onClick={onClick} checked={active}/>
                </div>
            </div>
            {!product_id ? 
                <Tree
                    tree={products} 
                    expanded={expanded}
                    handleStatus={handleStatus}
                    handleExpand={handleExpand}
                    className={styles.view}
                />
            : null}
            
        </li>
    )
});