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
<<<<<<< HEAD
import AgeCategories from "./AgeCategories";
import SubCategories from "./SubCategories";

import DeleteCategory  from "./DeleteCategory";


=======

import AgeCategories from "./AgeCategories";
import SubCategories from "./SubCategories";

>>>>>>> a0026f6 (ignore)
import AuthContext, { AuthProvider } from "../context/authContext";
import { UserDataProvider } from "../context/userContext";
import { CategoryProvider } from "../context/categoryContext";
import ManageVideos from "./ManageVideos";
<<<<<<< HEAD
import AgeClassification from "./AgeClassification";
=======
>>>>>>> a0026f6 (ignore)

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
<<<<<<< HEAD
                          name="AgeClassification"
                          component={AgeClassification}
                          options={{ title: "Age Classification" }}
                        />

                        <Stack.Screen
=======
>>>>>>> a0026f6 (ignore)
                          name="ManageVideos"
                          component={ManageVideos}
                          options={{ title: "Manage Videos" }}
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
<<<<<<< HEAD
    
=======
>>>>>>> a0026f6 (ignore)
                        <Stack.Screen
                          name="NewCategory"
                          component={NewCategoryScreen}
                          options={{ title: "New Video Category" }}
                        />
<<<<<<< HEAD
                    
                        <Stack.Screen
                          name="DeleteCategory"
                          component={DeleteCategory}
                          options={{ title: "Delete Category" }}
                        />
=======
>>>>>>> a0026f6 (ignore)
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
                          name="AgeCategories"
                          component={AgeCategories}
                          options={{ title: "Age Categories" }}
                        />
                        <Stack.Screen
                          name="SubCategories"
                          component={SubCategories}
                          options={{ title: "Subcategories" }}
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
