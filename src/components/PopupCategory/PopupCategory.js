import React, { useEffect } from "react";
import { Popup, ImageCropper } from "..";
import styles from "./PopupCategory.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { selectState, selectData, handleClose } from "./PopupCategory.slice";
import { handleRemove } from "../ImageCropper/ImageCropper.slice";

import {
  insert,
} from '../Tree/Tree.slice';

export const PopupCategory = () => {
  const state = useSelector(selectState);
  const data = useSelector(selectData);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: 'onChange' });

  const onSubmit = (values) => {
    values.category_id = +new Date();
    values.products = [];
    values.children = [];
    values.disabled = +values.disabled;
    delete values.image;
    dispatch(insert(values));
    onClose();
  };

  const onClose = () => {
    dispatch(handleClose());
    dispatch(handleRemove());
  };

  useEffect(() => {
    reset(data);
  }, [reset, data]);
  
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
            {...register("name_ru", { required: true })}
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
            {errors.name_en && "Введите название"}
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
            {errors.name_es && "Введите название"}
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="exampleForm.activeCategory" className="mr-4">
          <Form.Check
              type="checkbox"
              label="Выключено"
              {...register("disabled")}
          />
        </Form.Group>
        <ImageCropper register={register} />
        <div className={styles.buttons}>
            <Button variant="primary" type="submit" disabled={!isValid}>
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
