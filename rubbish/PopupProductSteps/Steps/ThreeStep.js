import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Step } from "../..";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "./Steps.module.css";

export const ThreeStep = ({ step, onSubmit, onBack, data }) => {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    reset(data)
  }, [reset, data]);

  return (
    <Step active={step === 3}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.File
            id="exampleFormControlFile1"
            label="Картинка"
            {...register("image")}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Вес</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите вес"
            {...register("weight")}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Калорийность</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите калорийность"
            {...register("calorie")}
          />
        </Form.Group>
        <div className={styles.buttons}>
          <Button onClick={onBack} variant="secondary" type="button">
            Назад
          </Button>
          <Button variant="primary" type="submit">
            Добавить
          </Button>
        </div>
      </Form>
    </Step>
  );
};
