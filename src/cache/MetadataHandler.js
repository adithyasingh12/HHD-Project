import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveVideoMetadata = async (videoId, filePath) => {
  if (!videoId || !filePath) {
    // console.error('Invalid videoId or filePath', { videoId, filePath });
    return;
  }
  
  try {
    const videoMetadata = { id: videoId, path: filePath };
    await AsyncStorage.setItem(videoId, JSON.stringify(videoMetadata));
    console.log('Video metadata saved:', videoMetadata);
  } catch (error) {
    console.error('Error saving video metadata:', error);
  }
};

export const getVideoMetadata = async (videoId) => {
  if (!videoId) {
    // console.error('Invalid videoId', { videoId });
    return null;
  }
  
  try {
    const videoMetadata = await AsyncStorage.getItem(videoId);
    return videoMetadata ? JSON.parse(videoMetadata) : null;
  } catch (error) {
    console.error('Error retrieving video metadata:', error);
    return null;
  }
};
