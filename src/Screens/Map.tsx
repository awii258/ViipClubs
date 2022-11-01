import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'
import MapVip from "../Screens/MapVip"

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Map = ({route}) => {
  // const {longitude, latitude, name, description} = route.params
  const {itemLongitude, itemLatitude, itemName, itemDescription} = route.params
  console.log("item description in map: ", itemDescription)
 return (
   <SafeAreaView
     style={{ flex: 1, borderTopWidth: 2, borderTopColor: "#927E5A" }}
     forceInset={{ top: "always" }}
   >
     <MapVip 
     itemLong={itemLongitude}
     itemLat={itemLatitude}
     itemName={itemName}
     itemDesc={itemDescription}
     />
     {/* <View style={{   marginLeft:wp("5%")}}>
      <TouchableOpacity style={styles.buttonContainer}>
      <Text style={styles.textStyle}>Get Directions</Text>
      </TouchableOpacity>
      </View> */}
   </SafeAreaView>
 );
}

export default Map

const styles = StyleSheet.create({
  textStyle:{
    color:"#000000",
    fontFamily:"BaskervilleRegular",
    fontSize:16,
  }, 
  buttonContainer:
  {
    width:218.5, height:45, justifyContent:"center",
    alignItems:"center", borderRadius:5, backgroundColor:"#927E5A",
  
    }
})