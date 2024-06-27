// CacheHandler.js
import RNFS from "react-native-fs";
import AsyncStorage from "@react-native-async-storage/async-storage";

const METADATA_KEY_PREFIX = "video_metadata_";

export const deleteCachedVideo = async (videoId) => {
  try {
    const metadata = await AsyncStorage.getItem(METADATA_KEY_PREFIX + videoId);
    if (metadata) {
      const { path } = JSON.parse(metadata);
      if (await RNFS.exists(path)) {
        await RNFS.unlink(path);
        console.log(`Deleted cached video at path: ${path}`);
      }
      await AsyncStorage.removeItem(METADATA_KEY_PREFIX + videoId);
      console.log(`Deleted metadata for video ID: ${videoId}`);
    }
  } catch (error) {
    console.error("Failed to delete cached video:", error);
  }
};
