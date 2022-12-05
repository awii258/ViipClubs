import { EvilIcons } from "@expo/vector-icons";

import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import React, { useContext, useEffect, useState } from "react";
import { Context as Actions } from "../Context/Actions";
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";

import {
  useNavigation,
  CommonActions,
  useFocusEffect,
} from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  TextInput,
  ScrollView,
  LogBox,
  StatusBar,
} from "react-native";
import * as geolib from "geolib";

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";
import ImageOverlay from "react-native-image-overlay";
import Geocoder from "react-native-geocoding";

const Test = ({ props }) => {
  const { state, onAffiliate, clearOnProfile, onTest } = useContext(Actions);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [dataM, setDataM] = useState();
  const [affiliatesByCity, setAffiliatesByCity] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log("Showing location object: ", location);
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    // onAffiliate();
    // clearOnProfile();
    if (dataM) {
      onTest("Club", dataM);
    }

    // console.log("hi");
    console.log("inside api calling useeffect");
    console.log("Showing dataM Value: ", dataM);
  }, [location, a, c, dataM]);

  useEffect(() => {
    if (state.test && state.pro.data.tier.name !== "Free Membership") {
      console.log("Showing sample state.test: ", state.test[0]);
      setAffiliatesByCity(state.test);
    }
  }, [state]);

  const [a, setA] = useState("");
  const [c, setC] = useState("");

  useEffect(() => {
    if (location && location.coords) {
      setA(location.coords.latitude);
      setC(location.coords.longitude);
    }
  }, [location]);

  // const a = location ? location.coords.latitude : null;
  // const c = location ? location.coords.longitude : null;
  // const a = 32.5731
  // const c= 74.1005

  const [nearByAffiliates, setNearByAffiliates] = useState([]);

  useEffect(() => {
    console.log("just above if a and c: ", a, c);
    if ((a, c)) {
      const filteredArr = affiliatesByCity.filter((item) => {
        if (
          geolib.isPointWithinRadius(
            { latitude: item.latitude, longitude: item.longitude },
            { latitude: a, longitude: c },
            500
          )
        ) {
          return item;
        }
      });

      console.log("filtered arry ", filteredArr);
      setNearByAffiliates(filteredArr);
    }
  }, [a, c, dataM, state, affiliatesByCity]);

  useEffect(() => {
    if ((a, c)) {
      Geocoder.from(a, c)
        .then((json) => {
          var user_city = json.results[0].address_components.filter(
            (ac) => ~ac.types.indexOf("locality")
          )[0].long_name;
          console.log("city name with only ", user_city);
          setDataM(user_city);
          // var addressComponent = json.results[0].formatted_address;

          // console.log("hell", addressComponent);
          // const city = addressComponent.split(",")[3]
          // console.log("showing city array: ", addressComponent.split(","));
          // console.log("Showing city: ", city)
        })
        .catch((error) => console.warn(error));
    }
  }, [a, c]);

  // const[a, setA] = useState('')
  // const[c, setC] = useState('')

  console.log("Showing A values: ", a);
  console.log("showing c value: ", c);

  console.log("testing nearbyAffiliates array: ", nearByAffiliates);

  useEffect(() => {
    TestLocation;
    // dist ;
  }, []);
  let Cityname = "";
  const TestLocation = Geocoder.init("AIzaSyD6HEAKAGpgDPEPVavCwSVBKQ8bHDcfkEU");
  // Geocoder.from(a, c)
  //   .then((json) => {
  //     var user_city = json.results[0].address_components.filter(
  //       (ac) => ~ac.types.indexOf("locality")
  //     )[0].long_name;
  //     console.log("city name with only ", user_city);
  //     setDataM(user_city);
  //     Cityname=user_city
  //     // var addressComponent = json.results[0].formatted_address;

  //     // console.log("hell", addressComponent);
  //     // const city = addressComponent.split(",")[3]
  //     // console.log("showing city array: ", addressComponent.split(","));
  //     // console.log("Showing city: ", city)
  //   })
  //   .catch((error) => console.warn(error));

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  console.log("location", location ? location.coords.latitude : null);
  //  const [masterDataSource, setMasterDataSource] = useState([]);
  // const [filteredDataSource, setFilteredDataSource] = useState([]);

  const [SearchTown, setSearchTown] = useState("");
  const SearchTown_ = () => {
    // alert("search", search);
    // const tempSearch=search;
    onAffiliate(SearchTown);
    // console.log("Search=====================================================searchTown", SearchTown);
  };
  // console.log("Filtered towns=======================================",state.towns);

  useEffect(() => {
    if (SearchTown === "") {
      onAffiliate("");
    }
  }, [SearchTown]);

  const [search, setSearch] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      //  console.log(
      //    "====================================Screen focused======================="
      //  );
      // clearOnProfile();
    }, [])
  );
  //    const b=state.test
  //    console.log("some errors", b);
  // console.log("helloo???????????????????????????????????????????",state?.test)
  console.log("city name ", dataM);
  // const[nearbyAffiliates, setNearByAffiliates] = useState([])

  const renderItem = ({ item }) => {
    // console.log("subhan hi", item.name);

    return (
      <>
        <TouchableOpacity
          onPress={() => {
            {
              navigation.navigate("Verify", { latitude: a, longitude: c });
            }
          }}
          style={{ flex: 1 }}
        >
          <View style={styles.listContainer}>
            <View style={{}}>
              <Ionicons name="location" size={25} color="#927E5A" />
            </View>
            <View style={{ margin: 12, flex: 1 }}>
              <Text
                selectable={true}
                style={{
                  color: "white",
                  textTransform: "uppercase",
                }}
              >
                {item.name}
              </Text>
              <View style={{ marginTop: 5 }}>
                <Text selectable={true} style={styles.textStyle}>
                  {item.address1}
                </Text>
              </View>

              {/* <Text
                selectable={true}
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[styles.textStyle, { fontSize: 12 }]}
              >
                {item.content}
              </Text> */}

              <Text
                selectable={true}
                style={[
                  styles.textStyle,
                  { color: "#FFFFFF", fontSize: 12, marginTop: 5 },
                ]}
              >
                {item.town}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.QueueBtn}
              onPress={() => {
                {
                  navigation.navigate("Verify", { latitude: a, longitude: c });
                }
              }}
            >
              <Text>Queue Jump</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <View style={styles.lineBreak}></View>
      </>
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
      }}
    >
      {/* <TextInput
              style={{
              
                width: 365,
                height: 50,
                alignSelf: "center",
                backgroundColor: "#927E5A",
                borderColor: "#927E5A",

               
              }}
              placeholder="Search"
              placeholderTextColor="#ffffff"
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

      {nearByAffiliates && nearByAffiliates.length > 0 ? (
        <ScrollView
          contentContainerStyle={{ paddingBottom: 200 }}
          showsVerticalScrollIndicator={false}
        >
          <FlatList
            data={nearByAffiliates}
            keyExtractor={(item, index) => index}
            initialNumToRender={1}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            // style={{ paddingBottom: 500 }}
          />
        </ScrollView>
      ) : (
        <Text style={{ color: "white", textAlign: "center", margin: 20 }}>
          No Nearby Locations
        </Text>
      )}
    </View>
  );
};

export default Test;
const styles = StyleSheet.create({
  inputView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B79D71",
  },
  inputDesign: {
    fontFamily: "BaskervilleRegular",
    backgroundColor: "#B79D71",
    color: "#ffffff",
    width: "95%",
    height: 50,
    paddingLeft: 10,
  },
  QueueBtn: {
    width: 85,
    // height: 30,
    backgroundColor: "#927E5A",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
    // marginTop: 7,
  },
  lineBreak: {
    borderBottomColor: "#927E5A",
    borderBottomWidth: 1,
  },
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-evenly",
    margin: 15,
    // marginBottom:0,
  },
  textStyle: {
    color: "#927E5A",
    fontFamily: "OpenSansRegular",
    fontSize: 16,
    // margin:0,
    // padding:0
  },
});
