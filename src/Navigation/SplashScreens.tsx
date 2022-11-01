import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import First from '../Screens/SplashScreen/First'
import Second from '../Screens/SplashScreen/Second'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
const SplashScreens = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
   
        <Stack.Screen
          name="First"
          component={First}
          options={{ headerShown: false }}
        />
    
        {/* <Stack.Screen
          name="Second"
          component={Second}
          options={{
            // headerStyle: styles.header,
            headerShown: false,
            title: "Clubs",
            headerTintColor: "#927E5A",
            headerTitleAlign: "center",
            headerTitleStyle: { color: "#927E5A" },
            headerStyle: {
              backgroundColor: "#080402",
            },
          }}
        /> */}
  
    </Stack.Navigator>
  );
}

export default SplashScreens

const styles = StyleSheet.create({})