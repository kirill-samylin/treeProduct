import React, { useEffect } from "react";
import validator from 'validator';
import { Popup, ImageCropper } from "..";
import styles from "./PopupCategory.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import * as categorySlice from "./PopupCategory.slice";
import * as cropperSlice from "../ImageCropper/ImageCropper.slice";

import {
  insert,
} from '../App/App.slice';

export const PopupCategory = () => {
  const state = useSelector(categorySlice.selectState);
  const data = useSelector(categorySlice.selectData);
  const url = useSelector(cropperSlice.selectUrl); 
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (values) => {
    console.log(url)
    values.category_id = +new Date();
    values.products = [];
    delete values.image;
    dispatch(insert(values));
    dispatch(categorySlice.handleClose());
  };

  const onClose = () => {
    dispatch(categorySlice.handleClose());
  };

  useEffect(() => {
    reset(data);
  }, [reset, data]);

  useEffect(() => {
    register('price', {
      validate: (value) => validator.isCurrency(value),
    });
  }, [register]);
  
  return (
    <Popup
      opened={state}
      title="Добавить категорию"
      onClose={onClose}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label>Название (Русское):</Form.Label>
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
          <Form.Label>Название (English):</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите название"
            {...register("name_en", { required: true })}
          />
          <Form.Text className={styles.errors}>
            {errors.name && "Введите название"}
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Название (Spanish):</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите название"
            {...register("name_es", { required: true })}
          />
          <Form.Text className={styles.errors}>
            {errors.name && "Введите название"}
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="exampleForm.activeCategory" className="mr-4">
          <Form.Check
              type="checkbox"
              label="Активная"
              {...register("active")}
          />
        </Form.Group>
        <ImageCropper register={register} />
        <div className={styles.buttons}>
            <Button variant="primary" type="submit">
                Добавить
            </Button>
            <Button variant="secondary" type="button" onClick={onClose} >
                Отмена
            </Button>
        </div>
      </Form>
    </Popup>
  );
};
