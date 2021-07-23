import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../../services/api";
import { product } from "../../module";

const initialState = {
  products: [],
  list: [],
  loading: false,
};

export const treeAsync = createAsyncThunk(
  "tree/getProducts",
  async (amount) => {
    const response = await getProducts(amount);
    return response.data;
  }
);

export const treeSlice = createSlice({
  name: "tree",
  initialState,
  reducers: {
    changeStatus: (state, action) => {
      const item = action.payload;
      state.products = product.setStatus(
        item,
        state.products,
        !item.active
      );
    },
    changeExpand: (state, action) => {
      const item = action.payload;
      state.products = product.set(item, state.products, 'expanded', !item.expanded);
    },
    insert: (state, action) => {
      const item = action.payload;
      if (item.parent_id === "root" && !item.product_id) {
        state.products = [item, ...state.products.concat()];
      } else {
        state.products = product.insert(item, state.products.concat());
      }
    },
    remove: (state, action) => {
      const item = action.payload;
      console.log(item)
      state.products = product.remove(item, state.products);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(treeAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(treeAsync.fulfilled, (state, action) => {
        const list = product.flatten(action.payload);
        const products = product.tree(action.payload, list);
        state.loading = false;
        state.products = products;
        state.list = list;
      });
  },
});

export const { changeStatus, changeExpand, insert, remove } = treeSlice.actions;

export const selectProducts = (state) => state.tree.products;

export default treeSlice.reducer;
