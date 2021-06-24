import React from 'react';
import styles from './Switch.module.css';

export const Switch = ({ checked=false, ...props }) => {
    return (
        <label className={styles.switch}>
            <input onChange={() => {}} type="checkbox" checked={checked} />
            <span {...props}></span>
        </label>
    );
};