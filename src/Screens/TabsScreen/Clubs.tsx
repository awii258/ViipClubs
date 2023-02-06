import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
  StatusBar,
  Linking,
} from "react-native";

import { Entypo } from "@expo/vector-icons";

import React, { useState, useEffect, useContext } from "react";
import { EvilIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Context as Actions } from "../../Context/Actions";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
// import ImageOverlay from "react-native-image-overlay";
import ImageOverlay from "react-native-image-overlay";
const data = [
  {
    id: 1,
    text1: "Win Love Island Final Tickets + A Majorca Trip For 2.",
    text2: "Coming Soon",
    img: require("../../../assets/Image/image1.png"),
  },
  {
    id: 2,
    text1: "Over in the Canaries, Tenerife’s one of the best sunshine spots.",
    text2: "Coming Soon",
    img: require("../../../assets/Image/image2.png"),
  },
];
const Clubs = () => {
 
  const navigation = useNavigation();
  const { state, onCompetitions, onEventTown, onMultiple,verifyButton } =
    useContext(Actions);

  const [search, setSearch] = useState("");
  const [SearchAffiliate, setSearchAffiliate] = useState("");
  const [competitions, setCompetitions] = useState([]);
  const [filteredCompetitions, setFilteredCompetitions] = useState([]);

  const SearchAffiliate_ = () => {
    // alert("search", search);
    // const tempSearch=search;
    // onCompetitions(SearchAffiliate);
    //  console.log("Search=====================================================search", SearchAffiliate);
  };

  useEffect(() => {
    onCompetitions("");

    // console.log("hi");
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      //  console.log(
      //    "====================================Screen focused======================="
      //  );
      onCompetitions("");
      verifyButton(false);
    }, [])
  );
  useEffect(() => {
    if (competitions) {
      if (SearchAffiliate) {
        const tempArr = competitions.filter((item) =>
          item.title.toLowerCase().includes(SearchAffiliate.toLowerCase())
        );
        setFilteredCompetitions(tempArr);
      } else {
        setFilteredCompetitions(competitions);
      }
    }
  }, [SearchAffiliate]);

  useEffect(() => {
    if (state && state.competition) {
      setCompetitions(state.competition);
      setFilteredCompetitions(state.competition);
    }
  }, [state?.competition]);

  // console.log(
  //   "competition        -----  ................>>>>>",
  //   state.competition
  // );
  console.log("hello competition", state?.competition);
  const renderItem = ({ item }: any) => {
    // console.log("subhan hi", item.name);

    return (
      <TouchableOpacity
        style={[styles.imageContainer, { flex: 1 }]}
        onPress={() =>
          Linking.openURL("https://www.instagram.com/bevipblackcard")
        }

        //   onPress={() => navigation.navigate("Competition Detail", {
        //   image: item.image,
        //   title: item.title,
        //   content: item.content,
        //   link:item.link
        // })}
      >
        {/* <Text style={{ color: "white" }}>YO</Text> */}
        <StatusBar
          translucent
          backgroundColor="#080402"
          barStyle="light-content"
        />
        <ImageOverlay
          overlayColor="#000000"
          //  "#19282F"
          overlayAlpha={0.8}
          source={{ uri: item.image }}
          containerStyle={styles.imageStyle}
          resizeMode="cover"
        >
          <View style={{}}>
            <View
              style={{
                flex: 1,

                // flexDirection:"row",

                // padding:5,
                // margin:20
                paddingBottom: 15,
                paddingTop: 0,
                paddingLeft: 30,
                paddingRight: 30,
                // backgroundColor:'red'
              }}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  style={[
                    styles.textStyle1,
                    { marginTop: hp("2%"), color: "#927E5A" },
                  ]}
                >
                  {item.title}
                </Text>
                {/* <View style={{marginBottom:hp("1%"),marginTop:hp("5%"),alignSelf:"center",}}>
          <TouchableOpacity
              style={styles.QueueBtn}
              onPress={() =>
                Linking.openURL("https://www.instagram.com/bevipblackcard")
              }
            >
            
              <Text style={{  fontFamily: "OpenSansRegular",}}>Enter Competition</Text>
            </TouchableOpacity></View> */}
                <Text style={[styles.textStyle, {}]}>{item.content}</Text>
              </View>
              <View
                style={{
                  marginBottom: hp("2%"),
                  marginTop: hp("2%"),
                  alignSelf: "center",
                }}
              >
                <TouchableOpacity
                  style={styles.QueueBtn}
                  onPress={() =>
                    Linking.openURL("https://www.instagram.com/bevipblackcard")
                  }
                >
                  <Text style={{ fontFamily: "OpenSansRegular" }}>
                    Enter Competition
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageOverlay>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: 20,
          // paddingTop:13,
          // paddingBottom: 8,
          // paddingTop:30, paddingBottom:30
        }}
      >
        <View style={styles.inputView}>
          <EvilIcons
            name="search"
            size={24}
            color="#ffffff"
            style={{ paddingLeft: 15 }}
          />
          {/* <View style={{ flexDirection: "row", alignItems: "center" }}> */}
            <TextInput
              style={styles.inputDesign}
              placeholder="SEARCH COMPETITIONS"
              placeholderTextColor="#ffffff"
              autoCapitalize={"words"}
              selectionColor="#927E5A"
              onChangeText={(text) => setSearchAffiliate(text)}
              onSubmitEditing={SearchAffiliate_}
              value={SearchAffiliate}
            ></TextInput>
            {/* {SearchAffiliate ? (
              <TouchableOpacity onPress={() => setSearchAffiliate("")}>
                <EvilIcons name="close-o" size={26} color="#ffffff" />
              </TouchableOpacity>
            ) : null}
          </View> */}
        </View>
      </View>

      {/* <KeyboardAvoidingView enabled={true}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{ flex: 1 }}>
    <ScrollView style={{paddingBottom:200}}
        showsVerticalScrollIndicator={false}> */}

      <ScrollView
        contentContainerStyle={{ paddingBottom: 200 }}
        showsVerticalScrollIndicator={false}
      >
        <FlatList
          inverted
          data={filteredCompetitions}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={1}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
      </ScrollView>
    </View>
  );
};

export default Clubs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // padding: 30,
    // padding:0,
    // paddingTop:30,
    // paddingBottom:25,
    // margin:0,
    // marginRight:"1%",
    // width: wp("93%"),
    // // margin:"auto",
    // alignSelf: "center",
  },
  textStyle: {
    color: "#FFFFFF",
    fontFamily: "BaskervilleRegular",
    fontSize: 16,
    // textAlign:"right"
    textAlign: "center",
  },
  textStyle1: {
    color: "#FFFFFF",
    fontFamily: "BaskervilleRegular",
    fontSize: 20,
    marginBottom: 5,
    textAlign: "center",
    textTransform: "uppercase",
  },
  imageContainer: {
    // alignItems:"center",
    // margin: 10,
    // paddingRight:40,
    // margin:0,
    // margin:0,
    // width:"100%"
    // height:360,
    // width: wp("100%"),
    // backgroundColor:"red",
    // height:260
  },
  imageStyle: {
    height: 300,
    // width:"auto"
    marginTop: 20,
    width: "100%",
    // width: wp("93%"),
    // margin:0,
    // padding:30
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
  // QueueBtn: {
  //   height: 35,
  //   backgroundColor: "#927E5A",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   borderRadius: 5,
  //   // marginTop: 10,
  //   // paddingRight:5,
  //   // paddingLeft:5
  // },
  QueueBtn: {
    width: 150,
    height: 35,
    backgroundColor: "#927E5A",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
    // marginTop: 7,
  },
});
