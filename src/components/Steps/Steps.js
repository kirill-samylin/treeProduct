import React from 'react';
import styles from './Steps.module.css';
import cn from 'classnames';

export const Steps = ({ className, steps, step}) => {
    return (
        <ul className={cn(styles.steps, className)}>
            {steps && steps.map(({ value }, i) => (
                <li key={value} value={value} className={cn(styles.step, {
                    [styles.active]: step === i + 1,
                })}>
                    {value}
                </li>
            ))}
        </ul>
    );
};