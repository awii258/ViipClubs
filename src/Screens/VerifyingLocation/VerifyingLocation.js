import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import {
  useNavigation,
  CommonActions,
  useFocusEffect,
} from "@react-navigation/native";
import Lottie from "lottie-react-native";
import React, { useState, useContext, useRef, useEffect } from "react";
import MapView from "../AccessMap/MapView";

import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
// import { ScrollView } from "native-base";

const VerifyingLocation = ({ navigation, route }) => {
  const { latitude, longitude } = route.params;

  console.log("latitude??????????", latitude);

  const animationProgress = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Uni");
    }, 8000);
  }, []);

  //   const onPressQueueJump = () => {
  //     try {
  //       onCheckInAffiliate(itemId);
  //       navigation.navigate("Ver", { id: itemId });

  //     } catch (error) {
  //       navigation.navigate("Uni")
  //     }
  //   }
  //   /   const { state, onSignin, errorMessage, onForgot } = useContext(GG);
  //   const { msg } = state;
  let [fontLoaded, error] = useFonts({
    Inter_900Black,
    "OpenSans-Regular": require("../../../assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-SemiBold": require("../../../assets/fonts/OpenSans-SemiBold.ttf"),
  });
  //   if (!fontLoaded) {
  //     return <AppLoading />;
  //   }

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="#080402"
        barStyle="light-content"
      />
      <View>
        <Text
          style={{
            color: "#B79D71",
            fontSize: 24,
            fontFamily: "OpenSans-SemiBold",
            alignSelf: "center",
            marginTop: 39,
            fontWeight: "600",
            // margin:30
            marginBottom: 20,
          }}
        >
          {" "}
          Verifying Location
        </Text>
        <Text
          style={{
            color: "#B79D71",
            fontSize: 20,
            fontFamily: "OpenSans-Regular",
            alignSelf: "center",
            // marginTop:40,
            fontWeight: "500",
            // marginTop:20
          }}
        >
          {" "}
          Please Wait!
        </Text>
      </View>

      {/* <View style={{ marginTop: 16, alignItems: "center" }}>
              <Text
                style={{
                  color: "#B79D71",
                  fontSize: 24,
                  fontFamily: "OpenSans-Regular",
                }}
              >
                AwaizButt
              </Text>
              <Text
                numberOfLines={2}
                adjustsFontSizeToFit
                style={{
                  color: "#B79D71",
                  fontSize: 24,
                  fontFamily: "OpenSans-SemiBold",
                  padding: 10,
                  textAlign: "center",
                }}
              >
                Wellcome To Dollhouse!
              </Text>
            </View>
            <View style={styles.buttonStyle}>
              <TouchableOpacity
                style={styles.buttonDesign}
                onPress={() => {
                  // navigation.navigate("Resets");
                }}
              >
                <Text
                  style={{
                    color: "white",
                    alignSelf: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    fontFamily: "OpenSans-SemiBold",
                  }}
                >
                  Done
                </Text>
              </TouchableOpacity>
            </View> */}

      <View style={{ flex: 1, justifyContent: "center" }}>
        {/* <Lottie
      source={require('../../../assets/animation_lb1wwt8u.json')}
      progress={animationProgress.current}
/> */}
        <MapView latitude={latitude} longitude={longitude}></MapView>

        {/* <Image
              source={require("../../../assets/Image/ver.png")}
              style={{
                marginTop: 16,
                marginRight: 116,
                marginLeft: 115,
                alignSelf: "center",
                width: 158,
                height: 158,
              }}
            /> */}
      </View>
      {/* <View style={{marginTop:40}}>
            <Text style={{ color: "#B79D71",
                  fontSize: 24,
                  fontFamily: "OpenSans-Regular",
                 fontWeight:'700',
                  padding: 10,
                  textAlign: "center",
                  marginTop:15
                 
                  }}>ACCESS GRANTED</Text>
                  </View> */}
    </View>
  );
};

export default VerifyingLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "yellow",
    backgroundColor: "#000000",

    height: "100%",
    // justifyContent:"space-around"
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "#B79D71",
    borderRadius: 5,
    padding: 10,
    color: "#B79D71",
    borderWidth: 1,
    marginTop: 12,
    backgroundColor: "#080402",
  },
  buttonStyle: {
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
  },
  buttonDesign: {
    backgroundColor: "#B79D71",
    width: 327,
    height: 51,
    justifyContent: "center",
    alignSelf: "center",
  },
  exit: {
    alignSelf: "center",
    marginTop: 15,
  },
});
