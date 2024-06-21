import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import CategoryContext from "../context/categoryContext";

export const uploadVideo = async (localUri, fileName, description, category, thumbnail, videoType, ageGroup) => {
  try {
    const response = await fetch(localUri);
    const blob = await response.blob();

    // Reference to the specific bucket
    const storageRef = storage().refFromURL('gs://chc-app-cd5bd.appspot.com').child(`videos/${fileName}`);
    await storageRef.put(blob);    
      try {
        // Upload completed successfully, now get the download URL
        const downloadURL = await storageRef.getDownloadURL();
        const videoData = {
          name: fileName,
          url: downloadURL,
          timestamp: new Date(),
          desc: description,
          category: category,
          thumbnail: thumbnail,
          videoType: videoType,
          ageGroup: ageGroup
        };

        for(let i = 0; i < category.length; i++){
          const docRef = await firestore()
          .collection('Categories')
          .doc(videoType)
          .collection(ageGroup)
          .doc(category[i])
          .collection("VideoPost")
          .add(videoData);
        }
      } catch (error) {
        console.error('Error saving to Firestore:', error);
      }
  } catch (error) {
    console.error('Error uploading video:', error);
  }
};
