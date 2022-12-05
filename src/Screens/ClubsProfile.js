// import { usePreventScreenCapture } from 'expo-screen-capture';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  Linking,
  Platform,
  Share,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Context as Actions } from "../Context/Actions";
import { Foundation } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import {
  useNavigation,
  CommonActions,
  useFocusEffect,
} from "@react-navigation/native";
import PromotionScreen from "../Components/PromotionScreen";
import { AntDesign } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AffiliateService } from "../api/AffiliateService";
import { SliderBox } from "react-native-image-slider-box";
import ClubsPromotionProfile from "../Components/ClubsPromotionProfile";

import Constants from "expo-constants";
// import Share from "react-native-share";
// const url = "https://awesome.contents.com/";
// const title = "Awesome Contents";
// const message = "Please check this out.";

// const options = {
//   title,
//   url,
//   message,
// };

const ClubsProfile = ({ route }) => {
  const {
    itemId,
    itemname,
    itemDescription,
    itemImages,
    itemSaved,
    itemPhone,
    itemEmail,
    itemWebsite,
    itemPostCode,
    itemCountry,
    itemRegion,
    itemAddress1,
    itemAddress2,
    itemlong,
    itemlat,
  } = route.params;
  console.log("item description clubprofile: ", itemDescription);
  const {
    state,
    onProfile,
    Logout,
    onClub,
    onToggleSaveAffiliate,
    onCheckInAffiliate,
    onEventsByClubs,
    clearFavProfile,
  } = useContext(Actions);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `http://www.google.com/maps/place/${itemlat},${itemlong}`,
        // url: 'https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en'
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const navigation = useNavigation();
  let [fontLoaded, error] = useFonts({
    Inter_900Black,
    "Baskervville-Regular": require("../../assets/fonts/Baskervville-Regular.ttf"),
    "OpenSans-SemiBold": require("../../assets/fonts/OpenSans-SemiBold.ttf"),

    "Inter-Regular": require("../../assets/fonts/Inter-Regular.ttf"),
    InterRegular: require("../../assets/fonts/Inter-Regular.ttf"),

    "OpenSans-Regular": require("../../assets/fonts/OpenSans-Regular.ttf"),
    OpenSansRegular: require("../../assets/fonts/OpenSans-Regular.ttf"),
  });

  // if (!fontLoaded) {
  //   return <AppLoading />;
  // }

  // const g = state?.club;

  const [g, setG] = useState("");

  const [book, setBook] = useState(true);
  const [contact, setContact] = useState(false);
  const [promotion, setPromotion] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const [sliderImages, setSliderImages] = useState(null);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     setSliderImages(null)
  //   }, [])
  // );

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus',() => {
  //   // onClub(itemId);
  //   setSliderImages(null)

  //   })
  //   return unsubscribe
  // },[navigation])

  // useEffect(() => {
  //   setG(state.club)
  // }, [state.club])

  // console.log("Showing g==================================", g)

  // useEffect(() => {
  //   onProfile("");
  //   console.log("hi");
  // }, [itemId, itemname]);

  // useEffect(() => {
  //   setSliderImages(g?.images);
  // });

  const [click, setClick] = useState(itemSaved);

  // console.log("Item Saved: ", itemSaved)

  // useEffect(() => {
  //   if (g) {
  //     setClick(g.is_saved);
  //     setSliderImages(g.images)
  //     // onEventsByClubs(g.id);

  //   }
  // }, [g]);

  // console.log(
  //   "g?.is_saved >>>>>>>>>>>>>>>>>>>>> g?.is_saved >>>>>>",
  //   g?.is_saved
  // );
  // console.log("Click is saved >>>>>>>>>>>>>>>>> Click is saved >>>>>>>>>>>>", click);

  const favButton = async (id) => {
    const toggle = await onToggleSaveAffiliate(id);
    // console.log("ID====================affiliate id", id);
    //  console.log("toggle================", toggle);
    setClick(!click);
  };

  useEffect(() => {
    clearFavProfile();
  }, [click]);

  // console.log("Onprofile============================ ", state.users);

  // useEffect(() => {
  //   onClub();
  //   console.log("hi");
  // }, [itemId, itemname]);

  let city = itemId;
  // console.log("ali", city);
  // useEffect(() => {
  //   onClub(city);
  //   // console.log("hi");
  // }, [itemId, itemname]);

  // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Showing images count>>>>>>>>>>>>>>>>>>", state?.club?.images)
  // const cityName = g?.town

  //  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>????????? Images array========",state.club)
  // const d = g.filter((el,i)=> el.id == city  )
  // console.log("................>>>>>", g?.name);
  // const obj = Object.assign({}, state.users);
  // console.log('hshdkfjslkdjflds????',obj)
  // console.log(">>>>>>>>>>>>>>>>>>????>>>>???", state.club?.data.description);
  // console.log("awaiz", state.users);
  // const [img,setImg] =useState(g?.images);
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

  // onPress QueuJump
  const onPressQueueJump = () => {
    try {
      onCheckInAffiliate(itemId);
      navigation.navigate("Qr", { id: itemId });
    } catch (error) {
      navigation.navigate("Main");
    }
  };

  const pressBackHandler = () => {
    navigation.goBack(null);
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
        {/* <View style={{top:500}}>
        <Text style={{color:"white"}}>Showing Images  {g?.images || "No images found"}</Text>
         
        </View> */}

        <View style={{ width: 414, height: 320 }}>
          <SliderBox
            images={itemImages}
            sliderBoxHeight={400}
            //onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
            dotColor="#927E5A"
            imageLoadingColor="#927E5A"
            inactiveDotColor="#C4C4C4"
            autoplay
            circleLoop
            dotStyle={{
              width: 8,
              height: 8,
              borderRadius: 360,
              marginHorizontal: 0,
              padding: 0,
              margin: 0,
            }}
          />
          <View
            style={{
              justifyContent: "space-between",
              position: "absolute",
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              alignContent: "space-between",
              width: wp("100%"),
              backgroundColor: "rgba(0,0,0,0.75)",
              paddingLeft: 10,
              paddingRight: 10,
              // marginTop:20,
              paddingTop: Constants.statusBarHeight + 10,
              paddingBottom: 10,
            }}
          >
            <TouchableOpacity onPress={pressBackHandler}>
              <AntDesign name="left" size={24} color="#927E5A" />
            </TouchableOpacity>
            <View>
              <Text style={styles.textStyle1}>{itemname}</Text>
            </View>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Map", {
                  itemLongitude: itemlong,
                  itemLatitude: itemlat,
                  itemName: itemname,
                  itemDescription: itemDescription,
                })
              }
            >
              <Ionicons name="ios-location-sharp" size={28} color="#927E5A" />
            </TouchableOpacity>
          </View>
        </View>
        {click ? (
          <TouchableOpacity
            onPress={() => favButton(itemId)}
            style={{ marginTop: hp("-5%"), alignItems: "flex-end", margin: 15 }}
          >
            <AntDesign name="heart" size={24} color="#927E5A" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => favButton(itemId)}
            style={{ marginTop: hp("-5%"), alignItems: "flex-end", margin: 15 }}
          >
            <AntDesign name="hearto" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        )}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 18,
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
        {book ? (
          <View style={{ height: 200 }}>
            <ClubsPromotionProfile HEIGHT={250} clubId={itemId} />
          </View>
        ) : null}
        {/* {promotion ? (
          <View></View>
        ) : null} */}
        {contact ? (
          <>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 6, // padding: 5,
                  position: "relative",
                  left: 20,
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Image
                  style={{ width: 20, height: 20 }}
                  resizeMode="contain"
                  source={require("../../assets/Image/phone.png")}
                />
                <TouchableOpacity
                  onPress={() => Linking.openURL(`tel:${itemPhone}`)}
                >
                  <Text style={styles.textStyle}>{itemPhone}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.imageTextContainer}>
                <Image
                  style={{ width: 20, height: 20 }}
                  resizeMode="contain"
                  source={require("../../assets/Image/email.png")}
                />
                <TouchableOpacity
                  onPress={() => Linking.openURL(`mailto:${itemEmail}`)}
                >
                  <Text style={styles.textStyle}>{itemEmail}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.imageTextContainer}>
                <Image
                  style={{ width: 20, height: 20 }}
                  resizeMode="contain"
                  source={require("../../assets/Image/www.png")}
                />
                <TouchableOpacity onPress={() => Linking.openURL(itemWebsite)}>
                  <Text
                    numberOfLines={3}
                    adjustsFontSizeToFit
                    style={styles.textStyle}
                  >
                    {itemWebsite}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.imageTextContainer}>
                <Image
                  style={{ width: 20, height: 20 }}
                  resizeMode="contain"
                  source={require("../../assets/Image/location.png")}
                />
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Map", {
                      itemLongitude: itemlong,
                      itemLatitude: itemlat,
                      itemName: itemname,
                      itemDescription: itemDescription,
                    })
                  }
                >
                  <Text style={styles.textStyle}>
                    {itemAddress1} {itemAddress2} {itemRegion} {itemPostCode}{" "}
                    {"\n"} {itemCountry}
                  </Text>
                </TouchableOpacity>
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
              {/* <View
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
            </View> */}
              {/* <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                     Platform.OS === 'android' ? 
      (
         "https://play.google.com/store/apps/details?id=com.ubercab&hl=en&gl=US"
      ) : "https://apps.apple.com/us/app/uber-request-a-ride/id368677368"
                    
                 
                  )
                }
                style={styles.uberContainer}
              >
                <Image
                  resizeMode="contain"
                  style={{ width: 179, height: 109 }}
                  source={require("../../assets/Image/UberLogo.png")}
                />
              </TouchableOpacity> */}
            </View>
            <View style={styles.outerContainer1}>
              <TouchableOpacity
                // title="Share"
                onPress={onShare}
                style={{
                  width: 200,
                  height: 30,

                  backgroundColor: "#927E5A",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 5,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "OpenSansRegular",
                    textTransform: "uppercase",
                    color: "#000000",
                  }}
                >
                  Share Location
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.outerContainer}>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    Platform.OS === "android"
                      ? "https://play.google.com/store/apps/details?id=com.ubercab&hl=en&gl=US"
                      : "https://apps.apple.com/us/app/uber-request-a-ride/id368677368"
                  )
                }
                style={styles.uberContainer}
              >
                <Image
                  resizeMode="contain"
                  style={{ width: 140, height: 109 }}
                  source={require("../../assets/Image/UberLogo.png")}
                />
              </TouchableOpacity>
            </View>
          </>
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
        <View style={{ flexDirection: "row", marginBottom: 15 }}>
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
            onPress={() =>
              navigation.navigate("Venue", { itemWebsite: itemWebsite })
            }
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: "OpenSansRegular",
                textTransform: "uppercase",
                color: "#ffffff",
              }}
            >
              BOOK VENUE
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
            onPress={onPressQueueJump}
          >
            <Text
              style={{
                fontSize: 20,

                // marginRight: 15,
                color: "#FFFFFF",
                fontFamily: "OpenSansRegular",
                textTransform: "uppercase",
              }}
            >
              QUEUE JUMP
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default ClubsProfile;

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
    // fontFamily: "Inter-Regular",
    fontFamily: "OpenSansRegular",
  },
  text1: {
    alignSelf: "center",
    fontSize: 16,
    color: "#FFFFFF",
    // fontFamily: "Inter-Regular",
    fontFamily: "OpenSansRegular",
  },
  uberContainer: {
    width: 144,
    height: 60,
    display: "flex",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#927E5A",
    // margin: "auto",
    borderRadius: 5,
    borderColor: "white",
    // backgroundColor: "red",
  },
  textStyle: {
    fontSize: 15,
    fontWeight: "400",
    color: "#927E5A",
    marginLeft: 18,
    padding: 5,
    fontFamily: "OpenSansRegular",
  },
  imageTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    left: 20,
  },
  textStyle1: {
    color: "#927E5A",
    fontFamily: "OpenSansRegular",
    fontSize: 27,
  },
  outerContainer: {
    marginTop: 10,
    // backgroundColor: "white",
    // height:"inherit"
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  outerContainer1: {
    marginTop: 1,
    // backgroundColor: "white",
    // height:"inherit"
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
