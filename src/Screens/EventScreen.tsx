import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { EvilIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Context as Actions } from "../Context/Actions";
import PromotionScreen from "../Components/PromotionScreen";

const data = [
  {
    id: 1,
    text1: "Win Love Island Final Tickets + A Majorca Trip For 2.",
    text2: "",
    img: require("../../assets/Image/image1.png"),
  },
  {
    id: 2,
    text1: "Over in the Canaries, Tenerife’s one of the best sunshine spots.",
    text2: "",
    img: require("../../assets/Image/image2.png"),
  },
];
const EventScreen = () => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    onProfile();
    // console.log("hi");
  }, []);

  const { state, onProfile } = useContext(Actions);
  // console.log("................>>>>>", typeof state.users);

  const renderItem = ({ item }: any) => {
    // console.log("subhan hi", item.name);

    return (
      <TouchableOpacity style={styles.imageContainer}>
        <ImageBackground
          style={styles.imageStyle}
          resizeMode="contain"
          source={item.img}
        >
          <Text
            style={[styles.textStyle, { marginTop: hp("20%"), padding: 15 }]}
          >
            {item.text1}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View>
          <View style={styles.inputView}>
            <EvilIcons
              name="search"
              size={24}
              color="#ffffff"
              style={styles.iconDesign}
            />
            <TextInput
              style={styles.inputDesign}
              placeholder="Search Events"
              placeholderTextColor="#ffffff"
              selectionColor={"#927E5A"}
              autoCapitalize={"words"}
              selectionColor="#927E5A"
              onChangeText={(text) => setSearch(text)}
              value={search}
            ></TextInput>
          </View>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={1}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default EventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  inputView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B79D71",

    width: 365,
    height: 50,
  },
  iconDesign: {
    padding: 10,
  },
  inputDesign: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    marginLeft: 10,
    borderTopLeftRadius: 50,
    fontFamily: "BaskervilleRegular",
    backgroundColor: "#B79D71",
    color: "#424242",
  },

  textStyle: {
    color: "#FFFFFF",
    fontFamily: "BaskervilleRegular",
    fontSize: 16,
  },
  imageContainer: {
    alignSelf: "center",
    margin: 10,
  },
  imageStyle: { height: 262, width: wp("90%") },
});
