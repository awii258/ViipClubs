import React, { useContext, useState, useEffect } from "react";
import MapView, { Callout, PROVIDER_GOOGLE } from "react-native-maps";
import Marker from "react-native-maps";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StyleSheet, Dimensions, Text, TouchableOpacity, View, Button } from "react-native";
import { Context as Actions } from "../Context/Actions";
import { convertRemToAbsolute } from "native-base/lib/typescript/theme/tools";
import getDirections from 'react-native-google-maps-directions'
import * as Location from 'expo-location';
import { Alert } from "native-base";
// import{PROVIDER_GOOGLE} from 'react-native-maps'
// import { Marker } from "react-native-svg";
const height = Dimensions.get("window").height;

const Map = ({itemLong, itemLat, itemName, itemDesc}) => {

  console.log("item description mapvip: ", itemDesc)
  const { state, onProfile, Logout, onClub } = useContext(Actions);

  // console.log("Displaying Info >>>>>>>>", longitude, latitude, name, description)

  // const g = state?.club;
  // console.log("gwaiz ",g?.latitude)

  // const[g, setG] = useState(state?.club)
  const [userLongitude, setUserLongitude]= useState("");
  const [userLatitude, setUserLatitude] = useState("");

  const[longitude,setLongitude] = useState(0)
  const[latitude, setLatitude] = useState(0)
  const[name, setName] = useState('')
  const[description, setDescription] = useState('')

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // useEffect(() => {
  //   if(state?.club){
  //     setLongitude(state.club.longitude)
  //     setLatitude(state.club.latitude)
  //     setName(state.club.name)
  //     setDescription(state.club.description)

  //   }
  // },[state?.club])


  const getLocation = async () => {

    try{
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
      setUserLatitude(text.coords.latitude);
      setUserLongitude(text.coords.longitude);
    }catch(error){
      Alert("Location Error", error)
    }
   

   

  }

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

  let text = 'Waiting..';
  


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





const  handleGetDirections = () => {
  const data = {
     source: {
      // latitude: -33.8356372,
      // longitude: 18.6947617
      latitude: userLatitude,
      longitude: userLongitude
    },
    destination: {
      latitude: latitude,
      longitude: longitude
    },
    params: [
      {
        key: "travelmode",
        value: "driving"        // may be "walking", "bicycling" or "transit" as well
      },
      {
        key: "dir_action",
        value: "navigate"       // this instantly initializes navigation using the given travel mode
      }
    ],
    waypoints: [
      {
        latitude: userLatitude,
        longitude: userLongitude
      },
      {
        latitude: latitude,
        longitude: longitude
      },


      // {
      //   latitude: -33.8600025,
      //   longitude: 18.697452
      // },
      // {
      //   latitude: -33.8600026,
      //   longitude: 18.697453
      // },
      //    {
      //   latitude: -33.8600036,
      //   longitude: 18.697493
      // }
    ]
  }

  getDirections(data)
}


  return (
    <View style={{ flex: 1 }}>
      {/* <View>
<Text style={styles.textStyle}>{userLatitude}</Text>
        <Text style={styles.textStyle}>{userLongitude}</Text>
</View> */}
      <MapView
        style={styles.map}
        loadingEnabled={true}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: itemLat,
          longitude: itemLong,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: itemLat,
            longitude: itemLong,
          }}
          title={itemName}
          description={itemDesc}
        />
      </MapView>

      <View
        style={{
          position: "absolute",
          marginLeft: wp("5%"),
          marginTop: hp("80%"),
        }}
      >
        <TouchableOpacity
          onPress={handleGetDirections}
          style={styles.buttonContainer}
        >
          <Text style={styles.textStyle}>Get Directions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    height,
  },
  
  textStyle:{
    color:"#000000",
    fontFamily:"OpenSansRegular",
    fontSize:16,
  }, 
  buttonContainer:
  {
    width:180, height:45, justifyContent:"center",
    alignItems:"center", borderRadius:5, backgroundColor:"#927E5A",
  
    }
});

export default Map;
