import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
 
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  Easing,
  Extrapolate,
  withRepeat,
} from "react-native-reanimated";
import * as geolib from "geolib";
import {
  useNavigation,
  CommonActions,
  useFocusEffect,
} from "@react-navigation/native";
import Lottie from "lottie-react-native";
import React, { useState, useContext, useRef, useEffect } from "react";
import MapView from "../AccessMap/MapView";

import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import { Context as Actions } from "../../Context/Actions";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
// import { ScrollView } from "native-base";

const Pulse = ({ repeat }) => {
  const animation = useSharedValue(0);

  // We repeatedly doing shared value from 0 to 1
  useEffect(() => {
    animation.value = withRepeat(
      withTiming(1, {
        duration: 2000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, []);
  const animatedStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      animation.value,
      [0, 1],
      [0.6, 0],
      Extrapolate.CLAMP
    );
    return {
      opacity: opacity,
      transform: [{ scale: animation.value }],
    };
  });
  return <Animated.View style={[styles.circle, animatedStyles]} />;
};
const VerifyingLocation = ({ navigation, route }) => {
  const { state, onAffiliate, clearOnProfile,onCheckInAffiliate  } = useContext(Actions);

  const { userlatitude, userlongitude, affiliateLatitude, affiliateLongitude, affiliateId,clubname } = route.params;
const[verify,setVerify]=useState(false)
 


// console.log("hello how are you", affiliateLatitude, affiliateLongitude,affiliateId)

  // console.log("latitude??????????", latitude);

  const animationProgress = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     navigation.replace("Uni");
  //   }, 5000);
  // }, []);
  useEffect(()=>{

    const temp =   geolib.isPointWithinRadius(
      { latitude: affiliateLatitude, longitude: affiliateLongitude },
      { latitude: userlatitude, longitude: userlongitude},
      50
    )
  
  console.log("show atempt veriable",temp)
    if(temp){
      onCheckInAffiliate(affiliateId);
      setTimeout(() => {
        navigation.replace("Uni",{clubname:clubname});
      }, 4000);
    }
    else{
      setTimeout(()=>{navigation.navigate("Ver",{clubname:clubname})},4000)
     
    }
  
  },[userlatitude, userlongitude, affiliateLatitude, affiliateLongitude ])
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
      
       <View style={{height:'25%',justifyContent:'flex-end'}}>
        <View style={{}}>
        <Text
          style={{
            color: "#B79D71",
            fontSize: 24,
            fontFamily: "OpenSans-SemiBold",
            alignSelf: "center",
            // marginTop: 39,
            fontWeight: "600",
            // margin:30
            // marginBottom: 20,
          }}
        >
          {" "}
          Verifying Location
        </Text>
        </View>
        <View style={{}}>
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

      <View style={{flex:1, justifyContent:'center',alignItems:'center',marginBottom:30}}>
        {/* <Lottie
      source={require('../../../assets/animation_lb1wwt8u.json')}
      progress={animationProgress.current}
/> */}
        <MapView latitude={userlatitude} longitude={userlongitude}></MapView>
        <Pulse/>
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
alignItems:'center',
// justifyContent:'center'
justifyContent:'space-between',
// paddingTop:120,
// paddingBottom:120

    // height: Dimensions.get("window").height,
    // flexDirection:"column",
    // justifyContent:"space-evenly"
    // justifyContent:"center"
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
  circle: {
    width: "100%",
    borderRadius: 300,
    height: 400,
    position: "absolute",
    borderColor: "#927E5A",
    borderWidth: 4,
    backgroundColor: "#927E5A",
    // justifyContent:'center',
    alignItems:'center',
   
  },
});
