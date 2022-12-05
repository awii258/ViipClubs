import { usePreventScreenCapture } from "expo-screen-capture";

import React, { useState, useEffect, useContext } from "react";

import {
  Text,
  View,
  StyleSheet,
  Button,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import Test from "../Test";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BarCodeScanner } from "expo-barcode-scanner";

import { useNavigation, useFocusEffect } from "@react-navigation/native";
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
import { Icon } from "native-base";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

// const Pulse = ({ repeat }) => {
//   const animation = useSharedValue(0);

//   // We repeatedly doing shared value from 0 to 1
//   useEffect(() => {
//     animation.value = withRepeat(
//       withTiming(1, {
//         duration: 2000,
//         easing: Easing.linear,
//       }),
//       -1,
//       false
//     );
//   }, []);
//   const animatedStyles = useAnimatedStyle(() => {
//     const opacity = interpolate(
//       animation.value,
//       [0, 1],
//       [0.6, 0],
//       Extrapolate.CLAMP
//     );
//     return {
//       opacity: opacity,
//       transform: [{ scale: animation.value }],
//     };
//   });
//   return <Animated.View style={[styles.circle, animatedStyles]} />;
// };
const Qrcode = ({ navigation, route }) => {
  usePreventScreenCapture();
  const { state, onGetProfile, Logout, onNew, onCheckInAffiliate } =
    useContext(Actions);

  useFocusEffect(
    React.useCallback(() => {
      console.log(
        "inside focus Checking Acess>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
      );
      if (state.pro.data.tier.name === "Free Membership") {
        navigation.navigate("Subscription");
      }
    }, [])
  );

  console.log(
    "Checking Acess>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
  );
  if (state.pro.data.tier.name === "Free Membership") {
    navigation.navigate("Subscription");
  }
  // const { id } = route.params
  // console.log("Showing id: ", id)
  // const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [membershipType, setMembershipType] = useState("");

  const calculate_age = (date) => {
    var today = new Date();
    var birthDate = new Date(date); // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    // console.log("age-------------------",age_now);
    return age_now;
  };

  useEffect(() => {
    if (state.pro.data) {
      setName(state?.pro?.data.first_name);
      setLastname(state?.pro?.data.last_name);
      setEmail(state?.pro?.data.email);
      setDate(state?.pro?.data.date_of_birth);
      setAge(calculate_age(state?.pro?.data.date_of_birth));
      setLocation(state?.pro?.data.location);
      setMembershipType(state?.pro?.data.tier.name);
    }
  }, [state.pro]);

  // const name = state?.pro?.data.first_name;
  // const lastname = state?.pro?.data.last_name;
  // const email = state?.pro?.data.email;
  // const date = state?.pro?.data.date_of_birth;
  const [modalVisible, setModalVisible] = useState(false);

  // const age = calculate_age(date);

  useEffect(() => {
    // try {
    if (membershipType !== "Free Membership") {
      onNew();
    }

    // }catch(error){
    //   navigation.navigate("Main")
    // }
  }, [membershipType]);

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
            {name}
            <Text> {lastname}</Text>
          </Text>

          <Text style={styles.textStyle}>
            Age:
            <Text style={styles.textStyle}> {age} Years </Text>
          </Text>

          <Text style={styles.textStyle}>
            Location:
            <Text style={styles.textStyle}> {location} </Text>
          </Text>

          {/* <Text style={styles.textStyle}>
            Email:
            <Text style={styles.textStyle}> {state?.pro?.data.email} </Text>
          </Text> */}

          <View style={styles.subscriptionContainer}>
            <Text
              style={[
                styles.textStyle1,
                { color: "#000000", textAlignVertical: "center", fontSize: 12 },
              ]}
            >
              {membershipType}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.NearView}>
        <Text style={styles.NearText}>Nearby Locations</Text>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  Be VIP are not to be held responsible for any problems
                  experienced in regards to admittance into any of our
                  affiliates venues or events. Our affiliates management and
                  door supervisor/security teams reserve the right without any
                  explanation, to refuse admittance or service to any guest. If
                  you are unsure, before you leave your home / accommodation,
                  always check the specific venues door policies, entry
                  information, dress code and accessibility. (You can get this
                  information by checking each specific venues T&Cs or
                  contacting them directly) Once you are admitted into any
                  affiliates venue, the terms and conditions of each individual
                  affiliates venue are to be followed in there entirety.
                </Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle1}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle1}>Terms & Conditions</Text>
        </Pressable>

        <View style={{ justifyContent: "flex-end" }}>
          <TouchableOpacity onPress={() => navigation.navigate("Favourite")}>
            <Image
              source={require("../../../assets/Image/favorites.png")}
              style={{ width: 38, height: 34, tintColor: "#927E5A" }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          // justifyContent: "center",
          // alignSelf: "center",
          // alignItems: "center",
          // marginTop: hp("9%"),
          // marginBottom: hp("20%"),
          // backgroundColor:"aqua",
          // width:"100%"
        }}
      >
        {membershipType !== "Free Membership" && <Test></Test>}
        {/* <QRCode
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
        <Pulse /> */}
      </View>
    </View>
  );
};
export default Qrcode;
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
    width: 180,

    height: 26,
    backgroundColor: "#927E5A",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  centeredView: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#000",
    borderRadius: 20,

    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    // position:"relative",
    // bottom:100

    // marginBottom:20,
    // width:150,
    // backgroundColor:"red"
  },
  buttonOpen: {
    backgroundColor: "#927E5A",
  },
  buttonClose: {
    backgroundColor: "#927E5A",
  },
  textStyle1: {
    // color: "#000",
    // fontWeight: "bold",
    // textAlign: "center",
    // fontFamily: "OpenSansRegular",
    // fontSize: 14,
    // marginTop: 2.5,
    fontSize: 14,

    // marginRight: 15,
    color: "#FFFFFF",
    fontFamily: "OpenSansRegular",
    textTransform: "uppercase",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "#927E5A",

    fontFamily: "OpenSansRegular",
    fontSize: 14,
  },
  NearText: {
    color: "#927E5A",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "OpenSansRegular",
    // backgroundColor:"yellow",
    textAlignVertical: "bottom",
  },
  NearView: {
    // flex:1,
    // alignItems:"flex-start"
    // marginLeft:hp("5%"),
    // marginTop:hp("5%"),
    marginTop: 20,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    // marginBottom:hp("5.5%"),
  },
});
