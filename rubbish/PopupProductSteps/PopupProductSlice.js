import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  data: {},
};

export const popupProductSlice = createSlice({
  name: "popupProduct",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    handleClose: (state) => {
      state.data = {};
      state.isOpen = false
    },
    handleOpen: (state, action) => {
      state.data = {
        parent_id: action.payload,
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

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectState = (state) => state.popupProduct.isOpen;
export const selectData = (state) => state.popupProduct.data;

export default popupProductSlice.reducer;
