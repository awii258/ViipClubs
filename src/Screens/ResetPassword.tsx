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

import { Context as GG } from "../Context/Actions";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NavigationContainer } from "@react-navigation/native";
type Stack = {
  Login: undefined;
  Splash: undefined;
  Person: undefined;
  Profile: undefined;
  Forget: undefined;
  Resets: undefined;
};
const Stack = createNativeStackNavigator<Stack>();

type NavigationLoginProps = NativeStackScreenProps<Stack, "Login">;

type LoginScreenProps = {
  navigation: NavigationLoginProps["navigation"];
};

const ResetPassword = ({ navigation }: LoginScreenProps) => {
  const { state, onSignin, errorMessage } = useContext(GG);
  const { msg } = state;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { state, signin } = useContext(AuthContext);
  const [checked, setChecked] = useState(false);

  return (
    <>
      <KeyboardAwareScrollView style={styles.container}>
        <View>
          <StatusBar
            translucent
            backgroundColor="#080402"
            barStyle="light-content"
          />
          <View>
            <Image
              resizeMode="contain"
              source={require("../../assets/Image/WLogo.png")}
              style={{
                alignSelf: "center",
                width: 294.72,
                height: 185.9,
                // position: "absolute",
                // top: 30,
                margin: 55,
              }}
            />
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              selectionColor={"#927E5A"}
              placeholder="Email address"
              placeholderTextColor={"#927E5A"}
              onChangeText={setEmail}
              value={email}
            />
          </View>

          <View>
            {/* <Text style={{ backgroundColor: "white", fontSize: 30 }}>Awaiz</Text> */}
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              selectionColor={"#927E5A"}
              placeholder="New password"
              placeholderTextColor={"#927E5A"}
              onChangeText={setPassword}
              value={password}
            />
          </View>
          <View>
            {/* <Text style={{ backgroundColor: "white", fontSize: 30 }}>Awaiz</Text> */}
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              placeholder="Confirm new password"
              selectionColor={"#927E5A"}
              placeholderTextColor={"#927E5A"}
              onChangeText={setPassword}
              value={password}
            />
          </View>

          <View style={styles.buttonStyle}>
            <TouchableOpacity
              style={styles.buttonDesign}
              onPress={() => {
                navigation.navigate("Resets");
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
                Reset My Password
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080402",
  },
  input: {
    margin: 10,
    height: 50,
    borderColor: "#927E5A",

    padding: 10,
    color: "#927E5A",
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
