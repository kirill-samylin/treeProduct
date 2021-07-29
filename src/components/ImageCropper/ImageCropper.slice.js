import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { saveImage, getImageUrl } from "../../services/api";

const initialState = {
  isOpen: false,
  image: "",
  url: "",
  loading: false,
  imageLoad: false,
  images: [],
};

export const saveImageAsync = createAsyncThunk(
  "imageCropper/saveImage",
  async (data) => {
    const response = await saveImage(data);
    return response.data;
  }
);

export const getImageUrlAsync = createAsyncThunk(
  "imageCropper/getImageUrl",
  async (data) => {
    return await Promise.all([...data.map((image) => {
      const formData = new FormData();
      formData.append("image", image.blob);
      formData.append("productId", undefined);
      return getImageUrl(formData, image.key);
    })]);
  }
);

export const imageCropperSlice = createSlice({
  name: "imageCropper",
  initialState,
  reducers: {
    handleClose: (state) => {
      state.imageLoad = false;
      state.isOpen = false;
      state.image = "";
    },
    handleOpen: (state, action) => {
      state.imageLoad = true;
      state.image = action.payload;
      state.isOpen = true;
    },
    handleRemove: (state) => {
      state.url = "";
    },
    offImageLoad: (state) => {
      state.imageLoad = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getImageUrlAsync.pending, (state) => {
        state.url = "";
        state.imageLoad = true;
        state.loading = true;
        state.isOpen = false;
      })
      .addCase(getImageUrlAsync.fulfilled, (state, action) => {
        const images = action.payload;
        if (images.length) {
          const [name, url] = Object.entries(images[0])[0];
          state.url = url;
        }
        //state.url = action.payload;
        state.loading = false;
        state.imageLoad = false;
      });
  },
});

export const { handleClose, handleOpen, handleRemove, offImageLoad } = imageCropperSlice.actions;

export const selectState = (state) => state.imageCropper.isOpen;
export const selectImage = (state) => state.imageCropper.image;
export const selectUrl = (state) => state.imageCropper.url;
export const selectLoading = (state) => state.imageCropper.loading;
export const selectImageLoad = (state) => state.imageCropper.imageLoad;


export default imageCropperSlice.reducer;
