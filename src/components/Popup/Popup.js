import React from 'react';
import styles from './Popup.module.css';
import cn from 'classnames';
import { Button } from '../../elements';

export const Popup = ({ className, title, onClose, opened, children, classContainer, ...props }) => {
    const close = () => {
        if (typeof onClose === 'function') {
            onClose();
        }
    };
    
    const handleBackgroundClose = (e) => {
        if (e.target.classList.contains('popup')) {
            close();
        }
    };

    return (
        <div onClick={handleBackgroundClose} className={cn(styles.popup, className, {
            [styles.opened]: opened
        })} {...props}>
            <div className={cn(styles.container, classContainer)}>
                {typeof onClose === 'function' ? <Button className={styles.button} onClick={close} icon="closeButton" /> : null}
                {title && <h2 className={styles.title}>{title}</h2>}
                {children}
            </div>
        </div>
    );
};