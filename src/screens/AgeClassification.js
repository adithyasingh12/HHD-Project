import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { fetchUserData } from "../services/firebasefirestore";

const AgeClassification = () => {
  const [userData, setUserData] = useState([]);

  const handleFetchUserData = async () => {
    try {
      const data = await fetchUserData();
      setUserData(data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch user data. Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleFetchUserData}>
        <Text style={styles.buttonText}>Fetch User Data</Text>
      </TouchableOpacity>
      {userData.length > 0 && (
        <View style={styles.dataContainer}>
          {userData.map((user) => (
            <View key={user.id} style={styles.userCard}>
              <Text style={styles.userText}>ID: {user.id}</Text>
              <Text style={styles.userText}>Name: {user.first_name} {user.last_name}</Text>
              <Text style={styles.userText}>Diagnosis: {user.diagnosis}</Text>
              <Text style={styles.userText}>DOB: {user.dob}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
    alignItems: "center",
    padding: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  dataContainer: {
    marginTop: 20,
    width: "100%",
  },
  userCard: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  userText: {
    fontSize: 16,
  },
});

export default AgeClassification;