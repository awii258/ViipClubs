import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext } from "react";

import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
type Stack = {
  Login: undefined;
  Splash: undefined;
  Person: undefined;
  Profile: undefined;
  Forget: undefined;
};
const Stack = createNativeStackNavigator<Stack>();

type NavigationLoginProps = NativeStackScreenProps<Stack, "Login">;

type LoginScreenProps = {
  navigation: NavigationLoginProps["navigation"];
};

const Unverified = ({ navigation }: LoginScreenProps) => {
  // //   const { state, onSignin, errorMessage, onForgot } = useContext(GG);
  //   const { msg } = state;
  let [fontLoaded, error] = useFonts({
    Inter_900Black,
    "OpenSans-Regular": require("../../../assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-SemiBold": require("../../../assets/fonts/OpenSans-SemiBold.ttf"),
  });
  //   if (!fontLoaded) {
  //     return <AppLoading />;
  //   }
  const [email, setEmail] = useState("");

  const e = "hassan@lloydsknightint.com";

  return (
    <>
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="#080402"
          barStyle="light-content"
        />
        <View style={{ alignSelf: "center" }}>
          <Text
            style={{
              color: "#B79D71",
              fontSize: 24,
              fontFamily: "OpenSans-SemiBold",
              alignSelf: "center",
              marginTop: 39,
            }}
          >
            {" "}
            Annual Membership
          </Text>
          <Text
            style={{
              color: "#FF0000",
              fontSize: 20,
              fontFamily: "OpenSans-SemiBold       ",
              alignSelf: "center",
              marginTop: 57,
            }}
          >
            {" "}
            UNVERIFIED
          </Text>
          <Image
            source={require("../../../assets/Image/un.png")}
            style={{
              marginTop: 16,
              marginRight: 116,
              marginLeft: 115,
              alignSelf: "center",
              width: 158,
              height: 158,
            }}
          />
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
              Subscription Expired!
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
          </View>
        </View>
      </View>
    </>
  );
};

export default Unverified;

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
function _myFunction(name: any, checked: any) {
  throw new Error("Function not implemented.");
}
