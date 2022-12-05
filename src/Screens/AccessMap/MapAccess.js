import React, { useContext, useState, useEffect } from "react";
import MapView, { Callout, PROVIDER_GOOGLE } from "react-native-maps";
import { Marker } from "react-native-maps";
// import Marker from "react-native-maps";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  Button,
} from "react-native";

import * as Location from "expo-location";
import { Alert } from "native-base";
// import{PROVIDER_GOOGLE} from 'react-native-maps'
// import { Marker } from "react-native-svg";
const height = Dimensions.get("window").height;

const MapAccess = ({ latitude, longitude }) => {
  console.log("main map screen", latitude, longitude);

  //   console.log("item description mapvip: ", itemDesc, itemLong);
  //   const { state, onProfile, Logout, onClub } = useContext(Actions);

  // console.log("Displaying Info >>>>>>>>", longitude, latitude, name, description)

  // const g = state?.club;
  // console.log("gwaiz ",g?.latitude)

  // const[g, setG] = useState(state?.club)
  const [userLongitude, setUserLongitude] = useState();
  const [userLatitude, setUserLatitude] = useState();

  //   const[longitude,setLongitude] = useState(0)
  //   const[latitude, setLatitude] = useState(0)
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      text = location;
      // console.log(
      //   "Location==========================================>>>>>>>>>>",
      //   typeof text
      // );
      // console.log("Longitude: ", text.coords.longitude);
      // console.log("Latitude: ", text.coords.latitude);
      setUserLatitude(text?.coords?.latitude);
      setUserLongitude(text?.coords?.longitude);
    } catch (error) {
      Alert("Location Error", error);
    }
  };
  console.log("hello location", userLatitude);

  // useEffect(() => {
  //   setG(state?.club)
  // },[state?.club])

  useEffect(() => {
    // (async () => {
    //   let { status } = await Location.requestForegroundPermissionsAsync();
    //   if (status !== 'granted') {
    //     setErrorMsg('Permission to access location was denied');
    //     return;
    //   }

    //   let location = await Location.getCurrentPositionAsync({});
    //   setLocation(location);
    // })();
    getLocation();
    // console.log(
    //   "inside get directions >>>>>>>>>>>>>>>>>>"
    // )
  }, []);

  let text = "Waiting..";

  // useEffect(() => {
  //   if (errorMsg) {
  //     text = errorMsg;
  //     Alert("Location Error >>>>", text)
  //   } else if (location) {
  //     //text = JSON.stringify(location);
  //     text = location;
  //     console.log(
  //       "Location==========================================>>>>>>>>>>",
  //       typeof text
  //     );

  //     console.log("Longitude: ", text.coords.longitude);
  //     console.log("Latitude: ", text.coords.latitude);
  //     setUserLatitude(text.coords.latitude);
  //     setUserLongitude(text.coords.longitude);
  //     console.log("Location Text--------------------------------------", text);
  //   }

  // }, [errorMsg, errorMsg]);

  // console.log("User >>> ", userLatitude, userLongitude);

  console.log("Showing screen width in pixels: ");
  const total_width = Dimensions.get("window").width;
  const remaing_pixels = (20 / 100) * total_width;
  const final_pixels = total_width - remaing_pixels;

  const [borderRadiusValue, setRorderRadiusValue] = useState(
    parseInt(200 + final_pixels)
  );
  //   const borderRadiusValue = 200 + final_pixels / 2
  console.log("BorderRadiusValue: ", borderRadiusValue);

  return (
    <View
      style={{
        width: 300,
        height: 300,
        alignSelf: "center",
        borderRadius: 300,
        overflow: "hidden",
      }}
    >
      <MapView
        style={styles.map}
        loadingEnabled={true}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          //   title={marker.title}
          //   description={Marker.description}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    // width:"100%",
    // height:180,
    // width:"100%",
    height: 300,
    width: "100%",
  },

  textStyle: {
    color: "#ffffff",
    fontFamily: "OpenSansRegular",
    fontSize: 16,
  },
  buttonContainer: {
    width: 180,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#927E5A",
  },
});

export default MapAccess;
