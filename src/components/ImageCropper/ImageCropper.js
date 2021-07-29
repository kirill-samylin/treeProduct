import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import "cropperjs/dist/cropper.css";
import { Form } from "react-bootstrap";
import { handleOpen, selectImageLoad }from "./ImageCropper.slice";
import ImageCropperPreview from './ImageCropperPreview/ImageCropperPreview';
import ImageCropperPopup from './ImageCropperPopup/ImageCropperPopup';
export const ImageCropper = ({ register, options, ...props }) => {
  console.log('render ImageCropper')
  const dispatch = useDispatch();

  const imageLoad = useSelector(selectImageLoad);

  const handleCropper = useCallback((file) => {
    const isImage = /^image\/\w+$/.test(file.type);
    if (!isImage) return;
    const reader = new FileReader();
    reader.onload = () => {
      dispatch(handleOpen(reader.result));
    };
    reader.readAsDataURL(file);
  }, [dispatch]);

  const onClick = useCallback((e) => {
    if (e && e.target && e.target.value) {
      e.target.value = null;
    }
  }, []);

  const onChange = useCallback((e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    if (files.length) {
      handleCropper(files[0]);
    }
  }, [handleCropper]);

  return (
    <>
      <ImageCropperPreview {...props} />
      <Form.Group>
        <Form.File
          label="Картинка"
          {...register("image")}
          onChange={onChange}
          onClick={onClick}
          disabled={imageLoad}
        />
      </Form.Group>
      <ImageCropperPopup {...options} />
    </>
  );
};
