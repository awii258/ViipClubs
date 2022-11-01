import { EvilIcons } from "@expo/vector-icons";

import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Entypo } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import { Context as Actions } from "../Context/Actions";
import { MaterialIcons } from "@expo/vector-icons";
import ImageOverlay from "react-native-image-overlay";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,

  ImageBackground,
  TextInput,
  Alert,
} from "react-native";

import {
  useNavigation,
  CommonActions,
  useFocusEffect,
} from "@react-navigation/native";

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
import { ScrollView } from "react-native-gesture-handler";

// const Stack = createNativeStackNavigator<Stack>();

// type NavigationAnimalProps = NativeStackScreenProps<Stack, "Animal">;

// type AnimalProps = {
//   navigation: NavigationAnimalProps["navigation"];
// };

const ClubBars = ({ navigation, route }) => {
  const { productId, productTitle } = route.params;
  // const [data, setData] = useState([]);
  const [SearchAffiliate, setSearchAffiliate] = useState("");

  const { state, onProfile, clearClub, clearEventsByClub, clearEventsByTowns } = useContext(Actions);
  // console.log("................>>>>>", state.users);
  //   setData(state.users)

  const SearchAffiliate_ = () => {
    // alert("search", search);
    // const tempSearch=search;
    onProfile(SearchAffiliate, "Bar", productTitle);
    //  console.log("Search=====================================================search", SearchAffiliate);
  }
  //  console.log("Filtered Affiliates ==========================================", state.users);
  //   const get = async () => {
  //     let token = await AsyncStorage.getItem("token");
  //     try {
  //       const response = await fetch(
  //         "https://be-vip-service-slxus.ondigitalocean.app/api/external/affiliates",
  //         {
  //           method: "GET",
  //           headers: {
  //             Accept: "application/json",
  //             "Content-Type": "application/json",
  //             Authorization: "Bearer" + token,
  //           },
  //         }
  //       );
  //       const data = await response.json();
  //       console.log("ksdjflsdjflsdjflsdj", data.data);
  //       setData(data.data);
  //       console.log(data);
  //     } catch (err) {
  //       console.log("hello", err);
  //     }
  //   };

  useEffect(() => {
    onProfile("", "Bar", productTitle);
    clearEventsByTowns();

    // console.log("hi");
  }, []);

  useEffect(() => {
    if (SearchAffiliate === '') {
      onProfile(SearchAffiliate, "Bar", productTitle);

    }
  }, [SearchAffiliate]);




  let c = productId;
  // console.log(">>>??>>>????", productId);
  const b = state.users;
  let city = productTitle;
  // console.log("awaiz", city);
  // const a = b && b?.filter((el, i) => el.town == city);
  //   console.log("awaizsdf", data);
  //  console.log('akdjflksdjflkdsjflksd',)



  // const [masterDataSource, setMasterDataSource] = useState("");
  //   let a = search.charAt(0).toUpperCase() + search.slice(1);
  //   let filteredDataSource = masterDataSource.filter(
  //     (item: any) => item.english.includes(a) || item.barawa.includes(a)
  //   );

  // 👆 do this instead of creating new state:

  useFocusEffect(
    React.useCallback(() => {
      //  console.log(
      //    "====================================Screen focused======================="
      //  );
      clearClub();
      clearEventsByClub();
    }, [])
  );


  const renderItem = ({ item }: any) => {

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
            itemAddress2: item.address2
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
                  itemAddress2: item.address2
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: 30,
          // margin:0,
          // marginRight: 10,

          // alignSelf: "center",
        }}
      >
        <View style={styles.inputView}>
          <EvilIcons
            name="search"
            size={24}
            color="#ffffff"
            style={styles.iconDesign}
          />
          <TextInput
            style={styles.inputDesign}
            placeholder="SEARCH BARS"
            placeholderTextColor="#ffffff"
            autoCapitalize={"words"}
            selectionColor="#ffffff"
            onChangeText={(text) => setSearchAffiliate(text)}
            onSubmitEditing={SearchAffiliate_}
            value={SearchAffiliate}
          ></TextInput>
          {/* <TextInput
              style={{
                width: 365,
                height: 50,
                alignSelf: "center",
                backgroundColor: "#927E5A",
                borderColor: "#927E5A",
              }}
              placeholder="Search"
              placeholderTextColor="#fff"
              autoCapitalize={"words"}
              selectionColor="#927E5A"
              mode="flat"
              theme={{
                colors: {
                  primary: "#927E5A",
                },
              }}
              onChangeText={(text) => setSearch(text)}
              value={search}
              left={
                <TextInput.Icon
                  name={() => (
                    <EvilIcons name="search" size={22} color="#ffffff" />
                  )}
                />
              }
            /> */}
        </View>
      </View>

      {/* <View style={{ marginLeft: 10 }}>
        <Text style={{ color: "#927E5A", fontSize: 20, fontWeight: "600",  fontFamily:"BaskervilleRegular",
              textTransform:"uppercase"    }}>
          {" "}
          Clubs in {city}
        </Text>
      </View> */}

      <ScrollView contentContainerStyle={{ paddingBottom: 200 }}
        showsVerticalScrollIndicator={false}>
        <FlatList
          data={state?.users}
          keyExtractor={(item, index) => item.id.toString()}
          initialNumToRender={1}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        // style={{ height: 500 }}
        />
      </ScrollView>

    </View>
  );
};

export default ClubBars;
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
    fontFamily: "BaskervilleRegular",
    backgroundColor: "#B79D71",
    color: "#ffffff",
  },
});