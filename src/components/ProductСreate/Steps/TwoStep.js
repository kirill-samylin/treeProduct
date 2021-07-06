import React from "react";
import { useForm } from "react-hook-form";
import { Step } from "../../";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "./Steps.module.css";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import validator from 'validator';

export const TwoStep = ({ step, onSubmit, onBack }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    register('price', {
      validate: (value) => validator.isCurrency(value),
    });
    register('discount_price', {
        validate: (value) => value.length === 0 || validator.isCurrency(value),
    });
}, [register]);

  return (
    <Step active={step === 2}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label>Цена</Form.Label>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Введите стоимость"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              {...register("price", { required: true })}
            />
            <InputGroup.Append>
              <InputGroup.Text id="basic-addon2">руб.</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
          <Form.Text className={styles.errors}>
            {errors.price && "Укажите стоимость"}
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Цена со скидкой</Form.Label>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Введите стоимость"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              {...register("discount_price")}
            />
            <InputGroup.Append>
              <InputGroup.Text id="basic-addon2">руб.</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
          <Form.Text className={styles.errors}>
            {errors.discount_price && "Укажите в правильном формате"}
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Ингредиенты</Form.Label>
          <Form.Control as="textarea" rows={3} {...register("ingredients")} />
        </Form.Group>
        <div className={styles.buttons}>
          <Button onClick={onBack} variant="secondary" type="button">
            Назад
          </Button>
          <Button variant="primary" type="submit">
            Далее
          </Button>
        </div>
      </Form>
    </Step>
  );
};
