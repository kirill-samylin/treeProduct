import React from "react";
import { useDispatch } from "react-redux";
import "cropperjs/dist/cropper.css";
import { Form } from "react-bootstrap";
import { handleOpen }from "./ImageCropper.slice";
import ImageCropperPreview from './ImageCropperPreview/ImageCropperPreview';
import ImageCropperPopup from './ImageCropperPopup/ImageCropperPopup';

export const ImageCropper = ({ register, ...props }) => {

  const dispatch = useDispatch();

  const handleCropper = (file) => {
    const isImage = /^image\/\w+$/.test(file.type);
    if (!isImage) return;
    const reader = new FileReader();
    reader.onload = () => {
      dispatch(handleOpen(reader.result));
    };
    reader.readAsDataURL(file);
  };

  const onChange = (e) => {
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
  };

  return (
    <>
      <ImageCropperPreview {...props} />
      <Form.Group>
        <Form.File
          label="Картинка"
          {...register("image")}
          onChange={onChange}
        />
      </Form.Group>
      <ImageCropperPopup />
    </>
  );
};
