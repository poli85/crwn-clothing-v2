import { createContext, useEffect, useState } from "react";
import { getCategoriesAndDocuments, addCollectionAndDocuments } from "../utils/firebase/firebase.utils";
import SHOP_DATA from "../shop-data";

export const CategoriesContext = createContext({
  categoriesMap: {}
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  // Decommentare in caso di scomparsa delle categories su firebase
  /* useEffect(() => {
    addCollectionAndDocuments('categories', SHOP_DATA, 'title');
  }, []); */

  useEffect(() => {
    // le async function in useEffect vanno utilizzate cosí
    const getCategoryMap = async () => {
       const categoryMap = await getCategoriesAndDocuments();
       setCategoriesMap(categoryMap);
    }
    console.log(categoriesMap);
    getCategoryMap();
  }, [])
  const value = {categoriesMap};

  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}