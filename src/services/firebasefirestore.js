import firebase from "@react-native-firebase/app";
import firestore from "@react-native-firebase/firestore";
import navigation from 'react-native'
export const addUserData = async (uid, data) => {
  try {
    await firestore().collection("UserPost").doc(uid).set(data);
    console.log("Document successfully written!");
  } catch (error) {
    console.error("Error writing document: ", error);
  }
};

export const addCategoryData = async (categoryData, selectedItems, navigation) => {
  try {
  
    if (selectedItems.length === 0) {
      alert('Please select at least one item.'); 
      return false;
    }
     else {
      if (selectedItems.includes('1')) {
        await firestore().collection("Categories").doc("Child").collection(categoryData.title).add(categoryData);
      }
      if (selectedItems.includes('2')) {
        await firestore().collection("Categories").doc("Adult").collection(categoryData.title).add(categoryData);
      }
      if (selectedItems.includes('3')) {
        await firestore().collection("Categories").doc("Transition").collection(categoryData.title).add(categoryData);
      }
      alert('Category created successfully!'); 
      return true;
    }
  } catch (error) {
    console.error("Error creating category, please try again ", error);
    throw error; 
  }
  
};
