import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import * as React from "react";
import Towns from '../Screens/Towns' ;
import { FontAwesome } from "@expo/vector-icons";
import EventScreen from "../Screens/EventScreen";
import Bars from "../Screens/TabsScreen/Bars";
import Clubs from "../Screens/TabsScreen/Clubs";
import Person from "../Screens/TabsScreen/Person";
import { FontAwesome5 } from "@expo/vector-icons";
import Action from "../Screens/TabsScreen/Action";
import Search from "../Screens/Search";
import Qrcode from "../Screens/Scan/Qrcode";
import { Context as Actions } from "../Context/Actions";
import FavoriteScreen from "../Screens/FavoriteScreen";
import HeaderIcon from "../Components/HeaderIcon";
import Images from "../Screens/Images"

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import TopTab from "../Screens/TopTab"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { color } from "native-base/lib/typescript/theme/styled-system";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  React.useEffect(() => {
    onGetProfile();
    // console.log("hi");
  }, [onGetProfile]);
  const { state, onGetProfile, Logout } = React.useContext(Actions);
  // console.log("...........12346.....>>>>>", state.user);
   const navigation = useNavigation();
  return (
    <Tab.Navigator
      // tabBarOptions={{
      //   keyboardHidesTabBar: true,
      // }}
      

      screenOptions={{
        // keyboardHidesTabBar: true,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#927E5A",
        tabBarInactiveTintColor: "#96A7AF",

        tabBarStyle: {
          position: "absolute",
          //    bottom: 25,
          // marginLeft: 15,
          // marginRight: 15,
          borderTopColor: "#000000",
          backgroundColor: "#000000",
          height: 90,
          justifyContent: "space-evenly",
          alignItems: "center",
        },
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Clubs"
        component={Towns}
        options={{
          tabBarLabel: "Home",
          // tabBarShowLabel: false,
          headerTintColor: "#927E5A",
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "#927E5A",
            fontFamily: "BaskervilleRegular",
            textTransform: "uppercase",
            fontSize: 24,
          },
          headerStyle: {
            backgroundColor: "#080402",
            borderBottomColor: "#927E5A",
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderTopColor: "#927E5A",
          },
          headerRight: () => <HeaderIcon RIGHT={10} />,

          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  tintColor: focused ? "#927E5A" : "#FFFFFF",
                  height: 26.67,
                  width: 24,
                  margin: 5,
                }}
                resizeMode="contain"
                source={require("../../assets/Image/Vector-3.png")}
              />

              <Text
                style={{
                  color: focused ? "#927E5A" : "#FFFFFF",
                  alignItems: "center",
                  fontSize: 11,
                  fontFamily: "OpenSansRegular",
                }}
              >
                Clubs
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Bars"
        component={Bars}
        options={{
          tabBarShowLabel: false,
          // headerShown: false,
          headerTintColor: "#927E5A",
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "#927E5A",
            fontFamily: "BaskervilleRegular",
            textTransform: "uppercase",
            fontSize: 24,
          },
          headerStyle: {
            backgroundColor: "#080402",
            borderBottomColor: "#927E5A",
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderTopColor: "#927E5A",
          },
          headerRight: () => <HeaderIcon RIGHT={10} />,

          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  tintColor: focused ? "#927E5A" : "#FFFFFF",
                  height: 26.67,
                  width: 24,
                  margin: 5,
                }}
                resizeMode="contain"
                source={require("../../assets/Image/bars.png")}
              />

              <Text
                style={{
                  color: focused ? "#927E5A" : "#FFFFFF",
                  alignItems: "center",
                  fontSize: 11,
                  fontFamily: "OpenSansRegular",
                }}
              >
                Bars
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavoriteScreen}
        options={{
          tabBarShowLabel: false,
          // headerShown: false,
          title: "Favourites",
          headerTintColor: "#927E5A",
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "#927E5A",
            fontFamily: "BaskervilleRegular",
            textTransform: "uppercase",
            fontSize: 24,
          },
          headerStyle: {
            backgroundColor: "#080402",
            borderBottomColor: "#927E5A",
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderTopColor: "#927E5A",
          },
          headerRight: () => <HeaderIcon RIGHT={10} />,

          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  tintColor: focused ? "#927E5A" : "#FFFFFF",
                  height: 26.67,
                  width: 24,
                  margin: 5,
                }}
                resizeMode="contain"
                source={require("../../assets/Image/favorites.png")}
              />

              <Text
                style={{
                  color: focused ? "#927E5A" : "#FFFFFF",
                  alignItems: "center",
                  fontSize: 11,
                  fontFamily: "OpenSansRegular",
                }}
              >
                Favourites
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Competitions"
        component={Clubs}
        options={{
          tabBarShowLabel: false,
          // headerShown: false,
          headerTintColor: "#927E5A",
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "#927E5A",
            fontFamily: "BaskervilleRegular",
            textTransform: "uppercase",
            fontSize: 24,
          },
          headerStyle: {
            backgroundColor: "#080402",
            borderBottomColor: "#927E5A",
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderTopColor: "#927E5A",
          },
          headerRight: () => <HeaderIcon RIGHT={10} />,

          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Image
                style={{
                  tintColor: focused ? "#927E5A" : "#FFFFFF",
                  height: 26.67,
                  width: 24,
                  margin: 5,
                }}
                resizeMode="contain"
                source={require("../../assets/Image/Vector-1.png")}
              />

              <Text
                style={{
                  color: focused ? "#927E5A" : "#FFFFFF",
                  textAlign: "center",
                  fontSize: 11,
                  fontFamily: "OpenSansRegular",
                }}
              >
                Competitions
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Person}
        options={{
          tabBarShowLabel: false,
          // headerShown: false,
          title: <Images />,
          headerTintColor: "#927E5A",
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "#927E5A",
            fontFamily: "BaskervilleRegular",
            textTransform: "uppercase",
            fontSize: 24,
          },
          headerStyle: {
            backgroundColor: "#080402",
            borderBottomColor: "#927E5A",
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderTopColor: "#927E5A",
            // justifyContent:"flex-end"
            
          },

          headerRight: () => <HeaderIcon RIGHT={10} />,

          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  tintColor: focused ? "#927E5A" : "#FFFFFF",
                  height: 27.67,
                  width: 25,
                  margin: 5,
                }}
                resizeMode="contain"
                source={require("../../assets/Image/home.png")}
              />

              <Text
                style={{
                  color: focused ? "#927E5A" : "#FFFFFF",
                  alignItems: "center",
                  fontSize: 11,
                  fontFamily: "OpenSansRegular",
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
