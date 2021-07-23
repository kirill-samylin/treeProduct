import React from 'react';
import styles from './Switch.module.css';
import cn from 'classnames';

export const Switch = ({ checked=false, className, passive=false, ...props }) => {
    return (
        <label className={cn(styles.switch, className, {
            [styles.passive]: passive
        })}>
            <input onChange={() => {}} type="checkbox" checked={checked} />
            <span {...props}></span>
        </label>
    );
};