import {
  GET_CATEGORIES_START,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
} from "./actionsTypes";

const getCategoriesStart = () => {
  return {
    type: GET_CATEGORIES_START,
  };
};

const getCategoriesSuccess = (categories) => {
  return {
    type: GET_CATEGORIES_SUCCESS,
    data: categories,
  };
};

const getCategoriesFail = (error) => {
  return {
    type: GET_CATEGORIES_FAILURE,
    error: error,
  };
};

export const getCategories = () => {
  return (dispatch) => {
    dispatch(getCategoriesStart());

    fetch(
      "https://firestore.googleapis.com/v1/projects/hardwaresthor/databases/(default)/documents/categories"
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        const categories = response.documents.map((document) => {
          const category = {};
          category["id"] = document.name.split("/").pop();
          category["defaultName"] = document.fields.defaultName.stringValue;
          category["intlId"] = document.fields.intlId.stringValue;

          return category;
        });

        dispatch(getCategoriesSuccess(categories));
      })
      .catch((error) => {
        dispatch(getCategoriesFail(error));
      });
  };
};
