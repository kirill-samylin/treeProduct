import React, { useRef, useState } from "react";
import styles from "./ImageCropperPopup.module.css";
import { Popup } from "../..";
import Cropper from "react-cropper";
import { Button } from "react-bootstrap";
import * as cropperSlice from "../ImageCropper.slice";
import { useSelector, useDispatch } from "react-redux";
const style = {
  width: 750,
  height: 470,
};

const options = {
  aspectRatio: 75 / 47,
  autoCropArea: 1,
  style,
};

const ImageCropperPopup = () => {
  const cropperRef = useRef(null);
  const [ cropper, setCropper ] = useState('');

  const state = useSelector(cropperSlice.selectState);
  const image = useSelector(cropperSlice.selectImage);
  const dispatch = useDispatch();
  
  const onClose = () => {
    dispatch(cropperSlice.handleClose());
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      const croppImage = cropper.getCroppedCanvas().toDataURL();
      const formData = new FormData();
      const blob = new Blob([croppImage], { type: "image/png" });
      formData.append("image", blob);
      dispatch(cropperSlice.saveImageAsync(formData));
    }
  };

  return (
    <Popup
      className={styles.popup}
      classContainer={styles.container}
      opened={state}
    >
      <Cropper
        src={image || ""}
        {...options}
        ref={cropperRef}
        onInitialized={(instance) => {
          setCropper(instance);
        }}
      />
      <div className={styles.buttons}>
        <Button onClick={getCropData}>Добавить</Button>
        <Button onClick={onClose} variant="secondary">
          Отмена
        </Button>
      </div>
    </Popup>
  );
};

export default ImageCropperPopup;