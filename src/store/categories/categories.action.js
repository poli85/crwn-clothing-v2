import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { CATEGORIES_ACTION_TYPES } from "./categories.types";

export const getCategoriesMap = async (dispatch) => {
  dispatch({type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START});
  try {
    const categories = await getCategoriesAndDocuments();
    dispatch({type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, payload: categories});
  } catch(error) {
    dispatch({type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, payload: error});
  }
}