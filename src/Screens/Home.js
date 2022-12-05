import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  Linking,
} from "react-native";

import React, { useContext, useEffect, useState } from "react";
import { Context as Actions } from "../Context/Actions";
import { Foundation } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import PromotionScreen from "../Components/PromotionScreen";
import { AntDesign } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AffiliateService } from "../api/AffiliateService";
import { SliderBox } from "react-native-image-slider-box";

const Home = ({ route }) => {
  const navigation = useNavigation();
  let [fontLoaded, error] = useFonts({
    Inter_900Black,
    "Baskervville-Regular": require("../../assets/fonts/Baskervville-Regular.ttf"),
    "OpenSans-SemiBold": require("../../assets/fonts/OpenSans-SemiBold.ttf"),
    "Inter-Regular": require("../../assets/fonts/Inter-Regular.ttf"),
    "OpenSans-Regular": require("../../assets/fonts/OpenSans-Regular.ttf"),
  });

  // if (!fontLoaded) {
  //   return <AppLoading />;
  // }

  const { itemId, itemname } = route.params;
  const [book, setBook] = useState(true);
  const [contact, setContact] = useState(false);
  const [promotion, setPromotion] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    onProfile();
    // console.log("hi");
  }, []);

  const { state, onProfile, Logout, onClub, onToggleSaveAffiliate } =
    useContext(Actions);

  const [click, setClick] = useState(g?.is_saved);

  const favButton = async (id) => {
    const toggle = await onToggleSaveAffiliate(id);
    // console.log("ID====================affiliate id", id);
    //  console.log("toggle================", toggle);
    setClick(!click);
  };

  // console.log("Onprofile============================ ", state.users);

  useEffect(() => {
    onClub();
    // console.log("hi");
  }, []);

  const g = state.club;
  let city = itemId;
  // console.log("ali", city);
  useEffect(() => {
    onClub(city);
    // console.log("hi");
  }, []);

  // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>?????????",city)
  // const d = g.filter((el,i)=> el.id == city  )
  // console.log("................>>>>>", g?.name);
  // const obj = Object.assign({}, state.users);
  // console.log('hshdkfjslkdjflds????',obj)
  // console.log(">>>>>>>>>>>>>>>>>>????>>>>???", state.club?.data.description);
  // console.log("awaiz", state.users);
  const [tab, setActivetab] = useState();
  const a = (ab) => {
    if (ab == "book") {
      setBook(true);
      setPromotion(false);
      setContact(false);
    }
    if (ab == "promotion") {
      setBook(false);
      setPromotion(true);
      setContact(false);
    }
    if (ab == "contact") {
      setBook(false);
      setPromotion(false);
      setContact(true);
    }
  };
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: "#000000",
          height: "100%",
          borderTopWidth: 1,
          borderTopColor: "#927E5A",
        }}
      >
        <StatusBar
          translucent
          backgroundColor="#080402"
          barStyle="light-content"
        />
        {/* <Image
          source={{ uri: g?.image }}
          style={{ width: 414, height: 320 }}
        /> */}
        <View style={{ width: 414, height: 320 }}>
          <SliderBox
            images={{ uri: g?.image }}
            sliderBoxHeight={200}
            onCurrentImagePressed={(index) =>
              console.warn(`image ${index} pressed`)
            }
            dotColor="#927E5A"
            inactiveDotColor="#C4C4C4"
            autoplay
            circleLoop
            dotStyle={{
              width: 8,
              height: 8,
              borderRadius: 360,
              marginHorizontal: 10,
              padding: 0,
              margin: 0,
            }}
          />
        </View>
        {click ? (
          <TouchableOpacity
            onPress={() => favButton(g?.id)}
            style={{ marginTop: hp("-5%"), alignItems: "flex-end", margin: 15 }}
          >
            <AntDesign name="heart" size={24} color="#927E5A" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => favButton(g?.id)}
            style={{ marginTop: hp("-5%"), alignItems: "flex-end", margin: 15 }}
          >
            <AntDesign name="hearto" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        )}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            style={book ? styles.buttonDesign : styles.buttonDesign1}
            onPress={() => {
              a("book");
            }}
          >
            <Text style={book ? styles.text1 : styles.text}>What's On</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={contact ? styles.buttonDesign : styles.buttonDesign1}
            onPress={() => {
              a("contact");
            }}
          >
            <Text style={contact ? styles.text1 : styles.text}>Contact</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={promotion ? styles.buttonDesign : styles.buttonDesign1}
            onPress={() => {
              a("promotion");
            }}
          >
            <Text style={promotion ? styles.text1 : styles.text}>Promotion</Text>
          </TouchableOpacity> */}
        </View>

        {/* <View>
        <Text
          style={{
            color: "white",
            fontSize: 15,
            fontWeight: "400",
            justifyContent: "center",
            alignSelf: "center",
            color: "#927E5A",
            marginTop:15,
          }}
        >
          {g?.description}
        </Text>
      </View> */}
        {book ? <PromotionScreen /> : null}
        {/* {promotion ? (
          <View></View>
        ) : null} */}
        {contact ? (
          <View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 15,

                // padding: 5,
                position: "relative",
                left: 20,
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
                source={require("../../assets/Image/phone.png")}
              />

              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "400",
                  justifyContent: "center",
                  color: "#927E5A",
                  marginLeft: 18,
                  padding: 5,
                  fontFamily: "OpenSans-Regular",
                }}
              >
                {g?.phone}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                alignItems: "center",
                position: "relative",
                left: 20,
              }}
            >
              <Image
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
                source={require("../../assets/Image/email.png")}
              />
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "400",
                  color: "#927E5A",
                  marginLeft: 18,
                  padding: 5,
                  fontFamily: "OpenSans-Regular",
                }}
              >
                management@dollhousevip.com
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                // marginLeft: 30,
                // padding: 5,
                position: "relative",
                left: 20,
              }}
            >
              <Image
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
                source={require("../../assets/Image/www.png")}
              />
              <Text
                numberOfLines={3}
                adjustsFontSizeToFit
                style={{
                  fontSize: 15,
                  fontWeight: "400",
                  textAlign: "justify",
                  color: "#927E5A",
                  marginLeft: 18,
                  marginHorizontal: 30,

                  fontFamily: "OpenSans-Regular",
                }}
              >
                {g?.website}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                alignItems: "center",
                position: "relative",
                left: 20,
              }}
            >
              <Image
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
                source={require("../../assets/Image/location.png")}
              />
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "400",
                  color: "#927E5A",
                  marginLeft: 18,
                  padding: 5,
                  fontFamily: "OpenSans-Regular",
                }}
              >
                {g?.address1}
              </Text>
            </View>

            {/* <View
              style={{
                alignItems: "center",
                marginTop: 15,
                position: "relative",
                bottom: 0,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "600",

                  color: "#927E5A",
                  fontFamily: "OpenSans-SemiBold",
                }}
              >
                Follow Us
              </Text>
            </View> */}
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "center",
                position: "relative",
                bottom: 5,
              }}
            >
              <TouchableOpacity onPress={() => Linking.openURL(g?.facebook)}>
                <MaterialCommunityIcons
                  name="facebook"
                  size={30}
                  color="#927E5A"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Entypo
                  name="instagram-with-circle"
                  size={30}
                  color="#927E5A"
                  style={{ marginLeft: 5 }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL(g?.twitter)}>
                <Entypo
                  name="twitter-with-circle"
                  size={30}
                  color="#927E5A"
                  style={{ marginLeft: 5 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 20,
          flex: 1,
          alignSelf: "center",
          // backgroundColor: "#927E5A",
          // width: "100%",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              width: 185,
              height: 50,
              backgroundColor: "#927E5A",

              justifyContent: "center",
              alignItems: "center",
              margin: 5,
              borderRadius: 5,
            }}
            onPress={() => navigation.navigate("Venue")}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: "OpenSans-SemiBold",
                color: "#000000",
              }}
            >
              Book Venue
            </Text>
          </TouchableOpacity>

          <View
            style={{
              height: "100%",
              width: 1,
              backgroundColor: "#000000",
              alignSelf: "center",
            }}
          ></View>

          <TouchableOpacity
            style={{
              width: 185,
              height: 50,
              backgroundColor: "#927E5A",
              justifyContent: "center",
              alignItems: "center",
              margin: 5,
              borderRadius: 5,
            }}
            onPress={() => navigation.navigate("Qr")}
          >
            <Text
              style={{
                fontSize: 20,

                marginRight: 15,
                color: "#000000",
                fontFamily: "OpenSans-SemiBold",
              }}
            >
              Queue Jump
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  buttonDesign: {
    backgroundColor: "#927E5A",
    width: 170,
    height: 51,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#927E5A",
  },
  buttonDesign1: {
    backgroundColor: "#000000",
    width: 170,
    height: 51,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#927E5A",
  },
  buttonDesign2: {
    backgroundColor: "#000000",
    width: 125,
    height: 48,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#927E5A",
  },
  text: {
    alignSelf: "center",
    fontSize: 16,
    color: "#927E5A",
    fontFamily: "Inter-Regular",
  },
  text1: {
    alignSelf: "center",
    fontSize: 16,
    color: "#FFFFFF",
    fontFamily: "Inter-Regular",
  },
});
