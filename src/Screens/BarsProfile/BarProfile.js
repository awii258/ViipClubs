import { StyleSheet, Text, View } from "react-native";
import React from "react";
import moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
const BarProfile = ({ bardec, bardate, bartime }) => {
  let dateFormat1 = moment(bardate).format("D-MM-YYYY");
  console.log("date format ", dateFormat1);
  console.log("bar name", bardec);
  return (
    <View style={{ felx: 1, justifyContent: "center", padding: 30 }}>
      <View style={{
          position: "relative",}}>
      <Text
        style={{
          color: "#927E5A",
          fontSize: 16,
          fontFamily: "OpenSansRegular",
          textAlign: "justify",
        }}
      >
        {bardec}
      </Text>
      </View>
      {/* <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          position: "relative",
          marginTop:2
        }}
      >
        <MaterialIcons name="date-range" size={24} color="#927E5A" />
        <Text
          style={{
            fontSize: 15,
            fontWeight: "400",
            color: "#927E5A",
            marginLeft: 18,
            padding: 5,
            fontFamily: "OpenSansRegular",
          }}
        >
          {dateFormat1}
        </Text>
      </View> */}
      {/* <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Feather name="clock" size={22} color="#927E5A" />
        <Text
          style={{
            fontSize: 15,
            fontWeight: "400",
            color: "#927E5A",
            marginLeft: 24,
            padding: 5,
            fontFamily: "OpenSansRegular",
          }}
        >
          {bartime}
        </Text>
      </View> */}
    </View>
  );
};

export default BarProfile;

const styles = StyleSheet.create({});
