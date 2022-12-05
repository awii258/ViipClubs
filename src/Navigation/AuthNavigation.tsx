import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack'
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../Screens/LoginScreen/LoginScreen";
import SplashScreen from "../Screens/SplashScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import { Provider as AuthProvider } from "../Context/AuthContext";
import { Context as Action } from "../Context/Actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ForgetPassword from "../Screens/ForgetPassword/ForgetPassword";
import EventScreen from "../Screens/EventScreen";

import Map from "../Screens/Map";
import Tabs from "./Tabs";
import ClubsProfile from "../Screens/ClubsProfile";
import TopTab from "../Screens/TopTab";
import BarTopTab from "../Screens/BarTopTab";
import Clubs from "../Screens/Clubs";
import Book from "../Screens/Book";
import Queue from "../Screens/Queue";
import ClubEvents from "../Screens/ClubEvents";
import { Ionicons } from "@expo/vector-icons";
import Header from "../Screens/Header";
import HeaderIcon from "../Components/HeaderIcon";
import Search from "../Screens/Search";
import { useNavigation } from "@react-navigation/native";
import { EvilIcons } from "@expo/vector-icons";
import Formessage from "../Screens/message/Formessage";
import Resetmessage from "../Screens/message/Resetmessage";
import ResetPassword from "../Screens/ResetPassword";
import Unverified from "../Screens/Verified/Unverifie";
import Verfied from "../Screens/Verified/Verfied";
import Qrcode from "../Screens/Scan/Qrcode";
import Searchs from "../Screens/Search/Searchs";
import First from "../Screens/SplashScreen/First";
import Second from "../Screens/SplashScreen/Second";
import MainNavigation from "../Navigation/MainNavigation";
import SplashScreens from "./SplashScreens";
import Actions from "../Screens/TabsScreen/Action";
import FavoriteScreen from "../Screens/FavoriteScreen";
import EventDetail from "../Components/EventDetail";
import CompetitionDetails from "../Screens/CompetitionDetails";
import AccessSelected from "../AccessSelected/AccessSelected";
import AccessDenied from "../AccessDenied/AccessDenied";
import VerifyingLocation from "../Screens/VerifyingLocation/VerifyingLocation";
import SubscriptionsMember from "../Screens/Subscriptions/SubscriptionsMember";


const Stack = createStackNavigator();

export default function AuthNavigation({ route }) {
  // const navigation = useNavigation();

  // const {itemname } = route.params;

  // let home = itemname;

  const { state, restoreToken, access_token, onClub } =
    React.useContext(Action);
  const g = state.club;
  //  useEffect(() => {
  //    const bootstrapAync = async () => {
  //      let access_token;

  //      try {
  //        access_token = await AsyncStorage.getItem("access_token");
  //      } catch (e) {
  //        console.log(e);
  //      }

  //      restoreToken(access_token);
  //    };

  //    bootstrapAync();
  //  }, []);
  useEffect(() => {
    // console.log("/???????>>>>>>>>awaiz", state.token);
  }, []);

  const OpenScreenConfig = {
    animation: 'spring',
    config: {
      stiffness: 500,
      damping: 200,
      mass: 1,
      overshootClamping: false,
      restDisplacementThreshold: 0.001,
      restSpeedThreshold: 0.001,
    },
  };
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        // headerShown:false,
        // gestureEnabled:true,
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      }}>
        {/* <Stack.Screen
          name="First"
          component={First}
          options={({ route }) => ({
            title: "Search",
            headerShown: false,
            headerTintColor: "#927E5A",
            headerTitleAlign: "center",
            headerTitleStyle: { color: "#927E5A" },
            headerStyle: {
              backgroundColor: "#080402",
              borderBottomColor: "#927E5A",
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderTopColor: "#927E5A",
            },
          })}
        /> */}

        {/* <Stack.Screen
          name="Se"
          component={SplashScreens}
          options={({ route }) => ({
            title: "Search",
            headerShown: false,
            headerTintColor: "#927E5A",
            headerTitleAlign: "center",
            headerTitleStyle: { color: "#927E5A" },
            headerStyle: {
              backgroundColor: "#080402",
              borderBottomColor: "#927E5A",
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderTopColor: "#927E5A",
            },
          })}
        /> */}
        <Stack.Screen
          name="Main"
          component={MainNavigation}
          options={{
            // headerStyle: styles.header,
            headerShown: false,
            headerTintColor: "#927E5A",
            headerTitleAlign: "center",
            headerTitleStyle: {
              color: "#927E5A",
              fontFamily: "BaskervilleRegular",
            },
            headerStyle: { backgroundColor: "#080402" },
            
            headerRight: () => <HeaderIcon />,
          }}
        />

        <Stack.Screen
          name="Forget"
          component={ForgetPassword}
          options={{
            // headerStyle: styles.header,
            title: "FORGOT PASSWORD",
            headerTintColor: "#927E5A",
            headerTitleAlign: "center",
            headerTitleStyle: {
              color: "#927E5A",
              fontFamily: "BaskervilleRegular",
            },
            headerStyle: { backgroundColor: "#080402" },
            headerRight: () => <HeaderIcon />,
          }}
        />
        <Stack.Screen
          name="Profiles"
          component={ProfileScreen}
          options={{
            // headerStyle: styles.header,
            title: "PROFILE",
            headerTintColor: "#927E5A",
            headerTitleAlign: "center",
            headerTitleStyle: {
              color: "#927E5A",
              fontFamily: "BaskervilleRegular",
              textTransform: "uppercase",
              fontSize: 24,
            },
            headerStyle: { backgroundColor: "#080402" },
            headerRight: () => <HeaderIcon />,
          }}
        />
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{
            // headerStyle: styles.header,
            title: "PASSWORD RESET",
            headerTintColor: "#927E5A",
            headerTitleAlign: "center",
            headerTitleStyle: {
              color: "#927E5A",
              fontFamily: "BaskervilleRegular",
              textTransform: "uppercase",
              fontSize: 24,
            },
            headerStyle: { backgroundColor: "#080402" },
            headerRight: () => <HeaderIcon />,
          }}
        />
        <Stack.Screen
          name="TopTabScreen"
          component={TopTab}
          options={({ route }) => ({
            title: route.params.productTitle,

            headerTintColor: "#927E5A",
            headerTitleAlign: "center",
            headerBackTitleVisible:false,
            headerTitleStyle: {
              color: "#927E5A",
              fontFamily: "BaskervilleRegular",
              fontSize: 24,
              
            },
            headerStyle: {
              backgroundColor: "#080402",
              // borderBottomColor: "#85106a",
              // borderBottomWidth: 5,
              // borderTopWidth: 5,
              // borderTopColor: "#85106a",
              // fontSize: 24,
              // fontFamily: "BaskervilleRegular",
              // alignItems: "center",
              
            },
            headerRight: () => <HeaderIcon />,
            
          })}
        />
        <Stack.Screen
          name="BarTopTabScreen"
          component={BarTopTab}
          options={({ route }) => ({
            title: route.params.productTitle,
            headerBackTitleVisible:false,
            headerTintColor: "#927E5A",
            headerTitleAlign: "center",
            headerTitleStyle: {
              color: "#927E5A",
              fontFamily: "BaskervilleRegular",
              fontSize: 24,
            },
            headerStyle: {
              backgroundColor: "#080402",
              // borderBottomColor: "#85106a",
              // borderBottomWidth: 5,
              // borderTopWidth: 5,
              // borderTopColor: "#85106a",
              // fontSize: 24,
              // fontFamily: "BaskervilleRegular",
            },
            headerRight: () => <HeaderIcon />,
          })}
        />
        <Stack.Screen
          name="ClubEvents"
          component={ClubEvents}
          options={{
            // headerStyle: styles.header,
            title: "CLUB EVENTS",
            headerTintColor: "#927E5A",
            headerTitleAlign: "center",
            headerTitleStyle: {
              color: "#927E5A",
              fontFamily: "BaskervilleRegular",
              fontSize: 24,
            },
            headerStyle: { backgroundColor: "#080402" },
          }}
        />
        {/* <Stack.Screen
          name="EventDetail"
          component={EventDetail}
          options={{
            // headerStyle: styles.header,
            title: "",
            headerTintColor: "#927E5A",
            headerTitleAlign: "center",
            headerTitleStyle: {
              color: "#927E5A",
              fontFamily: "BaskervilleRegular",
              fontSize:24
            },
            headerStyle: { backgroundColor: "#080402" },
          }}
        /> */}
        <Stack.Screen
          name="Competition Detail"
          component={CompetitionDetails}
          options={({ route }) => ({
            title:
              route.params.title.length > 15
                ? route.params.title.substring(0, 12) + "..."
                : route.params.title,
            // title: { ((route.params.title).length > 12) ?
            //   (((mytextvar).substring(0,maxlimit-3)) + '...') :
            //   mytextvar }
            headerBackTitleVisible:false,
            headerTintColor: "#927E5A",
            headerTitleAlign: "center",
            headerTitleStyle: {
              color: "#927E5A",
              fontFamily: "BaskervilleRegular",
              fontSize: 24,
              // overflow: "hidden",
              // textOverflow: "ellipsis"
            },
            headerStyle: {
              backgroundColor: "#080402",
              // borderBottomColor: "#85106a",
              // borderBottomWidth: 5,
              // borderTopWidth: 5,
              // borderTopColor: "#85106a",
              // fontSize: 24,
              // fontFamily: "BaskervilleRegular",
            },
            headerRight: () => <HeaderIcon />,
          })}
        />

        <Stack.Screen
          name="Event Detail"
          component={EventDetail}
          options={({ route }) => ({
            title:
              route.params.title.length > 15
                ? route.params.title.substring(0, 12) + "..."
                : route.params.title,
            // title: { ((route.params.title).length > 12) ?
            //   (((mytextvar).substring(0,maxlimit-3)) + '...') :
            //   mytextvar }
            headerBackTitleVisible:false,
            headerTintColor: "#927E5A",
            headerTitleAlign: "center",
            headerTitleStyle: {
              color: "#927E5A",
              fontFamily: "BaskervilleRegular",
              fontSize: 24,
              // overflow: "hidden",
              // textOverflow: "ellipsis"
            },
            headerStyle: {
              backgroundColor: "#080402",
              // borderBottomColor: "#85106a",
              // borderBottomWidth: 5,
              // borderTopWidth: 5,
              // borderTopColor: "#85106a",
              // fontSize: 24,
              // fontFamily: "BaskervilleRegular",
            },
            headerRight: () => <HeaderIcon />,
          })}
        />

        <Stack.Screen
          name="Du"
          component={ClubsProfile}
          options={({ route, navigation }) => ({
            //  title: route.params.itemname,
            title: "",
            headerShown: false,
            // headerTintColor: "#927E5A",
            // headerShadowVisible: false,
            // headerTitleAlign: "center",
            // headerTitleStyle: {
            //   color: "#927E5A",
            //   fontFamily: "BaskervilleRegular",
            //   textTransform: "uppercase",
            //   fontSize:24
            // },
            // headerStyle: {
            //   backgroundColor: "#080402",
            //   fontFamily: "BaskervilleRegular",
            //   textTransform: "uppercase",
            //   borderWidth:0,
            //   headerShadowVisible: false,
            // },
          })}
        />

        <Stack.Screen
          name="Dum"
          component={Clubs}
          options={({ route }) => ({
            title: route.params.productTitle,

            headerTintColor: "#927E5A",
            headerTitleAlign: "center",
            // headerBackTitleVisible:false,
            headerTitleStyle: {
              color: "#927E5A",
              fontFamily: "BaskervilleRegular",
              textTransform: "uppercase",
              fontSize: 24,
            },
            headerStyle: {
              backgroundColor: "#080402",
              borderBottomColor: "#85106a",
              borderBottomWidth: 5,
              borderTopWidth: 5,
              borderTopColor: "#85106a",
              fontFamily: "BaskervilleRegular",
            },
            headerRight: () => <HeaderIcon />,
          })}
        />
        {/* <Stack.Screen
          name="Dum"
          component={ClubBars}
          options={({ route }) => ({
            title: route.params.productTitle,

            headerTintColor: "#927E5A",
            headerTitleAlign: "center",
            headerTitleStyle: {
              color: "#927E5A",
              fontFamily: "BaskervilleRegular",
              textTransform: "uppercase",
              fontSize:24
            },
            headerStyle: {
              backgroundColor: "#080402",
              borderBottomColor: "#85106a",
              borderBottomWidth: 5,
              borderTopWidth: 5,
              borderTopColor: "#85106a",
              fontFamily: "BaskervilleRegular",
            },
            headerRight: () => <HeaderIcon />,
          })}
        /> */}

        <Stack.Screen
          name="Venue"
          component={Book}
          options={({ route }) => ({
            title: "BOOK VENUE",
            headerBackTitleVisible:false,
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
              // elevation: 0, // remove shadow on Android
              // shadowOpacity: 0, // remove shadow on iOS

              // borderColor: "#927E5A",
              // borderBottomWidth: 2,
              // borderBottomColor: "red",
              // borderTopWidth: 2,
              // borderTopColor: "red",
              // fontFamily: "BaskervilleRegular",
            },
            headerRight: () => <HeaderIcon />,
          })}
        />
         
        <Stack.Screen
          name="Queues"
          component={Queue}
          options={({ route }) => ({
            title: "QUEUE JUMP",
            borderBottomWidth: 0,
            headerBackTitleVisible:false,
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
              fontFamily: "BaskervilleRegular",
            },
            headerRight: () => <HeaderIcon />,
          })}
        />
         <Stack.Screen
          name="Subscription"
          component={SubscriptionsMember}
          options={({ route }) => ({
            title: " MEMBERSHIP",
            headerBackTitleVisible:false,
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
              // elevation: 0, // remove shadow on Android
              // shadowOpacity: 0, // remove shadow on iOS

              // borderColor: "#927E5A",
              // borderBottomWidth: 2,
              // borderBottomColor: "red",
              // borderTopWidth: 2,
              // borderTopColor: "red",
              // fontFamily: "BaskervilleRegular",
            },
            headerRight: () => <HeaderIcon />,
          })}
        />
        <Stack.Screen
          name="Forgets"
          component={Formessage}
          options={({ route }) => ({
            title: "PASSWORD RESET",

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
              fontFamily: "BaskervilleRegular",
            },
          })}
        />
        <Stack.Screen
          name="Qr"
          component={Qrcode}
          options={({ route }) => ({
            title: "QUEUE JUMP",
            headerBackTitleVisible:false,    
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
              // fontFamily: "BaskervilleRegular",
            },
            headerRight: () => <HeaderIcon />,
          })}
        />
        <Stack.Screen
          name="Resets"
          component={Resetmessage}
          options={({ route }) => ({
            title: "PASSWORD RESET",

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
              fontFamily: "BaskervilleRegular",
            },
            headerRight: () => <HeaderIcon />,
          })}
        />
        <Stack.Screen
          name="Res"
          component={ResetPassword}
          options={({ route }) => ({
            title: "PASSWORD RESET",

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
              fontFamily: "BaskervilleRegular",
            },
            headerRight: () => <HeaderIcon />,
          })}
        />
        <Stack.Screen
          name="Events"
          component={EventScreen}
          options={({ route }) => ({
            title: "EVENTS",

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
              fontFamily: "BaskervilleRegular",
              textTransform: "uppercase",
            },
            headerRight: () => <HeaderIcon />,
          })}
        />
        <Stack.Screen
          name="Favourite"
          component={FavoriteScreen}
          options={({ route }) => ({
            title: "FAVOURITES",
            borderBottomWidth: 0,

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
              fontFamily: "BaskervilleRegular",
            },
            headerRight: () => <HeaderIcon />,
          })}
        />
        <Stack.Screen
          name="Map"
          component={Map}
          options={({ route }) => ({
            title: "LOCATION",

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
              // fontFamily: "BaskervilleRegular",
            },
            headerRight: () => <HeaderIcon />,
          })}
        />
        <Stack.Screen
          name="Ver"
          component={AccessSelected}
          options={({ route }) => ({
            title: "QUEUE JUMP",

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
              fontFamily: "BaskervilleRegular",
            },
            headerRight: () => <HeaderIcon />,
          })}
        />
        <Stack.Screen
          name="Uni"
          component={AccessDenied}
          options={({ route }) => ({
            title: "QUEUE JUMP",

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
              fontFamily: "BaskervilleRegular",
            },
            headerRight: () => <HeaderIcon />,
          })}
        />
          <Stack.Screen
          name="Verify"
          component={VerifyingLocation}
          options={({ route }) => ({
            title: "VERIFICATION",

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
              fontFamily: "BaskervilleRegular",
            },
            headerRight: () => <HeaderIcon />,
          })}
        />
        <Stack.Screen
          name="Srch"
          component={Searchs}
          options={({ route }) => ({
            title: "SEARCH",

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
              fontFamily: "BaskervilleRegular",
            },
            headerRight: () => <HeaderIcon />,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#030303",
    borderWidth: 0,
    elevation: 0,
    height: 25,

    borderBottomColor: "#B79D71",
  },
});
function alert(arg0: string): void {
  throw new Error("Function not implemented.");
}
