// CategoryContext.js
import React, { createContext, useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const agegroup = ["Adult", "Child and Peds", "Transition"];
      const categoriesCollectionPSUref = firestore()
        .collection("Categories")
        .doc("PSU Heart Information");
      const categoriesCollectionCHDref = firestore()
        .collection("Categories")
        .doc("CHD Educational Videos");

      let dataDict = {
        psu: {},
        chd: {},
      };

      for (const age of agegroup) {
        const categoryPSU = await categoriesCollectionPSUref
          .collection(age)
          .get();
        const categoryCHD = await categoriesCollectionCHDref
          .collection(age)
          .get();

        const PSUdocs = categoryPSU.docs.map((doc) => doc.id);
        const CHDdocs = categoryCHD.docs.map((doc) => doc.id);

        dataDict.psu[age.toLowerCase()] = PSUdocs;
        dataDict.chd[age.toLowerCase()] = CHDdocs;
      }

      setCategories(dataDict);
    };

    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext;
