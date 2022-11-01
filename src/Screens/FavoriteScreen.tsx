import { EvilIcons } from "@expo/vector-icons";

import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import ImageOverlay from "react-native-image-overlay";
import React, { useContext, useEffect, useState } from "react";
import { Context as Actions } from "../Context/Actions";
import { Entypo } from "@expo/vector-icons";
import {
  useNavigation,
  CommonActions,
  useFocusEffect,
} from "@react-navigation/native";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ImageBackground,
  VirtualizedList,
  TextInput,
} from "react-native";

type Stack = {
  YourSelf: undefined;
  home: undefined;
  notification: undefined;
  Person: undefined;
  Days: undefined;
  Animal: undefined;
  Forget: undefined;
  Du: undefined;
};
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator<Stack>();

type NavigationAnimalProps = NativeStackScreenProps<Stack, "Animal">;

type AnimalProps = {
  navigation: NavigationAnimalProps["navigation"];
};

const FavoriteScreen = ({ navigation }: AnimalProps) => {
  const [data, setData] = useState([]);
  const { state, onFavProfile, clearClub, clearEventsByClub } =
    useContext(Actions);

  // const [savedAffiliates, setSavedAffiliates] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      // console.log(
      //   "====================================Screen focused======================="
      // );

      onFavProfile("");

      clearClub();
      clearEventsByClub();
    }, [])
  );

  useEffect(() => {
    onFavProfile("");

    // console.log("hi");
  }, []);

  // setSavedAffiliates()

  // let savedAffiliates = null;

  // savedAffiliates =
  //   state.favAffiliates &&
  //   state?.favAffiliates.filter((item) => item.is_saved === true);
  // console.log("Saved affiliates ===========================", savedAffiliates);

  // console.log("................>>>>>", state.favAffiliates);
  // console.log(state?.favAffiliates[0])

  const renderItem = ({ item }: any) => {
    const image = item.images[0];

    // console.log("hilllstatution", item.id);
    return (
      <TouchableOpacity
        style={{ alignItems: "center", justifyContent: "center" }}
        onPress={() => {
          navigation.navigate("Du", {
            itemId: item.id,
            itemname: item.name,
            itemDescription: item.description,
            itemImages: item.images,
            itemSaved: item.is_saved,
            itemPhone: item.phone,
            itemEmail: item.email,
            itemWebsite: item.website,
            itemPostCode: item.postcode,
            itemlat: item.latitude,
            itemlong: item.longitude,
            itemCountry: item.country,
            itemRegion: item.region,
            itemAddress1: item.address1,
            itemAddress2: item.address2,
          });
        }}
      >
        <ImageOverlay
          overlayColor="#000000"
          //  "#19282F"
          overlayAlpha={0.6}
          source={{ uri: item.images[0] }}
          resizeMode="cover"
          containerStyle={{
            height: 90,
            width: 414,
            marginTop: 20,
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: 300,
              alignSelf: "center",
            }}
          >
            <View>
              <Text
                style={{
                  color: "#927E5A",
                  fontSize: 20,
                  fontWeight: "400",
                  fontFamily: "BaskervilleRegular",
                  textTransform: "uppercase",
                }}
                selectable={true}
              >
                {item.name}
              </Text>
            </View>
            <TouchableOpacity
              style={{}}
              onPress={() => {
                navigation.navigate("Du", {
                  itemId: item.id,
                  itemname: item.name,
                  itemDescription: item.description,
                  itemImages: item.images,
                  itemSaved: item.is_saved,
                  itemPhone: item.phone,
                  itemEmail: item.email,
                  itemWebsite: item.website,
                  itemPostCode: item.postcode,
                  itemlat: item.latitude,
                  itemlong: item.longitude,
                  itemCountry: item.country,
                  itemRegion: item.region,
                  itemAddress1: item.address1,
                  itemAddress2: item.address2,
                });
              }}
            >
              <Entypo name="chevron-small-right" size={24} color="#927E5A" />
            </TouchableOpacity>
          </View>
        </ImageOverlay>
      </TouchableOpacity>
    );
  };

  // const getItem = (item) => {
  //   Alert.alert(item.extra);
  // };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000000",
        borderTopWidth: 1,
        borderTopColor: "#927E5A",
      }}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 200 }}
        showsVerticalScrollIndicator={false}
      >
        <FlatList
          data={state?.favAffiliates}
          keyExtractor={(item, index) => item.id.toString()}
          initialNumToRender={1}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          refreshing={true}
          // style={{ height: 500 }}
        />
      </ScrollView>
    </View>
  );
};

export default FavoriteScreen;
const styles = StyleSheet.create({
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
    fontFamily: "OpenSansRegular",
    backgroundColor: "#B79D71",
    color: "#424242",
  },
});
