import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../../entities/product/model/Product.js';

export interface ProductFormState {
  isOpen: boolean;
  data: Product | null;
  action: 'edit' | 'create' | null;
}

const initialState: ProductFormState = {
  isOpen: false,
  data: null,
  action: null,
};

export const productFormSlice = createSlice({
  name: 'productForm',
  initialState,
  reducers: {
    openForm: (state, action: PayloadAction<{ action: 'edit' | 'create'; data?: Product }>) => {
      const { action: formAction, data } = action.payload;
      state.isOpen = true;
      state.action = formAction;
      state.data = data || null;
    },
    closeForm: (state) => {
      state.isOpen = false;
      state.data = null;
      state.action = null;
    },
  },
});

export const { openForm, closeForm } = productFormSlice.actions;
export default productFormSlice.reducer;
