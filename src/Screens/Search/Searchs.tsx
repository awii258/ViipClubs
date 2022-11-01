import { EvilIcons } from "@expo/vector-icons";

import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import React, { useContext, useEffect, useState } from "react";
import { Context as Actions } from "../../Context/Actions";

import { MaterialIcons } from "@expo/vector-icons";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
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

const Searchs = ({ navigation, route }: AnimalProps) => {
  useEffect(() => {
    onClubs(citys);
    // console.log("hi");
  }, []);
    const [search, setSearch] = useState("");

   const { state, onProfile, Logout, onClubs } = useContext(Actions);
   const g = state.clubs;
  //  console.log(":lskjfiasjf",state.clubs)
   let citys = search;
  //  console.log("ali", citys);
   




  //
  const renderItem = ({ item }: any) => {
    return (
      //   <TouchableOpacity
      //     onPress={() => {
      //       navigation.navigate("Du", {
      //         itemId: item.id,
      //         itemname: item.name,
      //         itemlat: item.latitude,
      //         itemlong: item.longitude,
      //       });
      //     }}
      //   >
      <View
        style={{
          margin: 15,
          height: "auto",
          padding: 15,

          backgroundColor: "#EAF1FD",
          borderColor: "#4E8BED",
        }}
        // onPress={() => getItem(item)}
      >
        {/* <Text style={{ color: "#927E5A" }} selectable={true}>
          {item.name}
        </Text> */}
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              color: "#927E5A",
              marginTop: 5,
              fontSize: 20,
              fontWeight: "400",
            }}
            selectable={true}
          >
            {item.name}
          </Text>
          <View
            style={{
              alignItems: "flex-end",
              position: "absolute",
              right: 0,
              marginTop: 5,
            }}
          >
            <TouchableOpacity
              style={{
                width: 92,
                height: 36,
                backgroundColor: "#927E5A",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#ffffff" }}> View</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
        }}
      >
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
              placeholder="Search"
              placeholderTextColor="#ffffff"
              autoCapitalize={"words"}
              selectionColor="#927E5A"
              onChangeText={(text) => setSearch(text)}
              value={search}
            ></TextInput>
            {/* <TextInput
              style={{
                width: 365,
                height: 50,
                alignSelf: "center",
                backgroundColor: "#927E5A",
                borderColor: "#927E5A",
              }}
              placeholder="Search Word"
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
                    <EvilIcons name="search" size={21} color="#ffffff" />
                  )}
                />
              }
            /> */}
          </View>
        </View>
      </View>
      <View style={{ marginLeft: 10 }}>
        <Text style={{ color: "#927E5A", fontSize: 20, fontWeight: "600" }}>
          {" "}
          Select City:
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={g}
          keyExtractor={(item, index) => item.id.toString()}
          initialNumToRender={1}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          // style={{ height: 500 }}
        />
      </View>
    </View>
  );
};

export default Searchs;
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

    backgroundColor: "#B79D71",
    color: "#424242",
  },
});