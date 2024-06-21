import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "react-native";
import auth from "@react-native-firebase/auth";

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
import VideoHome from "./VideoHome";
import NewCategoryScreen from "./NewCategoryScreen";
import ContactInfoScreen from "./ContactInfoScreen";
import AdminManageNotifications from "./AdminManageNotifications";
import GlobalAgeCategories from "./GlobalAgeCategories";
import PennAgeCategories from "./PennAgeCategories";
import SubCategories from "./SubCategories";



import AuthContext, { AuthProvider } from "../context/authContext";
import { UserDataProvider } from "../context/userContext";
import { CategoryProvider } from "../context/categoryContext";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <UserDataProvider>
        <CategoryProvider>
          <NavigationContainer>
            <AuthContext.Consumer>
              {({ user, setUser }) => {
                const handleLogout = async () => {
                  try {
                    await auth().signOut();
                    setUser(null);
                  } catch (error) {
                    console.error(error);
                  }
                };

                const isAdmin = user?.uid === "DMKClrz8iXb0WxVSV64x3J8vj6j1";

                return (
                  <Stack.Navigator>
                    {!user ? (
                      <>
                        <Stack.Screen
                          name="Login"
                          component={Login}
                          options={{ title: "Login" }}
                        />
                        <Stack.Screen
                          name="Register1"
                          component={Register1}
                          options={{ title: "Register1" }}
                        />
                        <Stack.Screen
                          name="Register2"
                          component={Register2}
                          options={{ title: "Register2" }}
                        />
                      </>
                    ) : isAdmin ? (
                      <>
                        <Stack.Screen
                          name="AdminHome"
                          component={AdminHomeScreen}
                          options={{
                            title: "Admin Home",
                            headerRight: () => (
                              <Button onPress={handleLogout} title="Logout" />
                            ),
                          }}
                        />
                        <Stack.Screen
                          name="AdminNotifications"
                          component={AdminNotification}
                          options={{ title: "Admin Notifications" }}
                        />
                        <Stack.Screen
                          name="AdminManageNotifications"
                          component={AdminManageNotifications}
                          options={{ title: "Manage Notifications" }}
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
                      </>
                    ) : (
                      <>
                        <Stack.Screen
                          name="Home"
                          component={HomePage}
                          options={{
                            title: "Home Page",
                            headerRight: () => (
                              <Button onPress={handleLogout} title="Logout" />
                            ),
                          }}
                        />
                        <Stack.Screen
                          name="VideoHome"
                          component={VideoHome}
                          options={{ title: "Video Home" }}
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
                      </>
                    )}
                  </Stack.Navigator>
                );
              }}
            </AuthContext.Consumer>
          </NavigationContainer>
        </CategoryProvider>
      </UserDataProvider>
    </AuthProvider>
  );
};

export default App;
