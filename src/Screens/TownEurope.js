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
  LogBox,
  StatusBar,
  Button,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";
import ImageOverlay from "react-native-image-overlay";

import Clubs from "./TabsScreen/Clubs";

// import { Button } from "native-base";
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


const TownEurope = ({ navigation, props }) => {
 
  //  const [masterDataSource, setMasterDataSource] = useState([]);
  // const [filteredDataSource, setFilteredDataSource] = useState([]);

  const { state, onAffiliates, clearOnProfile,verifyButton } = useContext(Actions);
  const [SearchTown, setSearchTown] = useState("");
  const [userType, setUserType] = useState("user type");
  const [pageCount, setPageCount] = useState(1);
  const [pageLength, setPageLength] = useState(25);
  const [towns, setTowns] = useState([]);
  const [firstRender, setFirstRender] = useState(true);
  const [temptown, setTempTown] = useState([]);
  const [filteredTowns, setFilteredTowns] = useState([]);
  const [totalCountTowns, setTotalCountTowns] = useState(0);

  // console.log(
  //   "Checking Acess>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
  // );

  const checkSubscription = async () => {
    const subscription = await AsyncStorage.getItem("user-type");
    setUserType(subscription);
  };

  useEffect(() => {
    checkSubscription();
  }, []);

  if (!userType || userType.includes("Free Membership")) {
    navigation.navigate("Subscription");
  }

  const SearchTown_ = () => {
    // alert("search", search);
    // const tempSearch=search;

    // onAffiliate(SearchTown, "", "", "clubs");
    // setTowns([]);

    // console.log("Search=====================================================searchTown", SearchTown);
  };

  useEffect(() => {
    if (towns.length > 0) {
      if (SearchTown) {
        const tempArr = towns.filter((item) =>
          item.name.toLowerCase().includes(SearchTown.toLowerCase())
        );
        setFilteredTowns(tempArr);
      } else {
        setFilteredTowns([...towns.slice(0, 25)])
        setPageLength(25)
      }
    }
  }, [SearchTown]);

  // console.log("Filtered towns=======================================",state.towns);
  // useEffect(() => {
  //   // clearOnProfile();
  //   onAffiliate("", "", "", "clubs");
  //   // console.log("hi");
  // }, [pageCount, pageLength]);
  // useEffect(()=>{

  //   // if(SearchTown !==""){
  //   //   onAffiliate(SearchTown,"","","clubs");
  //   //   setTowns([])
  //   // }

  //     // onAffiliate("", pageCount, pageLength,"clubs");
  //     //     setTowns([])

  // },[SearchTown,])

  // useEffect(() => {
  //   // if(firstRender){
  //   //   setFirstRender(false)
  //   // }
  //   if (state && state.towns) {
  //     console.log("if condition inside", state.towns);
  //     const tempArr = firstRender ? [] : state.towns;
  //     setTempTown(tempArr);
  //     // console.log("showing tempArr: ", tempArr)
  //     let tempSortArr = [...towns, ...tempArr];
  //     tempSortArr = tempSortArr;
  //     tempSortArr = tempSortArr.sort(function (a, b) {
  //       var textA = a.name.toUpperCase();
  //       var textB = b.name.toUpperCase();
  //       return textA < textB ? -1 : textA > textB ? 1 : 0;
  //     });
  //     setTowns(tempSortArr);
  //     setFirstRender(false);
  //   }
  //   //     if(state && state.towns && SearchTown !== ""){
  //   //       const tempArr = firstRender ? [] : state.towns
  //   //       console.log("showing tempArr: ", tempArr)
  //   //       let tempSortArr = [...towns, ...tempArr]
  //   // tempSortArr = tempSortArr.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : a.name.toLowerCase() > b.name.toLowerCase() ? 1  : 0)
  //   //       setTowns(tempSortArr )
  //   //       setFirstRender(false)

  //   //     }

  //   // console.log("towns are changed")
  // }, [state?.towns]);

  useEffect(() => {
   
    if (state && state.ibiza) {
     
      const tempArr = state.ibiza;
      tempArr.sort(function (a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
      setTowns(tempArr);
      setTotalCountTowns(tempArr.length);
      setFilteredTowns([...tempArr.slice(0, 25)]);
      setPageLength(25)
    }
  }, [state?.ibiza]);

  useEffect(() => {
    setFilteredTowns([...towns.slice(0, pageLength)]);
  }, [pageLength]);

  // useEffect(() => {
  //   const tempArr = [];
  //   let tempCountFirst = pageCount - 1;
  //   tempCountFirst = tempCountFirst + pageLength;

  //   // setFilteredTowns()
  // }, [pageCount, pageLength]);

  useEffect(() => {
    onAffiliates(SearchTown, "", "", "clubs",);
    // setFirstRender(false)
  }, []);

  // useEffect(() => {
  //   if (SearchTown === "") {
  //     onAffiliate("", pageCount, pageLength,"clubs");
  //     setTowns([])
  //   }
  // }, [SearchTown]);
  // useEffect(() => {
  //   LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  // }, []);

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

  // useEffect(()=>{
  //   if(firstRender && towns.length > 0){
  //     setTowns([...towns.slice(0,3)])
  //     setFirstRender(false)
  //   }
  // },[])

  useFocusEffect(
    React.useCallback(() => {
      //  console.log(
      //    "====================================Screen focused======================="
      //  );
      clearOnProfile();
      verifyButton(false)
    }, [])
  );

  console.log("the array of town", towns.length);

  // console.log("is this array",state.towns.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : a.name.toLowerCase() > b.name.toLowerCase() ? 1 : a.lastname.toLowerCase() < b.lastname.toLowerCase() ? -1 : a.lastname.toLowerCase() > b.lastname.toLowerCase() ? 1 : 0))

  const renderItem = ({ item }: any) => {
    // console.log("subhan hi", item.name);
    // const abc=[];
    // abc.push(item.name);
    // console.log ('arry of name',  Array.isArray(item))

    return (
      <TouchableOpacity
        style={{ alignItems: "center", justifyContent: "center" }}
        onPress={() => {
          navigation.navigate("TopTabScreen", {
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
            // paddingBottom: 100,
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
                  navigation.navigate("TopTabScreen", {
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

  // console.log("showing towns: ", towns)

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
          marginTop: 20,
          // paddingTop:13,
          // paddingBottom: 8,
          // flexDirection: "row",
          // justifyContent: "center",
          // alignItems: "center",
          // padding: 30,
          // alignSelf:"center",
          // marginBottom:10
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
        <Text style={{ color: "#B79D71", fontSize: 20, fontWeight: "600",  fontFamily:"BaskervilleRegular",
              textTransform:"uppercase"    }}>
          {" "}
          Select City
        </Text>
      </View> */}
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
          // style={{ height: 500 }}
        />

        {towns && state?.towns && filteredTowns.length !== totalCountTowns && !SearchTown && totalCountTowns > 25 && (
          <Text
            style={{
              color: "#927E5A",
              textAlign: "center",
              alignSelf: "center",
              marginTop: 15,
              fontSize: 16,
              fontFamily: "BaskervilleRegular",
            }}
            onPress={() => setPageLength(pageLength + pageLength)}
          >
            LOAD MORE
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default TownEurope;
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
    // width: ("95%"),
    width: "85%",
    height: 50,
    paddingLeft: 10,
  },
});
