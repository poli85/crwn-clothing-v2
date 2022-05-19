import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "./utils/firebase/firebase.utils";
import { useDispatch } from "react-redux";
import { USER_ACTION_TYPES } from "./store/user/user.types";

const App = () => {
  // Passa l'azione al redux store, il quale la passa a tutti i reducers 
  const dispatch = useDispatch();
  // Configura l'utente corrente ad ogni signin/signup e lo resetta al signout tramite unsubscribe
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user});
    });
    return unsubscribe;
  }, [dispatch])

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />}></Route>
        <Route path="auth" element={<Authentication />}></Route>
        <Route path="shop/*" element={<Shop />}></Route>
        <Route path="checkout" element={<Checkout />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
