import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../Screens/LoginScreen/LoginScreen";
import { Context as Action } from "../Context/Actions";
import Tabs from "./Tabs";
import Actions from "../Screens/TabsScreen/Action";
import ProfileScreen from "../Screens/ProfileScreen";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createNativeStackNavigator();

export default function AuthNavigation() {
  const { state, restoreToken, access_token, onClub, LoadToken } =
    React.useContext(Action);

  const [token, setToken] = useState(null);

  const [stateToken, setStateToken] = useState(state.token);

  const navigation = useNavigation();

  // console.log()
  const getToken = async () => {
    let token = null;
    try {
      token = await AsyncStorage.getItem("token");
      // console.log("TOKEN VALUE >>>>>>>>>>>>", token);
      if (token) {
        // navigation.navigate("Dull");
        // console.log("you are already loged in >>>>>>>>>>>>");
        setToken(token);
      } else {
        setToken(null);
      }
    } catch (error) {
      setToken(null);
      console.log("Error getting token >>>>>>>>>", error);
    }
  };

  useEffect(() => {
    LoadToken();

  }, []);

  // useEffect(()=>{
  //   console.log("State.token value >>>>>>>>>>", state.token)
  //   if(state.token == null){
  //     console.log("inside state.token == null")
  //     setToken(null)
  //   }
  // },[state.token])

  // useEffect(() => {
  //   console.log("StateToken Changed >>>>>>>>>>>>", stateToken);
  //   if (stateToken == null) {
  //     setToken(null);
  //   }
  // }, [stateToken]);

  // console.log("State.token outside >>>>>>>>>>>", state?.token);
  // console.log("state.loadToken >>>>>>>>>>>", state?.loadtoken);
  //   const Gettoken = async() =>{
  //     console.log("inside function get token")
  //  tokens = await AsyncStorage.getItem("token");
  //  console.log("TOKEN VALUE >>>>>>>>>>>>", tokens);
  //     }

  return (
    <Stack.Navigator initialRouteName="Home">
      {state?.loadtoken || state?.token ? (
        <Stack.Screen
          name="Dull"
          component={Tabs}
          options={{
            // headerStyle: styles.header,
            headerShown: false,
            title: "Clubs",
            headerTintColor: "#927E5A",
            headerTitleAlign: "center",
            headerTitleStyle: {
              color: "#927E5A",
              fontFamily: "BaskervilleRegular",
            },
            headerStyle: {
              backgroundColor: "#080402",
            },
          }}
        />
      ) : (
        <Stack.Screen
          name="Home"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}
