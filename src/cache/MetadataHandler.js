// MetadataHandler.js
import RNFS from "react-native-fs";
import AsyncStorage from "@react-native-async-storage/async-storage";

const METADATA_KEY_PREFIX = "video_metadata_";

export const getVideoMetadata = async (videoId) => {
  try {
    const metadata = await AsyncStorage.getItem(METADATA_KEY_PREFIX + videoId);
    return metadata ? JSON.parse(metadata) : null;
  } catch (error) {
    console.error("Failed to get video metadata:", error);
    return null;
  }
};

export const saveVideoMetadata = async (videoId, path) => {
  try {
    const metadata = { path, timestamp: new Date().toISOString() };
    await AsyncStorage.setItem(
      METADATA_KEY_PREFIX + videoId,
      JSON.stringify(metadata)
    );
  } catch (error) {
    console.error("Failed to save video metadata:", error);
  }
};
