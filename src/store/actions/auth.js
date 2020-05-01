import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  LOGIN_IN_CHECKOUT,
} from "./actionsTypes";

const EXPIRES_IN = "expiresIn";
const USER_ID = "userId";
const TOKEN = "token";

const loginStart = () => {
  return {
    type: LOGIN_START,
  };
};

const loginSuccess = (data) => {
  localStorage.setItem(TOKEN, data.idToken);
  localStorage.setItem(USER_ID, data.localId);
  localStorage.setItem(EXPIRES_IN, data.expiresIn);

  return {
    type: LOGIN_SUCCESS,
    data: data,
  };
};

const loginFail = (error) => {
  return {
    type: LOGIN_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem(EXPIRES_IN);
  localStorage.removeItem(TOKEN);
  localStorage.removeItem(USER_ID);

  return {
    type: LOGOUT,
  };
};

export const loginHandler = (data) => {
  return (dispatch) => {
    dispatch(loginStart());

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAzRW-Rphip32DKnRhNGIDbr16e1nGddqQ",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          returnSecureToken: true,
        }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.error) {
          dispatch(loginFail(response.error));
        } else {
          const expiresIn = new Date();
          expiresIn.setHours(expiresIn.getHours() + 1);
          dispatch(
            loginSuccess({
              ...response,
              expiresIn: expiresIn,
            })
          );
          dispatch(checkTimeout(expiresIn - new Date()));
        }
      })
      .catch((error) => {
        dispatch(loginFail(error));
      });
  };
};

export const checkout = () => {
  return {
    type: LOGIN_IN_CHECKOUT,
  };
};

export const checkAuth = () => {
  return (dispatch) => {
    const expiresInDate = new Date(localStorage.getItem(EXPIRES_IN));
    const currentDate = new Date();

    const difference = expiresInDate - currentDate;

    if (difference < 0) {
      dispatch(logout());
    } else {
      dispatch(
        loginSuccess({
          expiresIn: expiresInDate,
          idToken: localStorage.getItem(TOKEN),
          localId: localStorage.getItem(USER_ID),
        })
      );
      dispatch(checkTimeout(difference));
    }
  };
};

export const checkTimeout = (timeout) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, timeout);
  };
};
