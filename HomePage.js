import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const HomePage = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'black' : 'white',
    flex: 1,
    padding: 20, // Adjusted padding
    marginTop: -7,
  };

  const textStyle = {
    color: isDarkMode ? 'white' : 'black',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  };

  const navigationText = {
    color: isDarkMode ? 'white' : 'black',
    fontSize: 18,
    textAlign: 'center',
    
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={backgroundStyle}>
        <View style={{ alignItems: 'center', marginBottom: 9 }}>
          <Image
            source={{ uri: 'file:///Users/bradiefuentes/internship/image2.png' }}
            style={{ width: 380, height: 80 }}
          />
        </View>
        {[0, 1, 2, 3].map((index) => (
          <View key={index} style={{ marginBottom: 20, width: '100%' }}>
            
            <Image
              source={{
                uri:
                  index === 0
                    ? 'file:///Users/bradiefuentes/internship/box2.png'
                    : index === 1
                    ? 'file:///Users/bradiefuentes/internship/box1.png'
                    : index === 2
                    ? 'file:///Users/bradiefuentes/internship/box3.png'
                    : 'file:///Users/bradiefuentes/internship/box4.png',
              }}
              style={[styles.navigationImage, styles.roundedEdges]} // Apply roundedEdges style
            />
            <View style={{ marginTop: -18, alignItems: 'center', width: '100%' }}>
              <Text style={navigationText}>
                {index === 0
                  ? 'Video Gallery'
                  : index === 1
                  ? 'Edit Personal Detail'
                  : index === 2
                  ? 'Notifications'
                  : 'Contact'}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  navigationImage: {
    width: 200,
    height: 95,
    alignSelf: 'center',
    marginBottom: 20,
  },
  roundedEdges: {
    borderRadius: 10,
  },
});

export default HomePage;