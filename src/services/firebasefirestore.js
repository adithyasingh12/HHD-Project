import firebase from "@react-native-firebase/app";
import firestore from "@react-native-firebase/firestore";

export const addUserData = async (uid, data) => {
  try {
    await firestore().collection("UserPost").doc(uid).set(data);
    console.log("Document successfully written!");
  } catch (error) {
    console.error("Error writing document: ", error);
  }
};

export const updateUserData = async (uid, data) => {
  try {
    await firestore().collection("UserPost").doc(uid).update(data);
    console.log("Document successfully written!");
  } catch (error) {
    console.error("Error writing document: ", error);
  }
};
