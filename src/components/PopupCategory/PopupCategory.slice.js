import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  data: {},
};

export const popupCategorySlice = createSlice({
  name: "popupCategory",
  initialState,
  reducers: {
    handleClose: (state) => {
      state.isOpen = false;
      state.data = {};
    },
    handleOpen: (state, action) => {
      state.data = {
        parent_id: action.payload.category_id || "root",
        category_id: action.payload.category_id,
        parent_item: action.payload,
      };
      state.isOpen = true;
    },
    setData: (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload,
      }
    },
  },
});

export const { handleClose, handleOpen, setData } = popupCategorySlice.actions;

export const selectState = (state) => state.popupCategory.isOpen;
export const selectData = (state) => state.popupCategory.data;

export default popupCategorySlice.reducer;
