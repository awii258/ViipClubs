import { EvilIcons } from "@expo/vector-icons";

import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";


import React, { useContext, useEffect, useState } from "react";
import { Context as Actions } from "../Context/Actions";

import { MaterialIcons } from "@expo/vector-icons";
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
  ImageBackground,
  TextInput,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";


import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";
import ImageOverlay from "react-native-image-overlay";
const DATA = [
  {
    "id": 4,
    "name": "Marbella",
    "image": "https://service.manage.be-vip.com/storage/towns/jmJEAKJfselMjcRQnQrsg8URKjQSGHwsDREtKSlI.jpg"
},
  {
    "id": 116,
    "name": "Ibiza",
    "image": "https://service.manage.be-vip.com/storage/towns/DF4A3hdqfGEFbcQYjqLceEumwiQZKcKDiCW5k1Bz.jpg"
}
];



const RestaurantUK = ({ navigation, props }) => {

  //  const [masterDataSource, setMasterDataSource] = useState([]);
  // const [filteredDataSource, setFilteredDataSource] = useState([]);

  

  const { state, onAffiliate, clearOnProfile, onEventTown, OnEUROPE,verifyButton } =
    useContext(Actions);
  const [SearchTown, setSearchTown] = useState("");
  // const[pageCount, setPageCount] = useState(1)
  // const[pageLength, setPageLength] = useState(2)
  const [type, setType] = useState("");
  const [types, setTypes] = useState("Major Events");
  const [towns, setTowns] = useState([]);
  const [filteredTowns, setFilteredTowns] = useState([]);
  const [totalTowns, setTotalTowns] = useState(0);
  const [pageCount, setPageCount] = useState(25);
  const a = "Major Event";
  if (
    state?.pro?.data?.tier === null ||
    state?.pro?.data?.tier?.name.includes("Free Membership")
  ) {
    navigation.navigate("Subscription");
  }

  console.log("hello this is search set", SearchTown);
  const SearchTown_ = () => {
    // alert("search", search);
    // const tempSearch=search;
    // onMultiple("","",SearchTown,"","Major Event");
    // console.log(
    //   "Search=====================================================searchTown",
    //   SearchTown
    // );
  };
  // useEffect(()=>{
  //   if(SearchTown){
  //     onMultiple("","",SearchTown,"","Major Event");
  //   }
  //   else{
  //     onMultiple("","",SearchTown,"","Major Event");

  //   }
  // },[SearchTown])

  // console.log(
  //   "Filtered towns=======================================",
  //   state.towns
  // );

  useEffect(() => {
 
    if (state && state.europe) {
     
      const tempArr = state.europe;
      tempArr.sort(function (a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
      setTowns(tempArr);
      setTotalTowns(tempArr.length);
      setFilteredTowns([...tempArr.slice(0, 25)]);
      setPageCount(25);
    }
  }, [state?.europe]);

  useEffect(() => {
    setFilteredTowns([...towns.slice(0, pageCount)]);
  }, [pageCount]);

  useEffect(() => {
    OnEUROPE("", 1000, SearchTown, "", "Major Event");
    clearOnProfile();
    // console.log("hi");
  }, []);

  // useEffect(()=>{
  //   onAffiliate("", pageCount, pageLength, "events");
  // },[pageCount, pageLength])

  // useEffect(()=>{
  //   if(state && state.eventTowns){
  //     const tempArr = state.eventTowns
  //     console.log("Temp array in events: ", tempArr)
  //     setTowns([...towns, ...tempArr])
  //   }
  // },[state?.eventTowns])

  useFocusEffect(
    React.useCallback(() => {
      // console.log(
      //   "====================================Screen focused======================="
      // );
      clearOnProfile();
      verifyButton(false);
    }, [])
  );

  useEffect(() => {
    if (towns.length > 0) {
      if (SearchTown) {
        const tempArr = towns.filter((item) =>
          item.name.toLowerCase().includes(SearchTown.toLowerCase())
        );
        setFilteredTowns(tempArr);
      } else {
        setFilteredTowns([...towns.slice(0, 25)]);
        setPageCount(25);
      }
    }
  }, [SearchTown]);

  const [search, setSearch] = useState("");

  const renderItem = ({ item }: any) => {
    // console.log("subhan hi", item.name);

    return (
      <TouchableOpacity
        style={{ alignItems: "center", justifyContent: "center" }}
        onPress={() => {
          navigation.navigate("ClubsBars", {
            productTitle: item.name,
          });
        }}
      >
        <StatusBar
          translucent
          backgroundColor="#080402"
          barStyle="light-content"
        />
        <ImageOverlay
          overlayColor="#000000"
          //  "#19282F"
          overlayAlpha={0.65}
          source={{ uri: item.image }}
          resizeMode="cover"
          containerStyle={{
            height: 90,
            width: 414,
            marginTop: 20,
            flex: 1,
          }}
        >
          {/* <Text style={{ color: "#927E5A" }} selectable={true}>
          {item.name}
        </Text> */}

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

            <View style={{}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ClubsBars", {
                    productTitle: item.name,
                  });
                }}
              >
                <Entypo name="chevron-small-right" size={24} color="#927E5A"    />
              </TouchableOpacity>
            </View>
          </View>
        </ImageOverlay>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#000000",
        display: "flex",
      }}
    >
      <View
        style={{
          marginTop: 20,
          // paddingTop:13,
          // paddingBottom: 8,
          // paddingTop:30,
          // paddingBottom:30
          // flexDirection: "row",
          // justifyContent: "center",
          // alignItems: "center",
          // padding: 30,
          // alignSelf: "center",
        }}
      >
      <View style={styles.inputView}>
          <EvilIcons
            name="search"
            size={24}
            color="#ffffff"
            style={{ paddingLeft: 15 }}
          />

          {/* <View style={{flexDirection:"row",alignItems: "center",}}> */}
          <TextInput
            style={styles.inputDesign}
            placeholder="SEARCH CITY"
            placeholderTextColor="#ffffff"
            autoCapitalize={"words"}
            selectionColor="#927E5A"
            onChangeText={(text) => setSearchTown(text)}
            onSubmitEditing={SearchTown_}
            value={SearchTown}
          ></TextInput>
          {/* { SearchTown ?<TouchableOpacity onPress={() =>setSearchTown("")}>
            
            <EvilIcons name="close-o" size={26} color="#ffffff" />
            </TouchableOpacity>:null}
         
</View>  */}

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
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 200 }}
        showsVerticalScrollIndicator={false}
      >
        <FlatList
          data={filteredTowns}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={1}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          contentContainerStyle={{
            flexGrow: 1,
          }}

          // style={{
          //   flex:1,
          //   width: "100%",
          //   height:"auto",
          //   backgroundColor: "#FFFFFF",

          // }}
        />
        {towns &&
          state?.multiple &&
          filteredTowns.length !== totalTowns &&
          !SearchTown &&
          totalTowns > 25 && (
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
          )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RestaurantUK;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputView: {
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B79D71",
  },
  inputDesign: {
    fontFamily: "BaskervilleRegular",
    backgroundColor: "#B79D71",
    color: "#ffffff",
    width: "85%",
    height: 50,
    paddingLeft: 10,
  },
});
