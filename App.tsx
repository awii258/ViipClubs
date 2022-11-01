import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from "./src/Screens/LoginScreen/LoginScreen"
import {Provider as AuthProvider} from "../viiip/src/Context/Actions"
import AuthNavigation from './src/Navigation/AuthNavigation';
import MainNavigation from "../vip/src/Navigation/AuthNavigation"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import { useFonts } from "expo-font";

import AppLoading from "expo-app-loading";

export default function App() {
  // usePreventScreenCapture()
  const [loaded] = useFonts({
    OpenSansRegular: require("./assets/fonts/OpenSans-Regular.ttf"),
    BaskervilleRegular: require("./assets/fonts/Baskervville-Regular.ttf"),
   
   // OpenSansBold: require("./assets/fonts/OpenSansBold.ttf")
  });
  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <>
    <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#080402" translucent = {true}/>
    <AuthProvider>
     <AuthNavigation route={undefined} ></AuthNavigation>
    </AuthProvider>
    </>
  //  <MainNavigation></MainNavigation>
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
