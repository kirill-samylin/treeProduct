import React, { useState, useEffect } from 'react';
import { Popup, Steps } from '..';
import styles from './PopupProduct.module.css';
import { useSelector, useDispatch } from "react-redux";
import {
  selectState,
  handleClose,
  selectData
} from "./PopupProductSlice";

import { OneStep, TwoStep, ThreeStep } from './Steps';

export const PopupProduct = () => {
    console.log('render PopupProduct')
    const [step, setStep] = useState(1);
    const [dataForm, setDataForm] = useState({});
    const state = useSelector(selectState);
    const data = useSelector(selectData);
    const dispatch = useDispatch();

    const steps = [
        { value: 1 },
        { value: 2 },
        { value: 3 },
    ];

    const nextStep = (values) => {
        setDataForm({
            ...dataForm,
            ...values,
        });
        if (steps.length === step) {
            console.log(dataForm);
            return
        };
        setStep(step+1);
    };

    const onClose = () => {
        setDataForm({});
        dispatch(handleClose());
        setStep(1);
    };

    const backStep = () => {
        if (step === 1) {
            handleClose();
            return
        }; 
        setStep(step-1);
    };
    
    useEffect(() => {
        setDataForm(data);
    }, [data]);

    return (
        <Popup opened={state} title="Добавить продукт" onClose={onClose} classContainer={styles.popup}>
            <Steps className={styles.steps} steps={steps} step={step} />
            <OneStep step={step} data={dataForm} onSubmit={nextStep} onBack={backStep} />
            <TwoStep step={step} data={dataForm} onSubmit={nextStep} onBack={backStep} />
            <ThreeStep step={step} data={dataForm} onSubmit={nextStep} onBack={backStep} />
        </Popup>
    );
};