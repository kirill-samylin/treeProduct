import React, { useCallback } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import styles from "./ImageCropperPreview.module.css";
import cn from "classnames";
import {
  selectUrl,
  selectImage,
  selectLoading,
  selectImageLoad,
  handleRemove,
  handleOpen,
  offImageLoad
} from "../ImageCropper.slice";
import * as popupСonfirm from "../../PopupСonfirm/PopupСonfirm.slice";

const ImageCropperPreview = ({ className, classImage, classMenu }) => {
  const url = useSelector(selectUrl);
  const image = useSelector(selectImage);
  const loading = useSelector(selectLoading);
  const imageLoad = useSelector(selectImageLoad);
  const dispatch = useDispatch();

  const onRemove = useCallback(() => dispatch(handleRemove()), [dispatch]);

  const onChange = useCallback(() => {
    dispatch(handleOpen(image));
  }, [dispatch, image]);

  const onLoad = useCallback(() => {
    dispatch(offImageLoad());
  }, [dispatch]);

  const onConfirm = useCallback(() => dispatch(popupСonfirm.handleOpen({
    title: `Удалить картинку ?`,
    cb: onRemove,
  })), [dispatch, onRemove]);

  return (
    <>
      {url || loading ? (
        <div className={cn(styles.preview, className)}>
          <div className={cn(styles.spinner, {
              [styles.hidden]: !imageLoad || !loading,
          })}>
            <Spinner animation="border" variant="primary" />
          </div>
          <img onLoad={onLoad} src={url} alt="preview" className={cn(styles.image, classImage, {
              [styles.hidden]: imageLoad || loading,
          })}/>
          <div className={cn(styles.menu, classMenu)}>
            <Button onClick={onChange} size="sm" className="mr-2" disabled={imageLoad}>
              Изменить
            </Button>
            <Button onClick={onConfirm} size="sm" className="mr-2" variant="danger" disabled={imageLoad}>
              Удалить
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default ImageCropperPreview;
