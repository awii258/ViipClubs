import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import MapView from "react-native-maps";
import MapAccess from "./MapAccess";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Map = ({ route, latitude, longitude }) => {
  console.log("MapLongitude", longitude);
  // const {longitude, latitude, name, description} = route.params
  //   const {itemLongitude, itemLatitude, itemName, itemDescription} = route.params
  //   console.log(
  //     "item description in map: ",
  //     itemDescription,
  //     itemLatitude,
  //     itemLongitude
  //   );
  return (
    <SafeAreaView
    //  style={{ justifyContent:"center"}}
    //  forceInset={{ top: "always" }}
    >
      <MapAccess latitude={latitude} longitude={longitude} />
    </SafeAreaView>
  );
};

export default Map;

const styles = StyleSheet.create({
  textStyle: {
    color: "#000000",
    fontFamily: "BaskervilleRegular",
    fontSize: 16,
  },
  buttonContainer: {
    width: 218.5,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#927E5A",
  },
  lineBreak: {
    borderBottomColor: "#927E5A",
    borderBottomWidth: 1,
    width: 280,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
