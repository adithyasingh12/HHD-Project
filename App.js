import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer} from '@react-navigation/native';
import EditDetails from './EditDetails';

const Stack = createNativeStackNavigator();
const App = () => {  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="EditDetails"
          component={EditDetails}
          options={{title: 'Edit Details'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );  
}  

export default App;
