// DoctorContext.js
import React, { createContext, useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorsCollection = firestore().collection("Doctors");
        const snapshot = await doctorsCollection.get();
        if (!snapshot.empty) {
          const doctorsList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log("Fetched doctors:", doctorsList);
          setDoctors(doctorsList);
        } else {
          console.log("No doctors found in Firestore.");
        }
      } catch (error) {
        console.error("Error fetching doctors: ", error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <DoctorContext.Provider value={{ doctors }}>
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorContext;
