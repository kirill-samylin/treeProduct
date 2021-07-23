import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { saveImage } from "../../services/api";

const initialState = {
  isOpen: false,
  image: "",
  url: "",
  loading: false,
};

export const saveImageAsync = createAsyncThunk(
  "imageCropper/saveImage",
  async (data) => {
    const response = await saveImage(data);
    return response.data;
  }
);

export const imageCropperSlice = createSlice({
  name: "imageCropper",
  initialState,
  reducers: {
    handleClose: (state) => {
      state.isOpen = false;
      state.image = "";
    },
    handleOpen: (state, action) => {
      state.image = action.payload;
      state.isOpen = true;
      state.url = "";
    },
    handleRemove: (state) => {
      state.url = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveImageAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveImageAsync.fulfilled, (state, action) => {
        state.url = action.payload;
        state.loading = false;
        state.isOpen = false;
      });
  },
});

export const { handleClose, handleOpen, handleRemove } = imageCropperSlice.actions;

export const selectState = (state) => state.imageCropper.isOpen;
export const selectImage = (state) => state.imageCropper.image;
export const selectUrl = (state) => state.imageCropper.url;

export default imageCropperSlice.reducer;
