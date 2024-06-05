import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Video from "react-native-video";
import Orientation from "react-native-orientation-locker";

const VideoPlayerScreen = () => {
  const videoRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

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
        <Video
          ref={videoRef}
          source={require("../videos/1084218295-preview.mp4")} // Adjust the path to your video file
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
