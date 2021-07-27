import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  data: {},
  title: "",
  cb: null,
};

export const PopupСonfirmSlice = createSlice({
  name: "popupСonfirm",
  initialState,
  reducers: {
    handleClose: (state) => {
      state.isOpen = false;
      state.data = {};
      state.title = "";
      state.cb = null;
    },
    handleOpen: (state, action) => {
      state.data = action.payload.data;
      state.title = action.payload.title;
      state.cb = action.payload.cb;
      state.isOpen = true;
    },
  },
});

export const { handleClose, handleOpen } = PopupСonfirmSlice.actions;


export const selectData = (state) => ({...state.popupСonfirm});

export default PopupСonfirmSlice.reducer;
