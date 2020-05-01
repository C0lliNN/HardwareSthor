import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  LOGIN_IN_CHECKOUT,
} from "../actions/actionsTypes";

const initialState = {
  token: null,
  userId: null,
  isLoading: false,
  isInCheckout: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        token: action.data.idToken,
        userId: action.data.localId,
        isLoading: false,
      };
    }
    case LOGIN_FAIL: {
      const errorMessage = action.error.message
        ? action.error.message
        : action.error;
      return {
        ...state,
        error: errorMessage,
        isLoading: false,
      };
    }
    case LOGOUT: {
      return initialState;
    }

    case LOGIN_IN_CHECKOUT: {
      return {
        ...state,
        isInCheckout: true,
      };
    }

    default:
      return state;
  }
};

export default reducer;
