// DownloadVideo.js
import RNFS from "react-native-fs";

export const downloadVideo = async (url, videoId) => {
  const downloadPath = `${RNFS.DocumentDirectoryPath}/${videoId}.mp4`;

  try {
    const { promise } = RNFS.downloadFile({
      fromUrl: url,
      toFile: downloadPath,
    });

    await promise;

    return downloadPath;
  } catch (error) {
    console.error("Failed to download video:", error);
    return null;
  }
};
