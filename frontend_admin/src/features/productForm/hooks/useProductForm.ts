import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../app/providers/store.js';
import { openForm, closeForm } from '../model/productFormSlice.js';
import type { Product } from '../../../entities/product/model/Product.js';

export const useProductForm = () => {
  const dispatch = useDispatch();
  const { isOpen, data, action } = useSelector(
    (state: RootState) => state.productForm
  );

  return {
    isOpen,
    data,
    action,
    openForm: (action: 'edit' | 'create', data?: Product) =>
      dispatch(openForm({ action, data })),
    closeForm: () => dispatch(closeForm()),
  };
};
