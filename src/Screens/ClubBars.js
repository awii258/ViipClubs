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


import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";

// const Stack = createNativeStackNavigator<Stack>();

// type NavigationAnimalProps = NativeStackScreenProps<Stack, "Animal">;

// type AnimalProps = {
//   navigation: NavigationAnimalProps["navigation"];
// };
const a = "Major Event"
const ClubBars = ({ navigation, route }) => {
  const { productId, productTitle } = route.params;
  console.log("city name bar ", productTitle)
  // const [data, setData] = useState([]);

  const { state, onProfile, clearClub, clearEventsByClub, clearEventsByTowns, onEventTown } =
    useContext(Actions);
  console.log("subscription", state?.users)
  const [SearchAffiliate, setSearchAffiliate] = useState("");
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [totalEvents, setTotalEvents] = useState(0)
  const [pageCount, setPageCount] = useState(25)

  // console.log("................>>>>>", state.users);
  //   setData(state.users)

  const SearchAffiliate_ = () => {
    // alert("search", search);
    // const tempSearch=search;
    // onEventTown(""," "," "," ",productTitle," ","Major Event",SearchAffiliate);
    //  console.log("Search=====================================================search", SearchAffiliate);
  };
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
    onEventTown( productTitle, " ",SearchAffiliate);
    clearEventsByTowns();

    // console.log("hi");
  }, []);

  useEffect(() => {
    if (state && state.cityEvents) {
      const tempArr = state.cityEvents;
      if (tempArr.length > 0) {
        tempArr.sort(function (a, b) {
          var textA = a.title.toUpperCase();
          var textB = b.title.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
      }

      setEvents(tempArr)
      setTotalEvents(tempArr.length)
      setFilteredEvents([...tempArr.slice(0, 25)])
      setPageCount(25)
    }

  }, [state?.cityEvents])

  useEffect(() => {
    setFilteredEvents([...events.slice(0, pageCount)])
  }, [pageCount])

  useEffect(() => {
    if (events.length > 0) {
      if (SearchAffiliate) {
        const tempArr = events.filter((item) =>
          item.name.toLowerCase().includes(SearchAffiliate.toLowerCase())
        );
        setFilteredEvents(tempArr)
      } else {
        setFilteredEvents([...events.slice(0, 25)])
        setPageCount(25)
      }
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
            itemDescription: item && item.description || "",
            itemImages: item && item.images || "",
            itemSaved:  item && item.is_saved || "",
            itemPhone:  item && item.phone || "",
            itemEmail:  item && item.email || "",
            itemWebsite:  item && item.website || "",
            itemPostCode:  item && item.postcode || "",
            itemlat: item &&  item.latitude || "",
            itemlong:  item && item.longitude || "",
            itemCountry:  item && item.country || "",
            itemRegion:  item && item.region || "",
            itemAddress1: item &&  item.address1 || "",
            itemAddress2:  item && item.address2 || "",
            itemDate: item.date || "",
            itemTime: item.time || "",
            barname: "bar",
          });
        }}
      >
        <ImageOverlay
          overlayColor="#000000"
          //  "#19282F"
          overlayAlpha={0.6}
          source={{ uri:  item.images[0] || ""}}
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
                  itemDescription: item &&  item.description || "",
                  itemImages: item &&  item.images || "",
                  itemSaved: item &&  item.is_saved || "",
                  itemPhone: item &&  item.phone || "",
                  itemEmail: item &&  item.email || "",
                  itemWebsite: item &&  item.website || "",
                  itemPostCode: item &&  item.postcode || "",
                  itemlat: item &&  item.latitude || "",
                  itemlong: item &&  item.longitude || "",
                  itemCountry: item &&  item.country || "",
                  itemRegion:  item && item.region || "",
                  itemAddress1: item &&  item.address1 || "",
                  itemAddress2: item &&  item.address2 || "",
                  itemDate: item.date || "",
                  itemTime: item.time || "",
                  barname: "bar",
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
          marginTop: 20,

          // paddingTop:13,
          // paddingBottom: 8,
          // flexDirection: "row",
          // justifyContent: "center",
          // alignItems: "center",
          // padding: 30,
          // margin:0,
          // marginRight: 10,
          // paddingTop: 30,
          // paddingBottom: 30,
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
          {/* <View style={{flexDirection:"row",alignItems: "center",}}> */}
          <TextInput
            style={styles.inputDesign}
            placeholder="SEARCH RESTAURANTS"
            placeholderTextColor="#ffffff"
            autoCapitalize={"words"}
            selectionColor="#927E5A"
            onChangeText={(text) => setSearchAffiliate(text)}
            onSubmitEditing={SearchAffiliate_}
            value={SearchAffiliate}
          ></TextInput>
          {/* { SearchAffiliate ?<TouchableOpacity onPress={() =>setSearchAffiliate("")}>
            
            <EvilIcons name="close-o" size={26} color="#ffffff" />
            </TouchableOpacity>:null}
            </View> */}
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

      {
        filteredEvents.length > 0 ? (
          <ScrollView
            contentContainerStyle={{ paddingBottom: 200 }}
            showsVerticalScrollIndicator={false}
          >
            <FlatList

              data={filteredEvents}
              keyExtractor={(item, index) => item.id.toString()}
              initialNumToRender={1}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
            // style={{ height: 500 }}
            />
            {
              events && state?.cityEvents && filteredEvents.length !== totalEvents && !SearchAffiliate && totalEvents > 25 && (
                <Text
                  style={{
                    color: "#927E5A",
                    textAlign: "center",
                    alignSelf: "center",
                    marginTop: 15,
                    fontSize: 16,
                    fontFamily: "BaskervilleRegular",
                  }}
                  onPress={() => setPageCount(pageCount + pageCount)}
                >
                  LOAD MORE
                </Text>
              )
            }
          </ScrollView>
        ) : (<Text>No Data Found</Text>)
      }


    </View>
  );
};

export default ClubBars;
const styles = StyleSheet.create({
  inputView: {
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B79D71",

    // width: 365,
    height: 50,
  },
  iconDesign: {
    paddingLeft: 15,
  },
  inputDesign: {
    fontFamily: "BaskervilleRegular",
    backgroundColor: "#B79D71",
    color: "#ffffff",
    // width: ("95%"),
    width: "85%",
    height: 50,
    paddingLeft: 10,
  },
});
