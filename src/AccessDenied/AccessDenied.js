import {
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    TextInput,
    TouchableOpacity,Dimensions,SafeAreaView,Animated, Easing ,
  } from "react-native";

  import { Context as Actions } from "../Context/Actions";
  import Lottie from 'lottie-react-native';
  import React, { useState, useContext,useRef,useEffect } from "react";
  import ImageOverlay from "react-native-image-overlay";
  
  import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
  import {
    createNativeStackNavigator,
    NativeStackScreenProps,
  } from "@react-navigation/native-stack";
  import AppLoading from "expo-app-loading";
  import { NavigationContainer } from "@react-navigation/native";

  const AccessDenied = ({ navigation,route }) => {
   
const {clubname}=route.params
    
    const { state, onNew, Logout, onClub, LoadToken,verifyButton } = useContext(Actions);
    useEffect(() => {
      onNew();
      // console.log("hi");
    }, []);
   

    const name = state?.pro?.data.first_name || "";
    const lastname = state?.pro?.data.last_name || "";
    const tiers= state?.pro?.data.tier.name || "";
    // //   const { state, onSignin, errorMessage, onForgot } = useContext(GG);
    //   const { msg } = state;
    const animationProgress = useRef(new Animated.Value(0))

    useEffect(() => {
      Animated.timing(animationProgress.current, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: false
      }).start();
    }, [])
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
        <SafeAreaView style={styles.container}>
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
          <View style={{ alignSelf: "center",flex:1,justifyContent:'center',marginBottom:"32%"}}>
            <Text
              style={{
                color: "#B79D71",
                fontSize: 24,
                fontFamily: "OpenSans-SemiBold",
                alignSelf: "center",
                marginTop: 39,
                fontWeight:'600',
              }}
            >
              {" "}
              {tiers}
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
              ACCESS GRANTED
            </Text>
          <View style={{width:280,height:180,justifyContent:'center',alignSelf:'center',}}>
            <Lottie
      source={require('../../assets/Image/access.json')}
      style={{width:250,height:250,alignSelf:'center'}}
     autoPlay
/></View>
            {/* <Image
              source={require("../../assets/Image/Error.gif")}
              style={{
                marginTop: 16,
                marginRight: 116,
                marginLeft: 115,
                alignSelf: "center",
                width: 158,
                height: 158,
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
               {name} {lastname}
              </Text>
              <Text style={{
                  color: "#B79D71",
                  fontSize: 24,
                  fontFamily: "OpenSans-Regular",
                }}>+1</Text>
              <Text
                numberOfLines={2}
                adjustsFontSizeToFit
                style={{
                  color: "#B79D71",
                  fontSize: 24,
                  fontFamily: "OpenSans-SemiBold",
                  fontWeight:'bold',
                  padding: 10,
                  textAlign: "center",
                  marginTop:10
                }}
              >
                 Welcome! Be VIP Member
              </Text>
            </View>
           {clubname? <View style={styles.buttonStyle}>
              <TouchableOpacity
                style={styles.buttonDesign}
                onPress={() => {
                  verifyButton(true);
                  navigation.navigate("Qr",{clubname:"club"});
                }}
              >
                <Text
                  style={{
                    color: "#000",
                    alignSelf: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    fontFamily: "OpenSans-SemiBold",
                  }}
                >
                  Done
                </Text>
              </TouchableOpacity>
            </View>: <View style={styles.buttonStyle}>
              <TouchableOpacity
                style={styles.buttonDesign}
                onPress={() => {
                  verifyButton(true);
                  navigation.navigate("Queue Jump");
                }}
              >
                <Text
                  style={{
                    color: "#000",
                    alignSelf: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    fontFamily: "OpenSans-SemiBold",
                  }}
                >
                  Done
                </Text>
              </TouchableOpacity>
            </View>}
          </View>
          </ImageOverlay>
        </SafeAreaView>
      </>
    );
  };
  
  export default AccessDenied;
  
  const styles = StyleSheet.create({
    container: {
      // flex: 1,
    //   backgroundColor: "#080402",
    // margin:30,
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
      width:280,
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
 
  