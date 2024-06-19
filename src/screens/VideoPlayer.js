import React, { useRef, useState, useEffect } from "react";
import RNFS from 'react-native-fs';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Video from "react-native-video";
import Orientation from "react-native-orientation-locker";
import { getVideoMetadata, saveVideoMetadata } from "../cache/MetadataHandler"
import { downloadVideo } from "../cache/DownloadVideo"

const VideoPlayerScreen = ({ videoId, firebaseVideoUrl }) => {
  const videoRef = useRef(null);
  const [videoPath, setVideoPath] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

  
  useEffect(() => {
    //hardcoded placeholders while we wait for videos
    const firebaseVideoUrl = `gs://chc-app-cd5bd.appspot.com/1084218295-preview.mp4`; 
    const videoId = `1084218295-preview.mp4`;
    const localFileName = `1084218295-preview.mp4`; 

    const fetchVideo = async () => {
      setLoading(true);
      const metadata = await getVideoMetadata(videoId);

      if (metadata && RNFS.exists(metadata.path)) {
        setVideoPath(metadata.path);
      } else {
        const downloadedPath = await downloadVideo(firebaseVideoUrl, localFileName);

        if (downloadedPath) {
          await saveVideoMetadata(videoId, downloadedPath);
          setVideoPath(downloadedPath);
        }
      }
      setLoading(false);
    };

    fetchVideo();
  }, [videoId, firebaseVideoUrl]);

  const onEnterFullScreen = () => {
    setIsFullScreen(true);
    Orientation.lockToLandscape();
    StatusBar.setHidden(true);
  };

  const onExitFullScreen = () => {
    setIsFullScreen(false);
    Orientation.lockToPortrait();
    StatusBar.setHidden(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Video Title</Text>

      <View
        style={isFullScreen ? styles.fullScreenVideo : styles.videoContainer}
      >
        {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : videoPath ? (
        <Video
          ref={videoRef}
          source={{ uri: `file://${videoPath}` }} // Adjust the path to your video file
          style={isFullScreen ? styles.fullScreenVideo : styles.video}
          controls={true}
          resizeMode="contain"
          onError={(error) => {
            console.log("Video error:", error);
          }}
          onBuffer={() => {
            console.log("Video buffering...");
          }}
          onFullscreenPlayerWillPresent={onEnterFullScreen}
          onFullscreenPlayerWillDismiss={onExitFullScreen}
        />
      ) : (
        <Text>Failed to load video</Text>
      )}
      </View>
      <Text style={styles.description}>
        This is a description of the video.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,

    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  videoContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  fullScreenVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
    zIndex: 9999,
  },
  video: {
    width: "100%",
    height: "100%",
  },
});

export default VideoPlayerScreen;
