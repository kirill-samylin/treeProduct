import { configureStore } from '@reduxjs/toolkit';
import treeReducer from '../components/App/App.slice';
import popupProduct from '../components/PopupProduct/PopupProduct.slice';
import popupCategory from '../components/PopupCategory/PopupCategory.slice';
import imageCropper from '../components/ImageCropper/ImageCropper.slice';
export const store = configureStore({
  reducer: {
    tree: treeReducer,
    popupProduct,
    popupCategory,
    imageCropper,
  },
});
