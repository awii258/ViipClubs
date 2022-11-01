import { EvilIcons } from "@expo/vector-icons";

import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import React, { useContext, useEffect, useState } from "react";
import { Context as Actions } from "../../Context/Actions";
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
} from "react-native";

type Stack = {
  YourSelf: undefined;
  home: undefined;
  notification: undefined;
  Person: undefined;
  Days: undefined;
  Animal: undefined;
  Dum: undefined;
};
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";
import ImageOverlay from "react-native-image-overlay";

const Stack = createNativeStackNavigator<Stack>();

type NavigationAnimalProps = NativeStackScreenProps<Stack, "Animal">;

type AnimalProps = {
  navigation: NavigationAnimalProps["navigation"];
};

const Bars = ({ navigation, props }: AnimalProps) => {
  //  const [masterDataSource, setMasterDataSource] = useState([]);
  // const [filteredDataSource, setFilteredDataSource] = useState([]);

  const { state, onAffiliate, clearOnProfile } = useContext(Actions);
  const [SearchTown, setSearchTown] = useState("");
  const SearchTown_ = () => {
    // alert("search", search);
    // const tempSearch=search;
    onAffiliate(SearchTown);
    // console.log(
    //   "Search=====================================================searchTown",
    //   SearchTown
    // );
  };
  // console.log(
  //   "Filtered towns=======================================",
  //   state.towns
  // );
  useEffect(() => {
    onAffiliate();
    clearOnProfile();
    // console.log("hi");
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // console.log(
      //   "====================================Screen focused======================="
      // );
      clearOnProfile();
    }, [])
  );

  useEffect(() => {
    if (SearchTown === "") {
      onAffiliate("");
    }
  }, [SearchTown]);

  // console.log("State ===================2", state2.towns);

  //   const uniqueAffiliates = new Set();
  //   const citiesorgarray=Array(state.users);
  //   console.log("jfddddddddddddddddddddddddddddddddddddddddddddddddddd", typeof(citiesorgarray));

  //   citiesorgarray.forEach(item =>{
  //     // console.log("Items====================================================================================",item);
  //   if(item){
  //     item.forEach(obj =>{
  //       // const temp = JSON.stringify({
  //       //   town:obj.town,
  //       //   image:obj.image
  //       // })
  //       uniqueAffiliates.add(obj.town);

  //     })
  //   }
  //   });
  // console.log('********************************* unique affliates', uniqueAffiliates);

  //   const finalCities = [];
  //   uniqueAffiliates.forEach(item => {
  //     const temp = JSON.parse(item);
  //     finalCities.push(temp);
  //   })
  //   console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!Final cities", finalCities);

  // const uniqueTowns = new Set();
  // let cities:
  //   | any[]
  //   | (() => any[])
  //   | readonly { town: unknown }[]
  //   | null
  //   | undefined = [];

  // const townArr = state.users;

  // if (townArr) {
  //   for (const item of Object.entries(state.users)) {
  //     console.log("iterating object");
  //     const [key, value] = item;
  //     console.log("awaiz", value.town);
  //     const tempObj = {
  //       town: value.town,
  //     };
  //     uniqueTowns.add(value.town);
  //     // uniqueTowns.add(item[1].["town"])
  //   }
  // } else {
  //   console.log("town arr empty");
  // }
  // // console.log("unique town ",uniqueTowns)
  // cities = Array.from(uniqueTowns);

  // cities = cities.map((item) => {
  //   return {
  //     town: item,
  //   };
  // });

  //

  //  const b = state.users;

  //  const uniqueString = [...new Set(b)]

  //    console.log
  // const uniqueTowns = new Set()

  // for (const object of state.users){
  //   console.log("Displaying state.users")
  //   console.log(object)
  // }

  // const experimentedArray = state.user.map(item => {

  // })

  // const v= state.users;
  //   const a = v.filter((el, i) => el.town)

  const [search, setSearch] = useState("");

  const renderItem = ({ item }: any) => {
    // console.log("subhan hi", item.name);

    return (
      <TouchableOpacity
        style={{ alignItems: "center", justifyContent: "center" }}
        onPress={() => {
          navigation.navigate("BarTopTabScreen", {
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
                  navigation.navigate("BarTopTabScreen", {
                    productTitle: item.name,
                  });
                }}
              >
                <Entypo name="chevron-small-right" size={24} color="#927E5A" />
              </TouchableOpacity>
            </View>
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
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: 30,
          alignSelf: "center",
        }}
      >
        <View style={styles.inputView}>
          <EvilIcons
            name="search"
            size={24}
            color="#ffffff"
            style={{ paddingLeft: 15 }}
          />
          <TextInput
            style={styles.inputDesign}
            placeholder="SEARCH CITY"
            placeholderTextColor="#ffffff"
            autoCapitalize={"words"}
            selectionColor="#ffffff"
            onChangeText={(text) => setSearchTown(text)}
            onSubmitEditing={SearchTown_}
            value={SearchTown}
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
      {/* <View style={{ marginLeft: 10 }}>
        <Text
          style={{
            color: "#B79D71",
            fontSize: 20,
            fontWeight: "600",
            fontFamily: "BaskervilleRegular",
            textTransform: "uppercase",
          }}
        >
          {" "}
          Select City
        </Text>
      </View> */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 200 }}
        showsVerticalScrollIndicator={false}
      >
        <FlatList
          data={state.towns}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={1}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          // style={{ height: 500 }}
        />
      </ScrollView>
    </View>
  );
};

export default Bars;
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
});
