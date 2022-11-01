import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useContext } from 'react'
import { Context as Actions } from "../Context/Actions";
import { WebView } from "react-native-webview";

const Book = ({route}) => {
  const Spinner = () => (
    <View style={styles.activityContainer}>
      <ActivityIndicator size="large" color={"white"} />
    </View>
  );

  const {itemWebsite} = route.params
  console.log("Showing website in book venue: ", itemWebsite)
  const { state, onProfile, Logout, onClub } = useContext(Actions);
  // const g = state.club;
  return (
    <SafeAreaView
      style={{ flex: 1, borderTopWidth: 2, borderTopColor: "#927E5A" }}
    >
      <WebView
        bounces={false}
        startInLoadingState={true}
        renderLoading={Spinner}
        source={{
          uri: itemWebsite,
        }}
        style={styles.container}
        showsHorizontalScrollIndicator={false}
        scalesPageToFit
      />
    </SafeAreaView>
  );
}

export default Book

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
   
  },
  activityContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "black",
    height: "100%",
    width: "100%",
  },
});