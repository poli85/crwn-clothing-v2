import { createSelector } from "reselect";

const selectCategoryReducer = state => state.categories;

// Memoization
export const selectCategories = createSelector(
  // Input
  [selectCategoryReducer],
  /* Output - La funzione viene eseguita solo quando il valore di "categoriesSlice" 
     (quindi quello dell'Input "selectCategoryReducer") cambia
  */
  categoriesSlice => categoriesSlice.categories
)

export const selectCategoriesMap = createSelector(
  [selectCategories],
  // Eseguita solo al variare del valore ("categories") restituito da "selectCategories"
  categories => {
    return categories.reduce((acc, category) => {
    const {title, items} = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {})}
) 