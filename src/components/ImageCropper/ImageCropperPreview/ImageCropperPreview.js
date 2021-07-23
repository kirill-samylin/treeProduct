import React from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import styles from "./ImageCropperPreview.module.css";
import cn from 'classnames';
import { selectUrl, handleRemove } from "../ImageCropper.slice";

const ImageCropperPreview = ({ className, classImage, classMenu }) => {
  const url = useSelector(selectUrl);
  const dispatch = useDispatch();
  const onRemove = () => dispatch(handleRemove());
  return (
    <>
     {(url) ? 
        <div className={cn(styles.preview, className)} >
            <img className={cn(styles.image, classImage)} src={url} alt="preview" />
            <div className={cn(styles.menu, classMenu)}>
                <Button size="sm" className="mr-2">Изменить</Button>
                <Button onClick={onRemove} size="sm" className="mr-2" variant="danger">Удалить</Button>
            </div>
        </div>
        : null}
    </>
  );
};
export default ImageCropperPreview;
