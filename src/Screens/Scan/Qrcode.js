
import { usePreventScreenCapture } from 'expo-screen-capture';

import React, { useState, useEffect, useContext, } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";
import QRCode from "react-native-qrcode-svg";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BarCodeScanner } from "expo-barcode-scanner";

import { useNavigation } from "@react-navigation/native";
import { Context as Actions } from "../../Context/Actions";
import Constants from "expo-constants";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  Easing,
  Extrapolate,
  withRepeat,
} from "react-native-reanimated";
import moment from "moment";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

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
export default function Qrcode({ route }) {
  usePreventScreenCapture();
  const { state, onGetProfile, Logout, onNew, onCheckInAffiliate } = useContext(Actions);
  // const { id } = route.params
  // console.log("Showing id: ", id)
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const name = state?.pro.data.first_name;
  const lastname = state?.pro.data.last_name;
  const email = state?.pro.data.email;
  const date = state?.pro.data.date_of_birth;
  const calculate_age = (date) => {
    var today = new Date();
    var birthDate = new Date(date);  // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    // console.log("age-------------------",age_now);
    return age_now;
  }
  const age = calculate_age(date);

  useEffect(() => {
    // try {
    onNew();

    // }catch(error){
    //   navigation.navigate("Main")
    // }
  }, []);





  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000000",
        justifyContent: "space-between",
        // alignItems:"center",
        height: "100%",
        borderTopWidth: 1,
        borderTopColor: "#927E5A",
        flexDirection: "column",
      }}
    >
      <View style={styles.headerStyle}>
        <View
          style={{
            elevation: 5,
            shadowColor: "#927E5A",
            shadowOffset: { width: 3, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 30,
          }}
        >
          <Image
            resizeMode="cover"
            source={{ uri: state?.pro.data.image }}
            style={styles.imageStyle}
          />
        </View>

        <View style={styles.textContainer}>
          <Text
            style={[
              styles.textStyle,
              { fontFamily: "BaskervilleRegular", fontSize: 24 },
            ]}
          >
            {state?.pro.data.first_name}
            <Text> {state?.pro.data.last_name}</Text>
          </Text>

          <Text style={styles.textStyle}>
            Age:
            <Text style={styles.textStyle}> {age} Years </Text>
          </Text>

          <Text style={styles.textStyle}>
            Location:
            <Text style={styles.textStyle}> {state?.pro.data.location} </Text>
          </Text>

          {/* <Text style={styles.textStyle}>
            Email:
            <Text style={styles.textStyle}> {state?.pro?.data.email} </Text>
          </Text> */}

          <View style={styles.subscriptionContainer}>
            <Text
              style={[
                styles.textStyle1,
                { color: "#000000", textAlignVertical: "center" },
              ]}
            >
              {state?.pro.data.tier.name}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignSelf: "center",
          alignItems: "center",
          // marginTop: hp("9%"),
          marginBottom: hp("20%"),
          // backgroundColor:"aqua",
          // width:"100%"
        }}
      >
        <QRCode
          value={state?.pro.data.tier.name}
          color={"#000000"}
          backgroundColor={"white"}
          size={200}
          logo={require("../../../assets/Image/awq.png")} // or logo={{uri: base64logo}}
          logoMargin={2}
          logoSize={20}
          logoBorderRadius={10}
          logoBackgroundColor={"transparent"}
        />
        <Image
          source={require("../../../assets/Image/vipq.png")}
          style={styles.innerCircle}
        />
        <Pulse />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 329,
    height: 320,
    // marginTop: 35,
  },
  circle: {
    width: 350,
    borderRadius: 150,
    height: 350,
    position: "absolute",
    borderColor: "#927E5A",
    borderWidth: 4,
    backgroundColor: "#927E5A",
  },
  innerCircle: {
    width: 325,

    height: 325,
    zIndex: 120,
    position: "absolute",
    // marginTop: hp("5%"),
  },
  headerProfile: {
    height: 200,
    flexDirection: "row",
  },
  headerStyle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    // alignSelf:"center",
    // marginLeft: 23,
    // marginRight: 23,
    marginTop: hp("5%"),
    // marginTop: hp("6%"),
    // marginBottom: hp("5%"),
    // backgroundColor:"red",
    width: "100%",
  },
  textContainer: {
    // backgroundColor:"green"
  },
  textStyle: {
    color: "#927E5A",
    fontFamily: "OpenSansRegular",
    fontSize: 14,
    marginTop: 2.5,
  },
  imageStyle: {
    height: 150,
    width: 150,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#927E5A",
  },
  subscriptionContainer: {
    width: 140,
    height: 26,
    backgroundColor: "#927E5A",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
});

