import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Platform,
} from "react-native";
import React, { useContext } from "react";
// import {Platform, StyleSheet} from 'react-native'
const HeaderIcon = ({ RIGHT }) => {
  return (
    <View
      // style={{height:50, justifyContent:"flex-start", backgroundColor:"yellow",}}
      style={styles.container}
    >
      <Image
        resizeMode="contain"
        style={{ height: 37, width: 37, right: RIGHT }}
        source={require("../../assets/Image/topIcon.png")}
      />
    </View>
  );
};

export default HeaderIcon;

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        height: 45,
        justifyContent: "flex-start",
        // backgroundColor: "yellow",
      },
      android: {
        height:40,
        // backgroundColor:"yellow",
        justifyContent:"flex-start"
      },
    }),
  },
});
