import React, { createContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async (uid) => {
      try {
        const userDoc = await firestore().collection('UserPost').doc(uid).get();
        if (userDoc.exists) {
          setUser({ uid, ...userDoc.data() });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    const currentUser = auth().currentUser;
    if (currentUser) {
      fetchUserData(currentUser.uid);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {!loading && children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
