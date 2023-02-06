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

const Resetmessage = ({ navigation }: LoginScreenProps) => {
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
        <View>
          <Image
           resizeMode="contain"
           source={require("../../../assets/Image/WLogo.png")}
           style={{
             alignSelf:'center',
             width: 294.72,
             height: 185.9,
             // position: "absolute",
             // top: 30,
             margin: 55,
           }}
          />
          <View style={{ marginTop: 40, alignItems: "center" }}>
            <Text
              numberOfLines={2}
              adjustsFontSizeToFit
              style={{
                color: "#B79D71",
                fontSize: 16,
                fontWeight: "400",
                fontFamily: "OpenSans-Regular",
              }}
            >
              Your password has been updated successfully.
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
                  color: "#ffff",
                  fontFamily: "OpenSansRegular",
                  fontSize: 16,
                  alignSelf: "center"
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

export default Resetmessage;

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
    marginTop: 60,
    marginLeft: 15,
    marginRight: 15,
  },
  buttonDesign: {
    backgroundColor: "#927E5A",
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
function _myFunction(name: any, checked: any) {
  throw new Error("Function not implemented.");
}
