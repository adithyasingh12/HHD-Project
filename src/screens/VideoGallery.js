import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Image,
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import firestore from "@react-native-firebase/firestore";

const logo = require("../images/play_button.jpg");

const VideoGallery = ({ route, navigation }) => {
  const [videoPosts, setVideoPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { type, age, subCategory } = route.params;

  useEffect(() => {
    const fetchVideoPosts = async () => {
      try {
        let ptype =
          type === "psu" ? "PSU Heart Information" : "CHD Educational Videos";
        let agegroup;

        if (age === "adult") {
          agegroup = "Adult";
        } else if (age === "transition") {
          agegroup = "Transition";
        } else {
          agegroup = "Child and Peds";
        }

        const snapshot = await firestore()
          .collection("Categories")
          .doc(ptype)
          .collection(agegroup)
          .doc(subCategory)
          .collection("VideoPost")
          .get();

        const videos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log(videos);

        setVideoPosts(videos);
        console.log(videoPosts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching video posts: ", error);
        setLoading(false);
      }
    };

    fetchVideoPosts();
  }, [type, age, subCategory]);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {videoPosts.map((video, index) => (
        <View key={index} style={styles.itemContainer}>
          <Pressable
            style={[styles.item, styles.roundedEdges]}
            onPress={() => {
              navigation.navigate("VideoPlayer", {
                url: video.url, // Assuming you have a 'url' field in your video post
                title: video.name, // Changed to video.title
                description: video.desc, // Changed to video.description
              });
            }}
          >
            <Image
              source={{ uri: video.thumbnail || logo }}
              style={styles.image}
            />
          </Pressable>
          <Text style={styles.name}>{video.title}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: "100%",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-start",
  },
  itemContainer: {
    width: "100%",
    height: 150,
    marginVertical: 10,
  },
  item: {
    backgroundColor: "#000",
    height: 150,
    overflow: "hidden",
  },
  name: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 5,
  },
  roundedEdges: {
    borderRadius: 30,
  },
});

export default VideoGallery;
