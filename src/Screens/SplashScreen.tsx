import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Animated
} from "react-native";
import React, { useState, useContext,  } from "react";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
type Stack = {
  home: undefined;
  Splash: undefined;
  Person: undefined;
};
const Stack = createNativeStackNavigator<Stack>();

type NavigationSplashProps = NativeStackScreenProps<Stack, "Splash">;

type SplashScreenProps = {
  navigation: NavigationSplashProps["navigation"];
};



const SplashScreen = ({ navigation }: SplashScreenProps) => {
    const [fade, setFade] = useState(new Animated.Value(0));
 

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
            source={require("../../assets/Image/Vip.png")}
            style={{
              marginTop: 88,
              marginRight: 116,
              marginLeft: 115,

              width: 183,
              height: 173,
            }}
          />
        </View>
        <View style={{ alignSelf: "center" }}>
          <Animated.Image
            source={require("../../assets/Image/vp.png")}
            style={{
              marginTop: 88,
              marginRight: 116,
              marginLeft: 115,
              width: 300,
              height: 205,
            
            }}
          />
          
        </View>
      </View>
    </>
  );
};

export default SplashScreen;

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
    width: 333,
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
