import { configureStore } from '@reduxjs/toolkit';
import { setAutoFreeze } from 'immer';
import treeReducer from '../components/App/App.slice';
import popupProduct from '../components/PopupProduct/PopupProduct.slice';
import popupCategory from '../components/PopupCategory/PopupCategory.slice';
import imageCropper from '../components/ImageCropper/ImageCropper.slice';
setAutoFreeze(false);
export const store = configureStore({
  reducer: {
    tree: treeReducer,
    popupProduct,
    popupCategory,
    imageCropper,
  },
});

