import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { CATEGORIES_ACTION_TYPES } from "../../store/categories/categories.types";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import "./shop.styles.scss";

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // le async function in useEffect vanno utilizzate cosí
    const getCategoriesMap = async () => {
      const categories = await getCategoriesAndDocuments();
      dispatch({type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES, payload: categories});
    }
    getCategoriesMap();
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />}></Route>
      <Route path=":category" element={<Category />}></Route>
    </Routes>
  )
}

export default Shop;