import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Animated,
  Easing,
} from "react-native";
import Lottie from "lottie-react-native";
import React, { useState, useContext, useRef, useEffect } from "react";
import ImageOverlay from "react-native-image-overlay";

import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";

const AccessSelected = ({ navigation }) => {
  // //   const { state, onSignin, errorMessage, onForgot } = useContext(GG);
  //   const { msg } = state;
  // const animationProgress = useRef(new Animated.Value(0))

  // useEffect(() => {
  //   Animated.timing(animationProgress.current, {
  //     toValue: 1,
  //     duration: 3000,
  //     easing: Easing.linear,
  //     useNativeDriver: false
  //   }).start();
  // }, [])
  let [fontLoaded, error] = useFonts({
    Inter_900Black,
    "OpenSans-Regular": require("../../assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-SemiBold": require("../../assets/fonts/OpenSans-SemiBold.ttf"),
  });
  //   if (!fontLoaded) {
  //     return <AppLoading />;
  //   }
  const [email, setEmail] = useState("");

  return (
    <>
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="#080402"
          barStyle="light-content"
        />
        <ImageOverlay
          overlayColor="#000000"
          //  "#19282F"
          overlayAlpha={0.8}
          height={Dimensions.get("window").height}
          source={require("../../assets/Image/homeScreenBG.jpg")}
        >
          <View style={{ alignSelf: "center", flex: 1 }}>
            <Text
              style={{
                color: "#B79D71",
                fontSize: 24,
                fontFamily: "OpenSans-SemiBold",
                alignSelf: "center",
                marginTop: 39,
                fontWeight: "600",
              }}
            >
              {" "}
              Standard Membership
            </Text>
            <Text
              style={{
                color: "#34A853",
                fontSize: 20,
                fontFamily: "OpenSans-SemiBold",
                alignSelf: "center",
                marginTop: 57,
              }}
            >
              {" "}
              Access Granted
            </Text>
            <View style={{width:300,heigth:180,justifyContent:'center',alignSelf:'center',}}>
              <Lottie
                source={require("../../assets/Image/access.json")}
                autoPlay
              />
            </View>

            {/* <Image
              source={require("../../assets/Image/Verified.gif")}
              style={{
                marginTop: 16,
                marginRight: 116,
                marginLeft: 115,
                alignSelf: "center",
                width: 200,
                height: 180,
              }}
            /> */}
            <View style={{ marginTop: 16, alignItems: "center" }}>
              <Text
                style={{
                  color: "#B79D71",
                  fontSize: 24,
                  fontFamily: "OpenSans-Regular",
                }}
              >
                AwaizButt
              </Text>
            </View>
            <View style={styles.buttonStyle}>
              <Text
                numberOfLines={2}
                adjustsFontSizeToFit
                style={{
                  color: "#B79D71",
                  fontSize: 24,
                  fontFamily: "OpenSans-SemiBold",
                  padding: 8,
                  textAlign: "center",
                  marginBottom: 10,
                  fontWeight: "bold",
                }}
              >
                Welcome! BeVIP Member
              </Text>
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
            </View>
          </View>
        </ImageOverlay>
      </View>
    </>
  );
};

export default AccessSelected;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080402",
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
    //   marginLeft: 15,
    //   marginRight: 15,
    justifyContent: "center",
  },
  buttonDesign: {
    backgroundColor: "#B79D71",
    width: 280,
    height: 51,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 5,
  },
  exit: {
    alignSelf: "center",
    marginTop: 15,
  },
});
