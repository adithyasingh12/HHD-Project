import React from 'react';
import { Alert, Button, Image, ScrollView, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native'


{/* <Pressable
style={styles.button}
onPress={() => {
  navigation.navigate("Videos");
}}
>
<Text style={styles.buttonText}>Login</Text>
</Pressable> */}

{/* <Stack.Screen
  name="Videos"
  component={VideoGallery}
  options={{ title: "Videos" }}
/> */}

const logo = require("../images/play_button.jpg");

function VideoGallery({ navigation }) {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.itemContainer}><View style={styles.item}><Image source={logo}></Image><Text style={styles.name}>Category 1</Text></View></View>
        <View style={styles.itemContainer}><View style={styles.item}><Image source={logo}></Image><Text style={styles.name}>Category 2</Text></View></View>
        <View style={styles.itemContainer}><View style={styles.item}><Image source={logo}></Image><Text style={styles.name}>Category 3</Text></View></View>
        <View style={styles.itemContainer}><View style={styles.item}><Image source={logo}></Image><Text style={styles.name}>Category 4</Text></View></View>
        <View style={styles.itemContainer}><View style={styles.item}><Image source={logo}></Image><Text style={styles.name}>Category 5</Text></View></View>
        <View style={styles.itemContainer}><View style={styles.item}><Image source={logo}></Image><Text style={styles.name}>Category 6</Text></View></View>
        <View style={styles.itemContainer}><View style={styles.item}><Image source={logo}></Image><Text style={styles.name}>Category 7</Text></View></View>
        <View style={styles.itemContainer}><View style={styles.item}><Image source={logo}></Image><Text style={styles.name}>Category 8</Text></View></View>
        <View style={styles.itemContainer}><View style={styles.item}><Image source={logo}></Image><Text style={styles.name}>Category 9</Text></View></View>
        <View style={styles.itemContainer}><View style={styles.item}><Image source={logo}></Image><Text style={styles.name}>Category 10</Text></View></View>
        <View style={styles.itemContainer}><View style={styles.item}><Image source={logo}></Image><Text style={styles.name}>Category 11</Text></View></View>
      </View> 
    </ScrollView>
)};

const styles = StyleSheet.create({
  image : {
    height : 160,
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
    padding: '8px',
    margin: '8px',
    backgroundColor: '#EEEEEE',
    height: "calc(100% - 8px)",
  },
  name: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 0,
  }
});

export default VideoGallery;