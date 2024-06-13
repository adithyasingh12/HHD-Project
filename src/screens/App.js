import { StatusBar } from "expo-status-bar";

import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import EditDetails from "./EditDetails";
import Login from "./Login";
import Register1 from "./Register1";
import Register2 from "./Register2";
import HomePage from "./HomePage";
import NotificationsScreen from "./NotificationsScreen";
import AddVideo from "./AddVideo";
import VideoGallery from "./VideoGallery";

import VideoPlayerScreen from "./VideoPlayer";

import AdminHomeScreen from "./AdminHomeScreen";
import AdminNotification from "./AdminNotification";
import NewCategoryScreen from "./NewCategoryScreen";
import ContactInfoScreen from "./ContactInfoScreen";

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        {/* <Stack.Screen
          name="Contact"
          component={ContactInfoScreen}
          options={{ title: "Contact Info" }}
        /> */}
        <Stack.Screen
          name="Register1"
          component={Register1}
          options={{ title: "Register" }}
        />

        {/* <Stack.Screen
          name="NewCategory"
          component={NewCategoryScreen}
          options={{ title: "New Category" }}
        /> */}
        {/* <Stack.Screen
          name="AdminScreen"
          component={AdminHomeScreen}
          options={{ title: "Admin Home" }}
        /> */}


        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="AdminHome"
          component={AdminHomeScreen}
          options={{ title: "Admin Home" }}
        />
        <Stack.Screen
          name="Register1"
          component={Register1}
          options={{ title: "Register" }}
        />
        <Stack.Screen
          name="Register2"
          component={Register2}
          options={{ title: "Register" }}
        />
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ title: "Home Page" }}
        />
        <Stack.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{ title: "Notifications" }}
        />
        <Stack.Screen
          name="Contact"
          component={ContactInfoScreen}
          options={{ title: "Contact Info" }}
        />
        <Stack.Screen
          name="VideoGallery"
          component={VideoGallery}
          options={{ title: "Video Gallery" }}
        />
        <Stack.Screen
          name="VideoPlayer"
          component={VideoPlayerScreen}
          options={{ title: "Video Player" }}
        />
        <Stack.Screen
          name="EditDetails"
          component={EditDetails}
          options={{ title: "Edit Details" }}
        />
        <Stack.Screen
          name="AdminNotifications"
          component={AdminNotification}
          options={{ title: "Admin Notifications" }}
        />
        <Stack.Screen
          name="NewCategory"
          component={NewCategoryScreen}
          options={{ title: "New Category" }}
        />
        <Stack.Screen
          name="AddVideo"
          component={AddVideo}
          options={{ title: "Add Video" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
