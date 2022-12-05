import React from "react";
// import { Text } from 'react-native-svg'
import {
  Text,
  Image,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";

const SubscriptionsMember = ({ navigation, route }) => {
  return (
    <>
      <View style={styles.container}>
        {/* <Text style={{ color: "white" }}>Competition screen</Text> */}

        <View style={{ padding: 25 }}>
          <Text style={[styles.textStyle1, { margin: 10 }]}>
            Upgrade Membership
          </Text>
          <Text style={[styles.textStyle, { margin: 10 }]}>
            Because life is for living, Join the Be VIP Membership and become
            our Premium Member to get vip entries and queue jumps and other
            exclusive perks.
          </Text>
        </View>

        <View
          style={{ flexDirection: "row", justifyContent: "center", margin: 20 }}
        >
          <TouchableOpacity
            style={{
              width: 280,
              height: 50,
              backgroundColor: "#927E5A",
              justifyContent: "center",
              alignItems: "center",
              margin: 5,
              borderRadius: 5,
            }}
            onPress={() => Linking.openURL("https://www.be-vip.com")}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: "OpenSansRegular",
                textTransform: "uppercase",
                color: "white",
              }}
            >
              Upgrade Membership
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={{
              width: 280,
              height: 50,
              //   backgroundColor: "#927E5A",
              justifyContent: "center",
              alignItems: "center",
              margin: 5,
              borderRadius: 5,
            }}
            onPress={() => navigation.navigate("Home")}
          >
            <Text
              style={{
                textDecorationLine: "underline",
                fontSize: 20,
                fontFamily: "OpenSansRegular",
                textTransform: "uppercase",
                color: "white",
              }}
            >
              Skip
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default SubscriptionsMember;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: "#927E5A",
  },
  textStyle: {
    color: "#927E5A",
    fontFamily: "OpenSansRegular",
    fontSize: 18,
    fontWeight: "400",
    textAlign: "justify",
  },
  textStyle1: {
    color: "#927E5A",
    fontFamily: "OpenSansRegular",
    fontSize: 24,
    textAlign: "center",
    fontWeight: "600",
  },
});
