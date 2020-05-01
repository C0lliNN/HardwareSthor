import { ADD_PRODUCT, REMOVE_PRODUCT, CLEAR_CART } from "./actionsTypes";

export const addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    product: product,
  };
};

export const removeProduct = (product) => {
  return {
    type: REMOVE_PRODUCT,
    product: product,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};
