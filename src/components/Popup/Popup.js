import React from 'react';
import styles from './Popup.module.css';
import cn from 'classnames';
import { Button } from '../../elements';

export const Popup = ({ className, title, onClose, opened, children, ...props }) => {
    const close = () => {
        if (typeof onClose === 'function') {
            onClose();
        }
    };

    return (
        <div onClick={close} className={cn(styles.overley, className, {
            [styles.opened]: opened
        })} {...props}>
            <div className={styles.container}>
                <Button className={styles.button} onClick={close} icon="closeButton" />
                {title && <h2 className={styles.title}>{title}</h2>}
                {children}
            </div>
        </div>
    );
};