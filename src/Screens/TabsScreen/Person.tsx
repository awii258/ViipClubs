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
} from "react-native";
import React, { useContext, useEffect } from "react";
import { Context as Actions } from "../../Context/Actions";
import { EvilIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MaterialIcons } from "@expo/vector-icons";
import ImageOverlay from "react-native-image-overlay";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
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
  const { state, onNew, Logout, onClub, LoadToken } = useContext(Actions);

  const navigation = useNavigation();

  useEffect(() => {
    onNew();
    // console.log("hi");
  }, []);

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
  const name = state?.pro?.data.first_name || "";
  const lastname = state?.pro?.data.last_name || "";
  const email = state?.pro?.data.email || "";
  const location = state?.pro?.data.location || "";
  const image = state?.pro?.data.image || "";

  // const dest= state.pro?.data.destination;
  // console.log("destination ================", dest);

  // console.log(" i am  new date", formattedDate);
  const date = state?.pro?.data.date_of_birth || "";
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
  const age = calculate_age(date);

  const LogoutHandler = () => {
    // console.log("inside logout handler >>>>>>>>>>>>>>>>>>")
    Logout();
    LoadToken("pakistan zinda baad");
    // navigation.navigate("Home");
    navigation.navigate("Home");

    // console.log("End of logout handler >>>>>>>>>>>>>>>>>>>")
  };
  // console.log("Token new >>>>>>>>>>>",state.token)
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="#080402"
        barStyle="light-content"
      />
       <ScrollView
        contentContainerStyle={{ paddingBottom: 0 }}
        showsVerticalScrollIndicator={false}
        >
      <ImageOverlay
        overlayColor="#000000"
        //  "#19282F"
        overlayAlpha={0.8}
        height={Dimensions.get("window").height}
        source={require("../../../assets/Image/homeScreenBG.jpg")}
      >
       
          <View style={{ alignItems: "center" }}>
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
                    {state.pro?.data.tier.name}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Image
                source={require("../../../assets/Image/vip-frmae.png")}
                style={{ height: 282, width: 250, alignSelf: "center" }}
              />

              {/* <Image
          source={require("../../../assets/Image/gcj.png")}
          style={{ height: 117, width: 400, alignSelf: "center" }}
        /> */}
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: hp("2%"),
                justifyContent: "center",
                position: "relative",
                bottom: 5,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL("https://www.facebook.com/bevipclothing/")
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
                  Linking.openURL("https://www.instagram.com/bevipclothing/")
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
                  Linking.openURL("https://www.instagram.com/bevipclothing/")
                }
              >
                <Entypo
                  name="twitter-with-circle"
                  size={35}
                  color="#927E5A"
                  style={{ marginLeft: 5 }}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={LogoutHandler}
              style={styles.pressableButton}
            >
              <MaterialIcons
                style={{ alignItems: "center" }}
                name="logout"
                size={20}
                color="#927E5A"
              />
              <Text style={[styles.textStyle, { color: "#927E5A", left: 5 }]}>
                Logout
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
              }}
              onPress={() => navigation.navigate("Profiles")}
            >
              <EvilIcons name="pencil" size={20} color="#FFFF" />
              <Text
                style={[
                  styles.textStyle,
                  { color: "#FFFF", textDecorationLine: "underline" },
                ]}
              >
                Edit Profile
              </Text>
            </TouchableOpacity>
          </View>

        {/* <GeoLocation /> */}
      </ImageOverlay>
      </ScrollView>

    </>
  );
};

export default Person;

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    // marginLeft:23,
    // marginRight:23,

    // alignSelf:"center",
    marginTop: hp("-12%"),
    // backgroundColor:'red',
    width: "100%",
    // margin:23,
  },
  textStyle: {
    color: "#927E5A",
    fontFamily: "OpenSansRegular",
    fontSize: 14,
    marginTop: 2.5,
  },
  textStyle1: {
    color: "#927E5A",
    fontFamily: "OpenSansRegular",
    fontSize: 14,
  },
  imageStyle: {
    height: 150,
    width: 150,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#927E5A",
  },
  textContainer: {
    // marginLeft:8
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
  pressableButton: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    marginTop: hp("1.5%"),
  },
});
