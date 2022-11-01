import { StyleSheet, Text, View, Image,Platform } from "react-native";
import React from "react";

const Images = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>WELCOME TO </Text>
      <Image
        style={[styles.image, styles.imageHeight]}
        source={require("../../../viiip/assets/Image/BE-VIP-logo.png")}
        resizeMode="contain"
      />
    </View>
  );
};

export default Images;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor:"red"
    
  },


  image: {
    // flex:1,
    width: 100,
    // height: 60,
    height:24,
    // backgroundColor:"red"
    // alignItems:"center",
    // justifyContent:"center"
    // borderColor:"red",
    // borderWidth:1,
    // marginBottom:10,
    // marginTop:2.5
  },

  imageHeight: {
    ...Platform.select({
      ios:{

      },
      android:{
        height: 30
      }
    })
  },

  text: {
    fontSize: 24,
    color: "#927E5A",
    // backgroundColor:"yellow",
    fontFamily: "BaskervilleRegular",
    // textAlign:"center"
    // justifyContent:"center"
  },
});
