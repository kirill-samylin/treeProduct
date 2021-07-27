import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../../services/api";
import { tree } from "../../utils";

const initialState = {
  products: [],
  loading: false,
};

export const treeAsync = createAsyncThunk(
  "tree/getProducts",
  async (id) => {
    const response = await getProducts(id);
    return response.data;
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
      if (item.parent_id === "root" && !item.product_id) {
        state.products = [item, ...state.products.concat()];
      } else {
        state.products = tree.insert(item, state.products.concat());
      }
    },
    remove: (state, action) => {
      const item = action.payload;
      state.products = tree.remove(item, state.products);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(treeAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(treeAsync.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      });
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
