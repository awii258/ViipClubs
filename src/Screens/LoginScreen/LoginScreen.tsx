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
  Dimensions,
  Linking,
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
  Uni: undefined;
  Veri: undefined;
  Subscription: undefined;
};
const Stack = createNativeStackNavigator<Stack>();

type NavigationLoginProps = NativeStackScreenProps<Stack, "Login">;

type LoginScreenProps = {
  navigation: NavigationLoginProps["navigation"];
};

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const { state, onSignin, err } = useContext(GG);
  const { msg } = state;
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const [password, setPassword] = useState("");
  // const { state, signin } = useContext(AuthContext);
  const [checked, setChecked] = useState(false);
  const [isChecked, setShecked] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
   if(rememberMe === true){
       AsyncStorage.setItem("lase-user-email", email);}
      if(rememberMe  === true){
       AsyncStorage.setItem("user-password", password);}
console.log("remember me call",rememberMe)

// useEffect(()=>{
//   setTimeout(()=>{
//     onSignin({ email, password });
//   },3000)
// },[])
  useEffect( () => {
    // setTimeout(() => {
     
    //   setRememberMe(false);
    // }, 10);
   
 
    const getLastUsedEmail = async () => {

    
      
      console.log("enter inside of true")
    const lastEmail = await AsyncStorage.getItem("lase-user-email");
    const lastPassword= await AsyncStorage.getItem("user-password");
    console.log("awaizbutt1235846", lastEmail)
    if (lastEmail) {
      setEmail(lastEmail);
    }
    if(lastPassword){
      setPassword(lastPassword);
    }
  
    // const rememberMeSetting = await AsyncStorage.getItem("remember-me");
    
    // if (rememberMeSetting) {
    //   setRememberMe(JSON.parse(rememberMeSetting));
    //   console.log("remember me",rememberMe)
     
    // }
  
  };

  getLastUsedEmail();
   
  },[rememberMe]);
 


// if(rememberMe !==true){
//   AsyncStorage.removeItem("lase-user-email");
//   AsyncStorage.removeItem("user-password");
// }
 
  console.log("email of login",email2)
  const e = "hassan@lloydsknightint.com";
  const p = "kS3fK4nV0pB1cG1f";

  // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  // if(err.Error){
  //   console.log(".......>>>>>>>>>>>>>>>")
  //   Alert.alert("msg",state.msg)
  // }

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
          style={{ flex: 1 }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.imageContainer}>
              <Image
                resizeMode="contain"
                source={require("../../../assets/Image/Vip.png")}
                style={styles.imageLogo}
              />
            </View>

            <View style={styles.input}>
              <TextInput
                style={[styles.textStyle, { flex: 1 }]}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                placeholder="Email"
                selectionColor={"#927E5A"}
                placeholderTextColor={"#927E5A"}
                onChangeText={setEmail}
                value={email}
              />
            </View>

            <View style={styles.input}>
              {/* <Text style={{ backgroundColor: "white", fontSize: 30 }}>Awaiz</Text> */}
              <TextInput
                style={[styles.textStyle, { flex: 1 }]}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                placeholder="Password"
                placeholderTextColor={"#927E5A"}
                onChangeText={setPassword}
                selectionColor={"#927E5A"}
                secureTextEntry={passwordVisible}
                value={password}
                // right={<TextInput.MaterialCommunityIcons name={passwordVisible ? "eye" : "eye-off"} onPress={() => setPasswordVisible(!passwordVisible)} />}
              />
              <TouchableOpacity
                onPress={() => {
                  setPasswordVisible(!passwordVisible);
                  setChecked(!checked);
                }}
              >
                <MaterialCommunityIcons
                  name={checked === false ? "eye-outline" : "eye-off-outline"}
                  size={24}
                  color={"#927E5A"}
                  style={{ alignSelf: "center", marginRight: 5, marginTop: 1 }}
                />
              </TouchableOpacity>
            </View>

            <View
          style={{ flexDirection: "row", marginLeft: 29.5,marginBottom:10,alignItems:'center',height:"2%" }}
          
          >
          <Checkbox
            style={styles.checkbox}
            value={rememberMe}
            onValueChange={(value)=>{setRememberMe(value);
              AsyncStorage.setItem('remember-me',JSON.stringify(value));
            }}
            color={isChecked ? "#927E5A" : "#927E5A"}
            />
            <TouchableOpacity onPress={()=>setRememberMe(!rememberMe)}>
            <Text style={{ color: "#927E5A", marginLeft:15, fontSize: 14 }}>
            Remember me
            </Text>
            </TouchableOpacity>
          </View>

            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                onSignin({ email, password });

                // navigation.navigate("Profile");
              }}
            >
              <Text style={[styles.textStyle, { color: "#FFFFFF" }]}>
                LOGIN
              </Text>
            </TouchableOpacity>

            {/* <View style={styles.exit}>
          <Text style={{ color: "#927E5A", fontSize: 15 }}>OR</Text>
        </View> */}

            {/* <View style={{ margin: 10 }}>
              <Text style={styles.textStyle}>OR</Text>
            </View> */}

            <TouchableOpacity
              style={styles.buttonStyle}
              // style={styles.forgetPassword}

              onPress={() => navigation.navigate("SignUp")}
            >
              <Text style={[styles.textStyle, { color: "#FFFFFF" }]}>
                SIGN UP 
              </Text>
            </TouchableOpacity>
            <View style={{ alignSelf: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  {
                    navigation.navigate("Forget");
                  }
                }}
              >
                <Text
                  style={[
                    styles.textStyle,
                    { textDecorationLine: "underline", color: "#FFFFFF" },
                  ]}
                >
                  Forgot Password
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.textCopy}>
              <Text
                style={[styles.textStyle, { color: "#C4C4C4", marginTop: 20 }]}
              >
                © 2023 Be VIP. All Rights Reserved
              </Text>
            </View>
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
    marginBottom: 25,
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
    // margin: 5,
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
