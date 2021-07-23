import React from "react";
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

const ImageCropperPreview = ({ className, classImage, classMenu }) => {
  const url = useSelector(selectUrl);
  const image = useSelector(selectImage);
  const loading = useSelector(selectLoading);
  const imageLoad = useSelector(selectImageLoad);
  const dispatch = useDispatch();
  const onRemove = () => dispatch(handleRemove());

  const onChange = () => {
    dispatch(handleOpen(image));
  };

  const onLoad = () => {
    dispatch(offImageLoad());
  };

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
            <Button onClick={onRemove} size="sm" className="mr-2" variant="danger" disabled={imageLoad}>
              Удалить
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default ImageCropperPreview;
