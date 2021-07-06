import React, { memo, useState } from 'react';
import { Popup, Steps } from '../';
import styles from './ProductСreate.module.css';

import { OneStep, TwoStep, ThreeStep } from './Steps';

export const ProductСreate = memo(({ opened, handleClose }) => {
    const [step, setStep] = useState(1);
    const [data, setData] = useState({});

    const steps = [
        { value: 1 },
        { value: 2 },
        { value: 3 },
    ];

    const nextStep = (values) => {
        setData({
            ...data,
            ...values,
        });
        if (steps.length === step) {
            console.log(data);
            return
        };
        setStep(step+1);
    };

    const backStep = () => {
        if (step === 1) {
            handleClose();
            return
        }; 
        setStep(step-1);
    };

    return (
        <Popup opened={opened} title="Добавить продукт" onClose={handleClose}>
            <Steps className={styles.steps} steps={steps} step={step} />
            <OneStep step={step} onSubmit={nextStep} onBack={backStep} />
            <TwoStep step={step} onSubmit={nextStep} onBack={backStep} />
            <ThreeStep step={step} onSubmit={nextStep} onBack={backStep} />
        </Popup>
    );
});