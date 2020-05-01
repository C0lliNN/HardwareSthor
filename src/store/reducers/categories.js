import {
  GET_CATEGORIES_START,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
} from "../actions/actionsTypes";

const initialState = {
  isLoading: false,
  error: null,
  categories: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES_START:
      return {
        ...state,
        isLoading: true,
      };
    case GET_CATEGORIES_SUCCESS:
      return {
        isLoading: false,
        categories: action.data,
        error: null,
      };
    case GET_CATEGORIES_FAILURE:
      return {
        isLoading: false,
        categories: [],
        error: action.error,
      };

    default:
      return state;
  }
};

export default reducer;
