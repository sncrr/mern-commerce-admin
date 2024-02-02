import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../models/Product";

export interface ProductState {
  fetching: boolean;
  products: Array<Product>;
  totalPages: number;
  hasChanges: boolean;
  error: string;
  data: any;
}

const initialState = {
  fetching: true,
  products: new Array<Product>(),
  totalPages: 1,
  hasChanges: true,
  data: null,
  error: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    //Fetch
    fetchProducts: (state, action) => ({
      ...state,
      fetching: !!action,
    }),
    fetchProductsSuccess: (state, action) => ({
      ...state,
      fetching: false,
      hasChanges: false,
      products: action.payload.data,
      totalPages: action.payload.totalPages,
    }),
    fetchProductsFailed: (state, action) => ({
      ...state,
      fetching: false,
      error: action.payload,
    }),

    //Save
    saveProduct: (state, action) => ({
      ...state,
      fetching: !!action.type,
    }),
    saveProductSuccess: (state, action) => ({
      ...state,
      fetching: false,
      hasChanges: true,
      data: action.payload,
    }),
    saveProductFailed: (state, action) => ({
      ...state,
      fetching: false,
      error: action.payload,
    }),

    //Delete
    deleteProduct: (state, action) => ({
      ...state,
      fetching: !!action.type,
    }),
    deleteProductSuccess: (state, action) => ({
      ...state,
      fetching: false,
      hasChanges: true,
      data: action.payload,
    }),
    deleteProductFailed: (state, action) => ({
      ...state,
      fetching: false,
      error: action.payload,
    }),
  },
});

export const {
  fetchProducts,
  fetchProductsSuccess,
  fetchProductsFailed,

  saveProduct,
  saveProductSuccess,
  saveProductFailed,

  deleteProduct,
  deleteProductSuccess,
  deleteProductFailed,
} = productSlice.actions;

export const actionTypes = {
  fetchProducts: "product/fetchProducts",
  saveProduct: "product/saveProduct",
  deleteProduct: "product/deleteProduct",
};

export const ProductActions = productSlice.actions;
export default productSlice;
