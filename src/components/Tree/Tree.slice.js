import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../services/api";
import { tree } from "../../utils";
import { localeProducts } from "../../services/localeProducts";

const initialState = {
  products: [],
  loading: false,
};

export const getAsync = createAsyncThunk(
  "tree/get",
  async (restaurant_id) => {
    if (restaurant_id === "test") {
      return localeProducts;
    }
    return await api.get(restaurant_id);
  }
);

export const removeAsync = createAsyncThunk(
  "tree/remove",
  async (product) => {
    if (product.id === "test") {
      return product;
    }
    return await api.remove(product);
  }
);

export const treeSlice = createSlice({
  name: "tree",
  initialState,
  reducers: {
    changeStatus: (state, action) => {
      const item = action.payload;
      if ((item.hasOwnProperty("active") && item.active) || (item.hasOwnProperty("disabled") && !item.disabled)) {
        state.products = tree.offBranch(item, state.products);
      } else {
        state.products = tree.onBranch(item, state.products);
      }
    },
    changeExpand: (state, action) => {
      const item = action.payload;
      state.products = tree.set(item, state.products, 'expanded', !item.expanded);
    },
    insert: (state, action) => {
      const item = action.payload;
      state.products = tree.insert(item, state.products);
    },
    remove: (state, action) => {
      const item = action.payload;
      state.products = tree.remove(item, state.products);
    },
    move: (state, action) => {
      const item = action.payload;
      tree.move(item, state.products);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAsync.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(getAsync.rejected, (state) => {
        state.products = localeProducts;
        state.loading = false;
      })
      .addCase(removeAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeAsync.fulfilled, (state, action) => {
        const item = action.payload;
        state.products = tree.remove(item, state.products);
        state.loading = false;
      })
  },
});

export const { changeStatus, changeExpand, insert, remove } = treeSlice.actions;

export const selectTree = (state) => {
  const items = state.tree.products;
  let list = tree.flatten(items);
  list = tree.passiveMode(list);
  const products = tree.get(items, list);
  return { list, products };
};



export default treeSlice.reducer;
