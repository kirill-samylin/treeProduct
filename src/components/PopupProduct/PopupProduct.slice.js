import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  data: {},
};

export const popupProductSlice = createSlice({
  name: "popupProduct",
  initialState,
  reducers: {
    handleClose: (state) => {
      state.isOpen = false;
      state.data = {};
    },
    handleOpen: (state, action) => {
      state.data = {
        parent_id: action.payload.category_id,
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

export const { handleClose, handleOpen, setData } = popupProductSlice.actions;

export const selectState = (state) => state.popupProduct.isOpen;
export const selectData = (state) => state.popupProduct.data;

export default popupProductSlice.reducer;
