import { EvilIcons } from "@expo/vector-icons";

import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {
  useNavigation,
  CommonActions,
  useFocusEffect,
} from "@react-navigation/native";

import ImageOverlay from "react-native-image-overlay";
import React, { useContext, useEffect, useState } from "react";
import { Context as Actions } from "../Context/Actions";
import { Entypo } from "@expo/vector-icons";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ImageBackground,
  TextInput,
  Alert,
  StatusBar,
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

const Clubs = ({ navigation, route }: AnimalProps) => {
  const { productId, productTitle } = route.params;
  // const [data, setData] = useState([]);
  const [SearchAffiliate, setSearchAffiliate] = useState("");

  const [clubBack, setClubBack] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(25);
  const [clubs, setClubs] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [totalClubCount, setTotalClubCount] = useState([]);

  // const [temptown,setTempTown]=useState([])

  const { state, onProfile, clearClub, clearEventsByTowns, clearEventsByClub } =
    useContext(Actions);

  // console.log("................>>>>> clubs", state.users);
  //   setData(state.users)
  const [firstRender, setFirstRender] = useState(true);
  const SearchAffiliate_ = () => {
    // alert("search", search);
    // const tempSearch=search;
    // onProfile(SearchAffiliate, "Club", productTitle, "","");
    // setClubs([]);
    // console.log("Search=====================================================search", SearchAffiliate);
  };
  //   const a = ()=>{
  //     if(SearchAffiliate){
  //       onProfile(SearchAffiliate, "Club", productTitle, "","");
  //       setClubs([]);
  //     }
  //     else{
  //       onProfile("", "Club", productTitle,page,pageCount);
  //       // setClubs([]);
  //     }
  //   }
  //   useEffect(()=>{
  // a()

  //   },[])
  //
  // console.log("Filtered Affiliates ==========================================", state.users);
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

  useFocusEffect(
    React.useCallback(() => {
      // console.log("====================================Screen focused=======================")
      clearClub();
      clearEventsByClub();
    }, [])
  );

  useEffect(() => {
    clearEventsByTowns();
    // onProfile("", "Club", productTitle, page, pageCount);
    // console.log("hi");
  }, []);

  // useEffect(() => {
  //   onProfile("", "Club", productTitle, page, pageCount);
  // }, [page, pageCount]);

  useEffect(() => {
    if (state && state.users) {
      const tempArr = state.users;
      tempArr.sort(function (a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
      setClubs(tempArr);
      setTotalClubCount(tempArr.length);
      setFilteredClubs([...tempArr.slice(0, 25)]);
      setPageCount(25);
    }
  }, [state?.users]);

  useEffect(() => {
    if (clubs.length > 0) {
      if (SearchAffiliate) {
        const tempArr = clubs.filter((item) =>
          item.name.toLowerCase().includes(SearchAffiliate.toLowerCase())
        );
        setFilteredClubs(tempArr)
      }else{
        setFilteredClubs([...clubs.slice(0, 25)])
        setPageCount(25)
      }
    }
  }, [SearchAffiliate]);

  useEffect(()=>{
    setFilteredClubs([...clubs.slice(0, pageCount)])
  },[pageCount])

  useEffect(() => {
    onProfile("", "Club", productTitle, "", 1000);
  }, []);

  // useEffect(() => {
  //   if (SearchAffiliate === "") {
  //     onProfile("", "Club", productTitle,page,pageCount);
  //   }
  // }, [SearchAffiliate]);
  // console.log("hello>>>>>>>>>???????????????????", productTitle);
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
  // console.log("this is new array ",state.users)
  console.log("state.users", state?.users);
  console.log("clubs of city", clubs);
  const renderItem = ({ item }: any) => {
    const image = item.images[0];

    // console.log("hilllstatution", item.id);
    return (
      <TouchableOpacity
        style={{ alignItems: "center", justifyContent: "center", }}
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
        <StatusBar
          translucent
          backgroundColor="#080402"
          barStyle="light-content"
        />
        <ImageOverlay
          overlayColor="#000000"
          //  "#19282F"
          overlayAlpha={0.6}
          source={{ uri: item.images[0] || "" }}
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
      <View
        style={{
          marginTop: 20,
          // paddingTop: 30,
          // paddingBottom: 30,
          // flexDirection: "row",
          // justifyContent: "center",
          // alignItems: "center",
          // padding: 30,
          // marginTop:12,
          // paddingTop:13,
          // paddingBottom: 8,
        }}
      >
        <View>
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
              placeholder="SEARCH CLUBS"
              placeholderTextColor="#ffffff"
              autoCapitalize={"words"}
              selectionColor={"#927E5A"}
              onChangeText={(SearchAffiliate_) =>
                setSearchAffiliate(SearchAffiliate_)
              }
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
      </View>

      {/* <View style={{ marginLeft: 10 }}>
        <Text style={{ color: "#927E5A", fontSize: 20, fontWeight: "600",  fontFamily:"BaskervilleRegular",
              textTransform:"uppercase"    }}>
          {" "}
          Clubs in {city}
        </Text>
      </View> */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 200 }}
        showsVerticalScrollIndicator={false}
      >
        <FlatList
          data={filteredClubs}
          keyExtractor={(item, index) => item.id.toString()}
          initialNumToRender={1}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          // style={{ height: 500 }}
        />

        {state?.users && clubs && filteredClubs.length !== totalClubCount && !SearchAffiliate && totalClubCount > 25 && (
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
    </View>
  );
};

export default Clubs;
const styles = StyleSheet.create({
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
