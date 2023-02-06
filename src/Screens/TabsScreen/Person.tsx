import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
  StatusBar,
  Dimensions,
  SafeAreaView,
  Modal,
  Pressable,
  Alert,
  Platform,
} from "react-native";

import React, { useContext, useEffect, useMemo, useState } from "react";
import { Context as Actions } from "../../Context/Actions";
import { EvilIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MaterialIcons } from "@expo/vector-icons";
import ImageOverlay from "react-native-image-overlay";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import moment from "moment";

import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import GeoLocation from "../../Components/GeoLocation";

type Stack = {
  Login: undefined;
  Splash: undefined;
  Person: undefined;
  Profile: undefined;
  Forgets: undefined;
};
const Stack = createNativeStackNavigator<Stack>();

type NavigationLoginProps = NativeStackScreenProps<Stack, "Person">;

type LoginScreenProps = {
  navigation: NavigationLoginProps["navigation"];
};

const Person = ({ route }) => {

  //  const [loaded] = useFonts({
  //    Baskervville: require("../../../assets/fonts/Baskervville-Regular.ttf"),
  //  });

  //   if (!loaded) {
  //     return null;
  //   }
  const { state, onNew, Logout, onClub, LoadToken, onGetProfile,verifyButton,onRefresh  } =
    useContext(Actions);

  const navigation = useNavigation();

 
  // useMemo(() => {
  //   onNew();
  // }, []);
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [isLoading, setIsLoding] = useState(true);
  const [age, setAge] = useState("");

  useEffect(() => {
    console.log("inside useeffect");
    if (state && state.pro && state.pro.data) {
      console.log("insdie if condition");
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Data Changed");
      console.log("first name: ", state.pro.data.first_name);
      setName(state.pro.data.first_name);
      setLastName(state.pro.data.last_name);
      setEmail(state.pro.data.email);
      setLocation(state.pro.data.location);
      setDate(state.pro.data.date_of_birth);
      console.log("DOB: ", state.pro.data.date_of_birth);
      // onGetProfile()
      setIsLoding(false);
    }
  }, [state?.pro?.data]);

  useFocusEffect(
    React.useCallback(() => {
      console.log(
        "====================================Screen focused======================="
      );
      onNew();
      verifyButton(false);
      // onGetProfile()
    }, [])
  );



  // console.log("................>>>>>gwaizhuillstaion", state.pro);

  // useEffect(() => {
  //   onClub();
  //   console.log("hi");
  // }, []);

  // const g = state.club;
  // console.log("hello mir imran>>>>>>>>>>>>>>>>>>>>>",g);
  // useEffect(() => {
  //   onClub();
  //   console.log("hi");
  // }, []);

  //const formattedDate = moment(date).format("MMMM d, YYYY");

  // const name = state?.pro?.data.first_name || "";
  // const lastname = state?.pro?.data.last_name || "";
  // const email = state?.pro?.data.email || "";
  // const location = state?.pro?.data.location || "";
  // const image = state?.pro?.data.image || "";
  const [modalVisible, setModalVisible] = useState(false);
  // const dest= state.pro?.data.destination;
  // console.log("destination ================", dest);

  // console.log(" i am  new date", formattedDate);
  // const date = state?.pro?.data.date_of_birth || "";
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
    if (date) {
      const tempAge = calculate_age(date);
      setAge(tempAge);
    }
  }, [date]);

  const LogoutHandler = () => {
    // console.log("inside logout handler >>>>>>>>>>>>>>>>>>")
    Logout();
    LoadToken("pakistan zinda baad");
    // navigation.navigate("Home");
    navigation.navigate("home");

    // console.log("End of logout handler >>>>>>>>>>>>>>>>>>>")
  };
  // console.log("Token new >>>>>>>>>>>",state.token)

  useEffect(() => {
    onNew();
    // console.log("hi");
  }, []);
  
  return (
    <>
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
        source={require("../../../assets/Image/homeScreenBG.jpg")}
      >
        <View
          style={{
            flex: 3,
            width: "100%",
            flexDirection: "column",
            justifyContent: "space-between",
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
                // marginTop:25
              }}
            >
              <Image
                resizeMode="cover"
                source={{ uri: state.pro?.data.image }}
                style={styles.imageStyle}
              />
            </View>

            <View style={styles.textContainer}>
              <Text
                style={[
                  styles.textStyle,
                  { fontSize: 24, fontFamily: "BaskervilleRegular" },
                ]}
              >
                {name}
                <Text> {lastname} </Text>
              </Text>

              <Text style={styles.textStyle}>
                Location:
                <Text style={styles.textStyle}> {location} </Text>
              </Text>

              <Text style={styles.textStyle}>
                Email:
                <Text style={styles.textStyle}> {email}</Text>
              </Text>

              <Text style={styles.textStyle}>
                Age:
                <Text style={styles.textStyle}> {age} Years </Text>
              </Text>

              <View style={styles.subscriptionContainer}>
                <Text
                  style={[
                    styles.textStyle1,
                    { color: "#000000", textAlignVertical: "center" },
                  ]}
                >
                  {(state.pro?.data.tier && state.pro?.data.tier.name) ||
                    "No Membership"}
                </Text>
              </View>
            </View>
          </View>
          {/* <Image
                  source={require("../../../assets/Image/vip-frmae.png")}
                  style={{ height: 282, width: 250, alignSelf: "center",}}
              
              /> */}

          <View style={{ flex: 1, justifyContent: "center" }}>
            <View style={{ flex: 3, justifyContent: "space-evenly" }}>
              <Image
                source={require("../../../assets/Image/vip-frmae-new.png")}
                style={{
                  height: 242,
                  width: 163,
                  alignSelf: "center",
                  // marginTop: 25,
                  // marginBottom: 25,
                }}
              />

              {/* <Image
          source={require("../../../assets/Image/gcj.png")}
          style={{ height: 117, width: 400, alignSelf: "center" }}
        /> */}

              <View>
                <View
                  style={{
                    // flex:0.1,
                    flexDirection: "row",
                    // marginTop: hp("2%"),
                    justifyContent: "center",
                    position: "relative",
                    bottom: 10,
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL("https://www.facebook.com/bevipblackcard/")
                    }
                  >
                    {/* <MaterialCommunityIcons
                  name="facebook"
                  size={35}
                  color="#927E5A"
                /> */}
                    {/* <Entypo name="facebook-with-circle" size={35} color="#927E5A" /> */}
                    <FontAwesome5 name="facebook" size={35} color="#927E5A" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(
                        "https://www.instagram.com/bevipblackcard"
                      )
                    }
                  >
                    <Entypo
                      name="instagram-with-circle"
                      size={38}
                      color="#927E5A"
                      style={{ marginLeft: 5 }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(
                        "https://www.tiktok.com/@bevipclothing?_t=8ZSytp00T4v&_r=1"
                      )
                    }
                  >
                       <Image
                style={{
                 
                  height: 36.5,
                  width: 45,
           
                }}
                resizeMode="contain"
                source={require("../../../assets/Image/tiktok.png")}
              />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Favourite")}
                  style={[styles.pressableButton]}
                >
                   <Image
                source={require("../../../assets/Image/favorites.png")}
                style={{
                  // marginRight: hp("5%"),
                  width: 28,
                  height: 24.5,
                  tintColor: "#927E5A",
                  // backgroundColor:'red',
                
                }}
              />
                  <Text
                    style={[styles.textStyle, { color: "#927E5A", left: 5 }]}
                  >
                    Favourites
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{}}>
                <TouchableOpacity
                  onPress={LogoutHandler}
                  style={[styles.pressableButton]}
                >
                  <MaterialIcons
                    style={{ alignItems: "center" }}
                    name="logout"
                    size={20}
                    color="#927E5A"
                  />
                  <Text
                    style={[styles.textStyle, { color: "#927E5A", left: 5 }]}
                  >
                    Logout
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            // alignItems: "center",
            width: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row-reverse",
              alignItems: "center",
              justifyContent: "space-evenly",
              
            }}
          >
            <TouchableOpacity
              style={{}}
              onPress={() => navigation.navigate("EditProfile")}
            >
              {/* <EvilIcons name="pencil" size={20} color="#FFFF" /> */}
              <Text style={[styles.textStyle, { color: "#857878" }]}>
                Edit Profile
              </Text>
            </TouchableOpacity>

            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.textStyle3}>Terms and Conditions</Text>
            </Pressable>
          </View>
        </View>
        {/* <GeoLocation /> */}
      </ImageOverlay>
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
                experienced in regards to admittance into any of our affiliates
                venues or events. Our affiliates management and door
                supervisor/security teams reserve the right without any
                explanation, to refuse admittance or service to any guest. If
                you are unsure, before you leave your home / accommodation,
                always check the specific venues door policies, entry
                information, dress code and accessibility. (You can get this
                information by checking each specific venues T&Cs or contacting
                them directly) Once you are admitted into any affiliates venue,
                the terms and conditions of each individual affiliates venue are
                to be followed in there entirety.
              </Text>
              <Pressable
                style={[styles.button1, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle2}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default Person;

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    // flex:1,
    // marginLeft:23,
    // marginRight:23,

    // alignSelf:"center",
    // marginTop:hp("10%"),
    // marginTop: Platform.OS === "ios"? hp("6.3%"):hp("7.6%"),
    // backgroundColor:'red',
    width: "100%",
    paddingTop: 12,
    paddingBottom: 12,
    // margin:23,
    // backgroundColor:"aqua"
  },

  textStyle: {
    color: "#927E5A",
    fontFamily: "OpenSansRegular",
    fontSize: 12,
    marginTop: 2.5,
  },
  textStyle1: {
    color: "#927E5A",
    fontFamily: "OpenSansRegular",
    fontSize: 14,
  },
  imageStyle: {
    marginTop: 10,
    height: 150,
    width: 150,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#927E5A",
  },

  textContainer: {
    // marginLeft:8
    // backgroundColor:"yellow"
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
  pressableButton: {
    // flex:8,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    // marginBottom:25
    // marginTop: Platform.OS === "ios" ? hp("3%") : hp("1%"),
    // marginTop: hp("1.5%"),
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 25,
    // alignSelf:"center"
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
    padding: 2,

    // position:"relative",
    // bottom:100
    // marginTop:5,
    //     marginBottom:10,
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
    // backgroundColor: "#927E5A",
  },
  buttonClose: {
    backgroundColor: "#927E5A",
  },
  textStyle2: {
    // color: "#000",
    // fontWeight: "bold",
    // textAlign: "center",
    // fontFamily: "OpenSansRegular",
    // fontSize: 14,
    // marginTop: 2.5,
    fontSize: 12,

    // marginRight: 15,
    color: "#FFFFFf",
    fontFamily: "OpenSansRegular",
    // textTransform: "uppercase",
  },
  textStyle3: {
    // color: "#000",
    // fontWeight: "bold",
    // textAlign: "center",
    // fontFamily: "OpenSansRegular",
    // fontSize: 14,
    // marginTop: 2.5,
    fontSize: 12,

    // marginRight: 15,
    color: "#857878",
    fontFamily: "OpenSansRegular",
    // textTransform: "uppercase",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "#927E5A",

    fontFamily: "OpenSansRegular",
    fontSize: 14,
  },
  Column: {
    // flex:2,
    //  flex:Platform.OS ==='ios'?0.46:0.46,
    justifyContent: "space-between",
    flexDirection: "column",
    // backgroundColor:'aqua'
    // position:'relative',
    // bottom:0
  },
});
