import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const NotificationsScreen = (navigation) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={require("../images/logo.png")} style={styles.logo} />
      </View>
      <View style={styles.notificationsContainer}>
        <Text style={styles.title}>Notifications</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Text style={styles.buttonText}>Research Study 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationButton}>
          <Text style={styles.buttonText}>Post-Op Check-In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationButton}>
          <Text style={styles.buttonText}>Research Study 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationButton}>
          <Text style={styles.buttonText}>Welcome to the CHC App!</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.homeIcon}>
          <MaterialIcons name="home" size={28} color="black" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: 40,
  },
  header: {
    height: 60, // Set a fixed height for the header
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  logo: {
    width: 320,
    height: 160,
    resizeMode: "contain",
  },
  notificationsContainer: {
    width: width * 0.9,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    marginVertical: 20, // Add margin to ensure rounded corners are visible
    marginHorizontal: 20, // Ensure there is space on the sides of the container
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  notificationButton: {
    width: "100%",
    paddingVertical: 15,
    backgroundColor: "#001f54",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  homeIcon: {
    position: "absolute",
    top: 20,
    right: 20,
  },
});

export default NotificationsScreen;
