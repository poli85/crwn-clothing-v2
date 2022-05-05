import { createContext, useEffect, useState } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

// Assegna il valore iniziale
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null
});

/**
 * "children" rappresenta i componenti che verranno innestati nel Provider,
 * permettendo a questi di accedere al "value" (in questo caso il currentUser ed il suo setter)  
*/
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, [])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}