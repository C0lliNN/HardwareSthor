import {
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  CLEAR_CART,
} from "../actions/actionsTypes";

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT: {
      return state.concat(action.product);
    }

    case REMOVE_PRODUCT: {
      return state.filter((product) => product.id !== action.product.id);
    }

    case CLEAR_CART: {
      return [];
    }

    default:
      return state;
  }
};

export default reducer;
