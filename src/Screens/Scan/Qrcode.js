

import React, { useState, useEffect, useContext } from "react";
import { AntDesign } from '@expo/vector-icons'; 

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
  StatusBar,
  SafeAreaView
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
import Spinner from 'react-native-loading-spinner-overlay';
import Constants from "expo-constants";
import { Ionicons } from '@expo/vector-icons'; 
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  Easing,
  Extrapolate,
  withRepeat,
} from "react-native-reanimated";
import ImageOverlay from "react-native-image-overlay";
import { NativeModules } from 'react-native';
import moment from "moment";
import { Icon } from "native-base";
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

  
  




const Qrcode = ({ navigation, route, }) => {
  const{clubname}=route.params
  const { state, onGetProfile, Logout, onNew, onCheckInAffiliate } =
    useContext(Actions);

  useFocusEffect(
    React.useCallback(() => {
      console.log(
        "inside focus Checking Acess>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
      );
      if (state?.pro?.data?.tier === null || state?.pro?.data?.tier?.name.includes("Free Membership")) {
        navigation.navigate("Subscription");
      }
    }, [])
  );

  
 
  console.log(
    "Checking Acess>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
  );
  if(state?.pro?.data?.tier === null || state?.pro?.data?.tier?.name.includes("Free Membership")){
    navigation.navigate("Subscription")
  }

  // const {clubname } = route.params
  // console.log("Showing id: ", clubname)
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
  const[isLoading, setIsLoading] = useState(true)
  
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
    if (state?.pro?.data) {
      setName(state?.pro?.data.first_name);
      setLastname(state?.pro?.data.last_name);
      setEmail(state?.pro?.data.email);
      setDate(state?.pro?.data.date_of_birth);
      setAge(calculate_age(state?.pro?.data.date_of_birth));
      setLocation(state?.pro?.data.location);
      setMembershipType(state?.pro?.data?.tier && state?.pro?.data?.tier?.name || "No Membership");
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
      // setIsLoading(false)
    }

    // }catch(error){
    //   navigation.navigate("Main")
    // }
  }, [membershipType]);
  // if(isLoading){
  //   return (
  //     <Spinner
  //     //visibility of Overlay Loading Spinner
  //     visible={isLoading}
  //     color={"#927E5A"}
  //     //Text with the Spinner
  //     textContent={'Loading...'}
  //     //Text style of the Spinner Text
  //     textStyle={styles.spinnerTextStyle}
  //   />
  //   )
  // }
  return (
    <>    
    <StatusBar
        translucent
        backgroundColor="#080402"
        barStyle="light-content"
      />
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#000000",
        // justifyContent: "space-between",
        // // alignItems:"center",
        // height: "100%",
        // borderTopWidth: 1,
        // borderTopColor: "#927E5A",
        // flexDirection: "column",
      }}
    >
    <View>
    <View style={styles.headerStyle}>
        <View
          style={{
            elevation: 5,
            shadowColor: "#927E5A",
            shadowOffset: { width: 3, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 30,
            // marginLeft:8,
            margin:0,
            padding:0

          }}
        >
          <Image
            resizeMode="cover"
            source={{ uri: state?.pro?.data?.image }}
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
            {state?.pro?.data?.first_name}
            <Text> {state?.pro?.data?.last_name}</Text>
          </Text>
          <Text style={styles.textStyle}>
                    Email:
                    <Text style={styles.textStyle}> {state?.pro?.data?.email}</Text>
                  </Text>
          <Text style={styles.textStyle}>
            Age:
            <Text style={styles.textStyle}> {age} Years </Text>
          </Text>
         

          <Text style={styles.textStyle}>
            Location:
            <Text style={styles.textStyle}> {state?.pro?.data?.location} </Text>
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
              {state?.pro?.data?.tier && state?.pro?.data?.tier?.name || "No Membership"}
            </Text>
          </View>
        </View>
      </View>
      </View>
   
     
   
      
      <View style={{flexDirection: "row",
    justifyContent:"space-between",
    alignItems: "center",
    padding:30
    // alignSelf:"center",
    // marginLeft: 23,
    // marginRight: 23,
   
    // marginTop: hp("6%"),
    // marginBottom: hp("5%"),
    // backgroundColor:"red",
    }}><View style={{flexDirection:'row',justifyContent:"space-evenly",alignItems:'center',}}>
      <TouchableOpacity  onPress={() => setModalVisible(!modalVisible)}>
<AntDesign name="infocirlce" size={16} color="#927E5A"

style={{marginRight:10}}
/></TouchableOpacity>
<Text style={styles.NearText}>Nearby Locations</Text>
</View>
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
                You will see our affiliates list nearby your current location. Once you click on the "Queue Jump" button for any venue, it will detect your current location and your location must be within 50 meters radius of the venue for access to be granted for you plus one Adult.
                </Text>
                <Pressable
                  style={[styles.button1, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle1}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
         
        </View>
<View
            style={{
            
 
              // justifyContent: "center",
              // alignItems: "flex-end",
        
            }}
          >
            
              {/* <Image
                source={require("../../../assets/Image/favorites.png")}
                style={{
                  // marginRight: hp("5%"),
                  width: 28,
                  height: 24.5,
                  tintColor: "#0000",
                  // backgroundColor:'red',
                
                }}
              /> */}
         
          </View>
         
        </View>
    
      {/* <View> 
      <View style={styles.NearView}>
        <Text style={styles.NearText}>Nearby Locations</Text>
      
          <View >
          <TouchableOpacity onPress={() => navigation.navigate("Favourite")}>
            <Image
              source={require("../../../assets/Image/favorites.png")}
              style={{ marginLeft:hp("5%"),width: 36, height: 32, tintColor: "#927E5A" }}
            />
          </TouchableOpacity>
        </View>

     
      </View>
      </View> */}
      
      <View
        style={{
          flex: 1,
          // justifyContent: "center",
          // alignSelf: "center",
          // alignItems: "center",
          // marginTop: hp("9%"),
          // marginBottom: hp("20%"),
          // backgroundColor:"red",
          // width:"100%"
        }}
      >
        {membershipType !== "Free Membership" &&  <Test clubname={clubname}/>}
       
        {/* <QRCode
          value={"state?.pro.data.tier.name"}
          color={"#ffffff"}
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
     
    </SafeAreaView>
    
    </>
  );
};
export default Qrcode;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 329,
    height: 320,width: "100%",

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
    marginTop: hp("10%"),
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
    // marginTop: hp("1%"),
    // flex:5,
    // marginTop: hp("3%"),
    // marginTop: Platform.OS === "ios"? hp("1.5"):hp("1.8%"),
    // marginTop: hp("6%"),
    // marginBottom: hp("100%"),
    // backgroundColor:"red",
    width: "100%",
    paddingTop:12,
    paddingBottom:12,
    // backgroundColor:"aqua"
  },

  // textContainer: {
  //   // backgroundColor:"green",
  //   marginBottom: Platform.OS === "ios" ?9:6,
  //   // padding:15,
  //   marginRight: Platform.OS === "ios" ?6.8:7,
  //   // backgroundColor:"yellow"
  // },
  textStyle: {
    color: "#927E5A",
    fontFamily: "OpenSansRegular",
    fontSize: 12,
    marginTop: 2.5,
  },
  imageStyle: {
    marginTop:10,
    height: 150,
    width: 150,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#927E5A",
    // marginTop:10
   
  },
  subscriptionContainer: {
    // width: 140,

    height: 26,
    backgroundColor: "#927E5A",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,

  },
  // subscriptionContainer1: {
  
   
  //   backgroundColor: "#927E5A",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   borderRadius: 5,
  //   marginTop: 10,
   
  // },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
    // marginTop: 100,
  },
  modalView: {
  //  flex:0.7,
        margin: 20,
    backgroundColor: "#000",
    borderRadius: 20,
    marginTop:"45%",
width:"100%",
height:"55%",
    padding: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    position: "relative",
    bottom: 100,

    // marginBottom:20,
    // width:150,
    // backgroundColor:"red"
  },
  button1: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,

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
    color: "#ffffff",
    fontFamily: "OpenSansRegular",
    fontSize: 14,
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
    // textAlignVertical:"top",
  },
  NearView: {
    // flex:1,
    // alignItems:"flex-start"
    // marginLeft:hp("5%"),
    // marginTop:hp("5%"),
    marginTop: 20,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    // alignSelf:"center",
    // marginLeft: 23,
    // marginRight: 23,
    // marginLeft: hp("5%"),
    // marginTop: hp("6%"),
    // marginBottom: hp("5%"),
    // backgroundColor:"red",
    width: "100%",
    // marginBottom:hp("5.5%"),
  },
});
