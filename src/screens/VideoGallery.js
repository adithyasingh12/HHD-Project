import React from 'react';
import { Alert, Button, Image, ScrollView, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native'

const logo = require("../images/play_button.jpg");

function VideoGallery({ navigation }) {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.itemContainer}><View style={[styles.item, styles.roundedEdges]}><Image source={logo} style={styles.image}></Image></View><Text style={styles.name}>Category 1{"\n"}</Text></View>
        <View style={styles.itemContainer}><View style={[styles.item, styles.roundedEdges]}><Image source={logo} style={styles.image}></Image></View><Text style={styles.name}>Category 2{"\n"}</Text></View>
        <View style={styles.itemContainer}><View style={[styles.item, styles.roundedEdges]}><Image source={logo} style={styles.image}></Image></View><Text style={styles.name}>Category 3{"\n"}</Text></View>
        <View style={styles.itemContainer}><View style={[styles.item, styles.roundedEdges]}><Image source={logo} style={styles.image}></Image></View><Text style={styles.name}>Category 4{"\n"}</Text></View>
        <View style={styles.itemContainer}><View style={[styles.item, styles.roundedEdges]}><Image source={logo} style={styles.image}></Image></View><Text style={styles.name}>Category 5{"\n"}</Text></View>
        <View style={styles.itemContainer}><View style={[styles.item, styles.roundedEdges]}><Image source={logo} style={styles.image}></Image></View><Text style={styles.name}>Category 6{"\n"}</Text></View>
        <View style={styles.itemContainer}><View style={[styles.item, styles.roundedEdges]}><Image source={logo} style={styles.image}></Image></View><Text style={styles.name}>Category 7{"\n"}</Text></View>
        <View style={styles.itemContainer}><View style={[styles.item, styles.roundedEdges]}><Image source={logo} style={styles.image}></Image></View><Text style={styles.name}>Category 8{"\n"}</Text></View>
        <View style={styles.itemContainer}><View style={[styles.item, styles.roundedEdges]}><Image source={logo} style={styles.image}></Image></View><Text style={styles.name}>Category 9{"\n"}</Text></View>
        <View style={styles.itemContainer}><View style={[styles.item, styles.roundedEdges]}><Image source={logo} style={styles.image}></Image></View><Text style={styles.name}>Category 10{"\n"}</Text></View>
        <View style={styles.itemContainer}><View style={[styles.item, styles.roundedEdges]}><Image source={logo} style={styles.image}></Image></View><Text style={styles.name}>Category 11{"\n"}</Text></View>
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
    width: '50%',
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