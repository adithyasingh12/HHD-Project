import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import NotificationsScreen from './NotificationsScreen'; // Adjust the path if your NotificationsScreen is in a different folder

export default function App() {
  return (
    <View style={styles.container}>
      <NotificationsScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});