import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Step } from "../../";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import styles from "./Steps.module.css";

export const OneStep = ({ step, onSubmit, onBack }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <Step active={step === 1}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label>Имя</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите название"
            {...register("name", { required: true })}
          />
          <Form.Text className={styles.errors}>
            {errors.name && "Введите название"}
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="exampleForm.active">
          <Form.Check
            type="checkbox"
            label="Активный"
            {...register("active")}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.favorites">
          <Form.Check
            type="checkbox"
            label="Избранное"
            {...register("favorites")}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Кухня</Form.Label>
          <Form.Control
            as="select"
            multiple
            {...register("kitchen", { required: true })}
          >
            <option value="0">Русская кухня</option>
            <option value="1">Итальянская кухня</option>
            <option value="2">Японская кухня</option>
            <option value="3">Паназиатская кухня</option>
            <option value="4">Авторская кухня</option>
          </Form.Control>
          <Form.Text className={styles.errors}>
            {errors.kitchen && "Выберите кухню"}
          </Form.Text>
        </Form.Group>
        {/* <Form.Group>
          <Form.Label>Категория</Form.Label>
          <Controller
            name="category"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Выберите категорию..."
                options={options}
              />
            )}
          />
          <Form.Text className={styles.errors}>
            {errors.category && "Выберите категорию"}
          </Form.Text>
        </Form.Group> */}
        <div className={styles.buttons}>
          <Button onClick={onBack} variant="secondary" type="button">
            Отмена
          </Button>
          <Button variant="primary" type="submit">
            Далее
          </Button>
        </div>
      </Form>
    </Step>
  );
};
