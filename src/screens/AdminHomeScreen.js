import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const AdminHomeScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={require("../images/logo.png")} style={styles.logo} />
      </View>
      <View style={styles.optionContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="add-circle-outline" size={60} color="white" />
        </TouchableOpacity>
        <Text style={styles.optionText}>Add New Video</Text>
      </View>
      <View style={styles.optionContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="add-circle-outline" size={60} color="white" />
        </TouchableOpacity>
        <Text style={styles.optionText}>Send Notification</Text>
      </View>
      <View style={styles.optionContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="add-circle-outline" size={60} color="white" />
        </TouchableOpacity>
        <Text style={styles.optionText}>Create New Category</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 40,
  },
  header: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 320,
    height: 160,
    resizeMode: 'contain',
  },
  optionContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  iconButton: {
    width: width * 0.7,
    height: 80,
    backgroundColor: '#dde6eb',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AdminHomeScreen;