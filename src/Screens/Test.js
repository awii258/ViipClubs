import { EvilIcons } from "@expo/vector-icons";

import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import React, { useContext, useEffect, useState } from "react";
import { Context as Actions } from "../Context/Actions";
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import Spinner from 'react-native-loading-spinner-overlay';

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
  Alert,
} from "react-native";
import * as geolib from "geolib";

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";
import ImageOverlay from "react-native-image-overlay";
import Geocoder from "react-native-geocoding";

const Test = ({ props,route,clubname }) => {
  // const{clubname}=props
  console.log("test screen idd club",clubname)
  const { state, onAffiliate, clearOnProfile, onTest } = useContext(Actions);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [dataM, setDataM] = useState();
  const [affiliatesByCity, setAffiliatesByCity] = useState('');
  const [isLoading, setIsLoading] = useState(true)

const[verify,setVerify]=useState(false)

  // const NodeGeocoder = require('node-geocoder');

  // const options = {
  //   provider: 'google',

  //   // Optional depending on the providers
  //   fetch: customFetchImplementation,
  //   apiKey: 'YOUR_API_KEY', // for Mapquest, OpenCage, Google Premier
  //   formatter: null // 'gpx', 'string', ...
  // };

  // const geocoder = NodeGeocoder(options);

  // // Using callback
  // const res =  geocoder.geocode('29 champs elysée paris');

  // console.log("hello this is response",res)
  const navigation = useNavigation();

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log("Showing location object: ", location);
    setLocation(location);
  }
  useEffect(() => {
    // getLocation();
    // (async () => {
    //   let { status } = await Location.requestForegroundPermissionsAsync();
    //   if (status !== "granted") {
    //     setErrorMsg("Permission to access location was denied");
    //     return;
    //   }

    //   let location = await Location.getCurrentPositionAsync({});
    //   console.log("Showing location object: ", location);
    //   setLocation(location);

    // })();
  }, []);

  useEffect(() => {
    // onAffiliate();
    // clearOnProfile();
    if (dataM) {
      onTest("Club", dataM);
      // setIsLoading(false)
    }

    console.log("hi new arrry old moterh", affiliatesByCity);
    console.log("inside api calling useeffect");
    console.log("Showing dataM Value: ", dataM);
  }, [location, a, c, dataM]);
  // console.log("state data is here",state?.pro?.data?.tier?.name)
  // && state?.pro?.data?.tier === null || state?.pro?.data?.tier?.name.includes("Free Membership")
  useEffect(() => {
    if (state && state.test) {
      // console.log("Showing sample state.test:", state?.test[0]);
      setAffiliatesByCity(state.test);
    }
  }, [state?.test]);

  const [a, setA] = useState("");
  const [c, setC] = useState("");

  useEffect(() => {
    if (location && location.coords) {
      setA(location.coords.latitude);
      setC(location.coords.longitude);
      // setIsLoading(false)
    }
  }, [location]);

  // const a = 53.5769
  // const c = 2.4282

  // const a = location ? location.coords.latitude : null;
  // const c = location ? location.coords.longitude : null;
  // const a =32.563195128462475
  // const c= 74.1005

  const [nearByAffiliates, setNearByAffiliates] = useState([]);

  useEffect(() => {
    console.log("just above if a and c: ", a, c);
    if ((a, c) && affiliatesByCity) {
      const filteredArr = affiliatesByCity.filter((item) => {

        if (

          geolib.isPointWithinRadius(
            { latitude: item.latitude, longitude: item.longitude },
            { latitude: a, longitude: c },
            8050
          )

        ) {
          return item;
        }      
      });


      console.log("filtered arry ", filteredArr);
      setNearByAffiliates(filteredArr);
      setIsLoading(false)

    }
  }, [a, c, dataM, state, affiliatesByCity]);

  const [sortByAffiliates, setSortByAffiliates] = useState([]);

  // useEffect(()=>{
  //   if ((a, c) && nearByAffiliates) {
  //     const sortArr = nearByAffiliates.filter((item) => {

  //       if (

  //         geolib.orderByDistance({ latitude: a, longitude: c}, [
  //           { latitude: item.latitude, longitude: item.longitude },
          
  //       ])

  //       ) {
  //         return item;
  //       }      
  //     });
  //     setSortByAffiliates( sortArr)
  //   }
  // },[]);
  console.log("hello this is the nearest array",nearByAffiliates)
  useEffect(()=>{

    if((a, c)&&nearByAffiliates){
    const asin = Math.asin
    const cos = Math.cos
    const sin = Math.sin
    const PI_180 = Math.PI / 180
    
    function hav(x) {
      const s = sin(x / 2)
      return s * s
    }
    
    function relativeHaversineDistance(lat1, lon1, lat2, lon2) {
      const aLatRad = lat1 * PI_180
      const bLatRad = lat2 * PI_180
      const aLngRad = lon1 * PI_180
      const bLngRad = lon2 * PI_180
    
      const ht = hav(bLatRad - aLatRad) + cos(aLatRad) * cos(bLatRad) * hav(bLngRad - aLngRad)
      // since we're only interested in relative differences,
      // there is no need to multiply by earth radius or to sqrt the squared differences
      return asin(ht)
    }
    
    const locations = nearByAffiliates
    
    const distanceTo = {
      "id": 279,
      "longitude": a,
      "latitude": c
    }
    const sorted = locations.sort((a, b) => relativeHaversineDistance(a.latitude, a.longitude, distanceTo.latitude, distanceTo.longitude) - relativeHaversineDistance(b.latitude, b.longitude, distanceTo.latitude, distanceTo.longitude))
    setSortByAffiliates(sorted.reverse())

    console.log("hello this is sorted array", sorted)}
  },[a,c,nearByAffiliates])
  
// useEffect(()=>{
//   setTimeout(() => {
//     setIsLoading(false);
//   }, 12000);
// },[])
  useEffect(() => {
    if ((a, c)) {
      Geocoder.from(a, c)
        .then((json) => {
          var user_city = json.results[0].address_components.filter(
            (ac) => ~ac.types.indexOf("postal_town")
          )[0].long_name;

          // json.results[0].address_components.filter(
          //   (ac) => ~ac.types.indexOf("locality")
          // )[0].long_name;
          console.log("city name with only ", user_city);
          setDataM(user_city);
          // var addressComponent = json.results[0].formatted_address;

          // console.log("hell", addressComponent);
          // const city = addressComponent.split(",")[3]
          // console.log("showing city array: ", addressComponent.split(","));
          // console.log("Showing city: ", city)postal_town
        })
        .catch((error) => console.warn(error));
    }
  }, [a, c]);

  // useEffect(()=>{
  //   if(!nearByAffiliates){
  //     setIsLoading(false)
  //   }

  // },[nearByAffiliates])

  // const[a, setA] = useState('')
  // const[c, setC] = useState('')

  console.log("Showing A values: ", a);
  console.log("showing c value: ", c);

  // console.log("testing nearbyAffiliates array: ", nearByAffiliates);

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
      // console.log("hello this is get loaction")
      
      
      // if(fromScreen !== "verify"){
      //   getLocation();
      //   setIsLoading(true)
      // }
      if(!state.verify){
        getLocation();
        setIsLoading(true)
        // Alert.alert("hello inside",state.verify.toString())
      }
      
      console.log("hell>>>>>>>>>>>>>",state.verify)
      //  console.log(
      //    "====================================Screen focused======================="
      //  );
      // clearOnProfile();
    }, [state.verify])
  );


  // useEffect(()=>{
  //   if(!state.verify){
  //     getLocation();
  //     setIsLoading(true)
  //     // Alert.alert("hello inside",state.verify.toString())
  //   }
  // },[])
// useEffect(()=>{
//   if(state.verify){Alert.alert("hello inside",state.verify.toString())}
// },[state.verify])
 
  //    const b=state.test
  //    console.log("some errors", b);
  // console.log("helloo???????????????????????????????????????????",state?.test)
  // console.log("city name ", dataM);
  // const[nearbyAffiliates, setNearByAffiliates] = useState([])
  if (isLoading) {
    return (
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={isLoading}
        color={"#927E5A"}
        //Text with the Spinner
        textContent={'Searching Nearby Clubs & Bars'}
        //Text style of the Spinner Text
        textStyle={styles.spinnerTextStyle}
      />
    )
  }
  // console.log("hell is loading",isLoading)
  const renderItem = ({ item }) => {
    // console.log("subhan hi", item.name);

// console.log("hello>>>>>>>>>>>>>>",fromScreen)

    return (
   
      <>
      <TouchableOpacity
      onPress={() => {
        {
          navigation.navigate("Verify", { userlatitude: a, userlongitude: c, affiliateLatitude: item.latitude, affiliateLongitude: item.longitude, affiliateId: item.id, clubname:clubname });
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
              navigation.navigate("Verify", { userlatitude: a, userlongitude: c, affiliateLatitude: item.latitude, affiliateLongitude: item.longitude, affiliateId: item.id, clubname, });
            }
          }}
        >
          <Text style={{ fontFamily: "OpenSansRegular", }}>Queue Jump</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>

    <View style={styles.lineBreak}></View></>   
        
      
    );
  };

  // const getItem = (item) => {
  //   Alert.alert(item.extra);
  // };

  return (
<>
 <View
      style={{
        flex: 1,
        backgroundColor: "#000000",
      }}
    >


     

      {nearByAffiliates && nearByAffiliates.length > 0 ? (
        <ScrollView
          contentContainerStyle={{ paddingBottom: 200 }}
          showsVerticalScrollIndicator={false}
        >
          <FlatList
            data={sortByAffiliates}
            keyExtractor={(item, index) => index}
            initialNumToRender={1}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
          // style={{ paddingBottom: 500 }}
          />
        </ScrollView>
      ) : (
        <Text style={{ color: "white", textAlign: "center", margin: 20,fontFamily: "OpenSansRegular",fontSize:18 }}>
          No Nearby Locations
        </Text>
      )}
    </View>
      
      
     
    
    </>


   
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
    // width: 85,
    // height: 30,
    backgroundColor: "#927E5A",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
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
  spinnerTextStyle: {
    color: '#927E5A',
  },
  textStyle: {
    color: "#927E5A",
    fontFamily: "OpenSansRegular",
    fontSize: 16,
    // margin:0,
    // padding:0
  },
});
