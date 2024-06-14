// UserDataContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import firestore from "@react-native-firebase/firestore";
import AuthContext from "./authContext";

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      const unsubscribe = firestore()
        .collection("UserPost")
        .doc(user.uid)
        .onSnapshot((documentSnapshot) => {
          setUserData(documentSnapshot.data());
        });

      // Clean up the subscription on unmount
      return () => unsubscribe();
    }
  }, [user]);

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContext;
