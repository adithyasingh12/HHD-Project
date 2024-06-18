import storage from '@react-native-firebase/storage';
import RNFS from 'react-native-fs';

export const downloadVideo = async (videoUrl, localFileName) => {
  try {
    const storageRef = storage().refFromURL(videoUrl);
    const downloadUrl = await storageRef.getDownloadURL();
    const localFilePath = `${RNFS.DocumentDirectoryPath}/${localFileName}`;

    const result = await RNFS.downloadFile({
      fromUrl: downloadUrl,
      toFile: localFilePath,
    }).promise;

    if (result.statusCode === 200) {
      console.log('Video downloaded successfully:', localFilePath);
      return localFilePath;
    } else {
      throw new Error('Failed to download video');
    }
  } catch (error) {
    console.error('Error downloading video:', error);
    console.log(`${RNFS.DocumentDirectoryPath}`);
    return null;
  }
};
