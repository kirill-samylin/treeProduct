import React, { useEffect } from "react";
import validator from "validator";
import { Popup } from "..";
import styles from "./PopupProduct.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { selectState, handleClose, selectData } from "./PopupProduct.slice";

import {
  insert,
} from '../App/App.slice';

export const PopupProduct = () => {
  const state = useSelector(selectState);
  const data = useSelector(selectData);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (values) => {
    delete values.image;
    dispatch(insert({
      product_id: +new Date(),
      ...values
    }));
    onClose();
  };

  const onClose = () => {
    dispatch(handleClose());
  };

  useEffect(() => {
    reset(data);
  }, [reset, data]);

  useEffect(() => {
    register("price", {
      validate: (value) => validator.isCurrency(value),
    });
  }, [register]);

  return (
    <Popup opened={state} title="Добавить продукт" onClose={onClose}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label>Название продукта:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите название"
            {...register("name", { required: true })}
          />
          <Form.Text className={styles.errors}>
            {errors.name && "Введите название"}
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Описание:</Form.Label>
          <Form.Control as="textarea" rows={2} {...register("ingredients")} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Кухня:</Form.Label>
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
        <Form.Group>
          <Form.Label>Цена:</Form.Label>
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
        <div className="d-flex">
          <Form.Group controlId="exampleForm.active" className="mr-4">
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
        </div>
        <div className={styles.buttons}>
          <Button variant="primary" type="submit">
            Добавить
          </Button>
          <Button variant="secondary" type="button" onClick={onClose}>
            Отмена
          </Button>
        </div>
      </Form>
    </Popup>
  );
};
