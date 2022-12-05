import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ImageOverlay from "react-native-image-overlay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Context as GG } from "../../Context/Actions";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { ERROR } from "../../Context/Types";
import Checkbox from "expo-checkbox";

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

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const { state, onSignin, err, onForgot } = useContext(GG);
  const { msg } = state;
  const [email, setEmail] = useState("");

  useEffect(() => {
    const getLastUsedEmail = async () => {
      const lastEmail = await AsyncStorage.getItem("last-user-email");
      // console.log("awaizbutt1235846", lastEmail);
      if (lastEmail) {
        setEmail(lastEmail);
      }
      const rememberMeSetting = await AsyncStorage.getItem("remember-me");
      if (rememberMeSetting) {
        setRememberMe(JSON.parse(rememberMeSetting));
      }
    };
    getLastUsedEmail();
  });

  // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  // if(err.Error){
  //   console.log(".......>>>>>>>>>>>>>>>")
  //   Alert.alert("msg",state.msg)
  // }
  const ForgetPassword = () => {
    onForgot({ email });
    navigation.navigate("Forgets");
  };
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="#080402"
        barStyle="light-content"
      />
      <ImageOverlay
        style={{ flex: 1 }}
        overlayColor="#000000"
        overlayAlpha={0.7}
        height={"100%"}
        source={require("../../../assets/Image/loginBG.jpeg")}
      >
        <KeyboardAvoidingView
          enabled={true}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, borderTopWidth: 2, borderTopColor: "#927E5A" }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.imageContainer}>
              <Image
                resizeMode="contain"
                source={require("../../../assets/Image/Vip.png")}
                style={styles.imageLogo}
              />
            </View>

            <View>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                placeholder="Enter Your Email Address"
                placeholderTextColor={"#927E5A"}
                selectionColor={"#927E5A"}
                onChangeText={setEmail}
                value={email}
              />
            </View>

            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={ForgetPassword}
            >
              <Text style={[styles.textStyle, { color: "#FFFFFF" }]}>
                Recover My Password
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageOverlay>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageLogo: {
    alignSelf: "center",
    width: 360,
    height: 227,
    // position: "absolute",
    // top: 30,
    margin: 60,
  },
  inputEmail: {
    justifyContent: "center",
  },
  input: {
    height: 51,
    borderColor: "#927E5A",
    width: "85%",
    padding: 8,
    color: "#927E5A",
    borderWidth: 1,
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    alignSelf: "center",
  },
  buttonStyle: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 280,
    backgroundColor: "#927E5A",
    height: 51,
    margin: 12,
    alignSelf: "center",
    elevation: 8,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 7 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    borderRadius: 5,
  },

  checkbox: {
    margin: 8,
    borderWidth: 1,
  },
  copyRight: {
    // position: "absolute",
    // bottom: 10,

    color: "white",
    fontSize: 14,
  },
  forgetPassword: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: "#927E5A",
    fontFamily: "OpenSansRegular",
    fontSize: 16,
    alignSelf: "center",
  },
  imageContainer: {
    marginTop: hp("5%"),
    elevation: 8,
    shadowColor: "black",
    shadowOffset: { width: 8, height: 14 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});
function _myFunction(name: any, checked: any) {
  throw new Error("Function not implemented.");
}
