import React from 'react';
import styles from './Button.module.css';
import cn from 'classnames';

export const Button = ({ type="button", className, opacity, children, icon, ...props }) => {
    return (
        <button type={type} {...props} className={cn(styles.button, className, {
            [styles.opacity]: !!opacity,
            [styles[icon]]: !!icon,
        })}>
            {children}
        </button>
    );
};