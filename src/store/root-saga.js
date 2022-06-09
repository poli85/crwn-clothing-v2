import { all, call } from 'redux-saga/effects'
import { categoriesSaga } from './categories/categories.saga';

// L'asterisco indica una Generator Function
export function* rootSaga() {
  yield all([call(categoriesSaga)]);
}