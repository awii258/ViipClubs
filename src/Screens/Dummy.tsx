import { EvilIcons } from "@expo/vector-icons";

import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import React, { useContext, useEffect, useState } from "react";
import { Context as Actions } from "../Context/Actions";
import { MaterialIcons } from "@expo/vector-icons";
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

const Dummy = ({ navigation, route }: AnimalProps) => {
  const { productId, productTitle } = route.params;
  const [data, setData] = useState([]);
  const [SearchAffiliate, setSearchAffiliate] = useState("");

  const { state, onProfile } = useContext(Actions);
  // console.log("................>>>>>", state.users);
  //   setData(state.users)

  const SearchAffiliate_ =()=>{
   // alert("search", search);
   // const tempSearch=search;
   onProfile(SearchAffiliate);
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
    onProfile("");

    // console.log("hi");
  }, []);

    
  

  let c = productId;
  // console.log(">>>??>>>????", productId);
  const b = state.users;
  let city = productTitle;
  // console.log("awaiz", city);
  const a = b && b?.filter((el, i) => el.town == city);
  //   console.log("awaizsdf", data);
  //  console.log('akdjflksdjflkdsjflksd',)

  

  // const [masterDataSource, setMasterDataSource] = useState("");
  //   let a = search.charAt(0).toUpperCase() + search.slice(1);
  //   let filteredDataSource = masterDataSource.filter(
  //     (item: any) => item.english.includes(a) || item.barawa.includes(a)
  //   );

  // 👆 do this instead of creating new state:

  
  const renderItem = ({ item }: any) => {

    // console.log("hilllstatution", item.id);
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Du", {
            itemId: item.id,
            itemname: item.name,
            itemlat: item.latitude,
            itemlong: item.longitude,
          });
        }}
      >
        <ImageBackground
          source={{ uri: item.image }}
          resizeMode="cover"
          style={{
            height: 100,
            width: 414,
            marginTop: 30,
            opacity: 2,
            backgroundColor: "black",
          }}
        >
          <View style={{ backgroundColor: "rgba(0,0,0,0.5)", flex: 1 }}>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  color: "#927E5A",

                  fontSize: 20,
                  fontWeight: "400",
                  textAlign: "justify",
                  marginTop: 30,
                  marginLeft: 20,
                  fontFamily:"BaskervilleRegular",
              textTransform:"uppercase"   
                }}
                selectable={true}
              >
                {item.name}
              </Text>
              <View
                style={{
                  position: "absolute",
                  right: 40,
                  marginTop: 30,
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    width: 92,
                    height: 36,
                    backgroundColor: "#927E5A",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius:5
                  }}
                  onPress={() => {
                    navigation.navigate("Du", {
                      itemId: item.id,
                      itemname: item.name,
                      itemlat: item.latitude,
                      itemlong: item.longitude,
                    });
                  }}
                >
                  <Text style={{ color: "#000000",  fontFamily:"OpenSansRegular", }}> View</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
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
              placeholder="SEARCH CLUBS"
              placeholderTextColor="#ffffff"
              autoCapitalize={"words"}
              selectionColor="#927E5A"
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
      </View>

      <View style={{ marginLeft: 10 }}>
        <Text style={{ color: "#927E5A", fontSize: 20, fontWeight: "600",  fontFamily:"BaskervilleRegular",
              textTransform:"uppercase"    }}>
          {" "}
          Clubs in {city}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={a}
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

export default Dummy;
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
    fontFamily:"OpenSansRegular",
    backgroundColor: "#B79D71",
    color: "#424242",
  },
});