import React from 'react';
import { Alert, Button, Image, ScrollView, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native'

const logo = require("../images/play_button.jpg");

function VideoGallery({ navigation }) {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.itemContainer}><Pressable style={[styles.item, styles.roundedEdges]} onPress={() => {navigation.navigate("VideoPlayer")}}><Image source={logo} style={styles.image}></Image></Pressable><Text style={styles.name}>Child{"\n"}</Text></View>
        <View style={styles.itemContainer}><Pressable style={[styles.item, styles.roundedEdges]} onPress={() => {navigation.navigate("VideoPlayer")}}><Image source={logo} style={styles.image}></Image></Pressable><Text style={styles.name}>Adult{"\n"}</Text></View>
        <View style={styles.itemContainer}><Pressable style={[styles.item, styles.roundedEdges]} onPress={() => {navigation.navigate("VideoPlayer")}}><Image source={logo} style={styles.image}></Image></Pressable><Text style={styles.name}>Transition{"\n"}</Text></View>
      </View>
    </ScrollView>
)};

const styles = StyleSheet.create({
  image : {
    height : 150,
    width: '100%',
  },
  sampleImage : {
    height : 100,
    width: 100,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
  },
  itemContainer: {
    width: '100%',
    height: '100px',
  },
  item: {
    backgroundColor: '#EEEEEE',
    height: '100px',
    overflow: "hidden",
  },
  name: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 0,
  },
  roundedEdges: {
    borderRadius: 30,
  },
});

export default VideoGallery;