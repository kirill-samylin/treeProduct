import React, { useRef, useState, useCallback } from "react";
import styles from "./ImageCropperPopup.module.css";
import { Popup } from "../..";
import Cropper from "react-cropper";
import { Button } from "react-bootstrap";
import { selectState, selectImage, handleClose, saveImageAsync, getImageUrlAsync } from "../ImageCropper.slice";
import { useSelector, useDispatch } from "react-redux";
import { defaultType, defaultWidth, defaultHeight, defaultQuality } from "../../../constants/cropper";

const ImageCropperPopup = ({ cropperOptions, formats }) => {
  const cropperRef = useRef(null);
  const [ cropper, setCropper ] = useState('');

  const state = useSelector(selectState);
  const image = useSelector(selectImage);
  const dispatch = useDispatch();
  
  const onClose = useCallback(() => {
    dispatch(handleClose());
  }, [dispatch]);

  const getCropData = useCallback(() => {
 
    if (typeof cropper !== "undefined") {
      const images = [];
      for (let format of formats) {
        const croppImage = cropper.getCroppedCanvas({ 
          width: format.width || defaultWidth,
          height: format.height || defaultHeight,
          imageSmoothingQuality: format.quality || defaultQuality,
        }).toDataURL();
        images.push({
          blob: new Blob([croppImage], { type: format.type || defaultType }),
          key: format.key,
        });
      }
      dispatch(getImageUrlAsync(images));
    }
  }, [cropper, formats, dispatch]);

  return (
    <Popup
      className={styles.popup}
      classContainer={styles.container}
      opened={state}
    >
      <Cropper
        src={image || ""}
        {...cropperOptions}
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