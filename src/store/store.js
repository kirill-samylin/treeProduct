import { configureStore } from '@reduxjs/toolkit';
import treeReducer from '../components/App/AppSlice';
export const store = configureStore({
  reducer: {
    tree: treeReducer,
  },
});
