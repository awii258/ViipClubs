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
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { EvilIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Context as Actions } from "../../Context/Actions";
import {useNavigation} from '@react-navigation/native'
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
  const navigation = useNavigation()
  const [search, setSearch] = useState("");

  useEffect(() => {
    onCompetitions();
    // console.log("hi");
  }, []);

  const { state, onCompetitions } = useContext(Actions);
  // console.log(
  //   "competition        -----  ................>>>>>",
  //   state.competition
  // );

  const renderItem = ({ item }: any) => {
    // console.log("subhan hi", item.name);

    return (

      
        <TouchableOpacity style={styles.imageContainer} onPress={() => navigation.navigate("Competition Detail", {
        image: item.image,
        title: item.title,
        content: item.content,
        link:item.link
      })}>
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
          <View style={{ padding: 10, alignSelf: "center" }}>
            <Text
              style={[
                styles.textStyle,
                { marginTop: hp("1%"), color: "#927E5A" },
              ]}
            >
              {item.title}
            </Text>
            <Text style={[styles.textStyle, { marginTop: hp("10%") }]}>
              {item.content}
            </Text>
          </View>

        </ImageOverlay>

      </TouchableOpacity>
     

      
    );
  };

  return (
    <View style={styles.container}>

      
      <View style={{paddingTop:30, paddingBottom:30}}>
      <View style={styles.inputView}>
          <EvilIcons
            name="search"
            size={24}
            color="#ffffff"
            style={{ paddingLeft: 15 }}
          />
          <TextInput
            style={styles.inputDesign}
            placeholder="SEARCH COMPETITIONS"
            placeholderTextColor="#ffffff"
            autoCapitalize={"words"}
            selectionColor="#927E5A"
            onChangeText={(text) => setSearch(text)}
            value={search}
          ></TextInput>
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
          data={state.competition}
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
    padding: 30,
    // padding:0,
    // paddingTop:30,
    // paddingBottom:25,
    // margin:0,
    // marginRight:"1%",
    // width: wp("93%"),
    // // margin:"auto",
    alignSelf: "center",
  },
  textStyle: {
    color: "#FFFFFF",
    fontFamily: "BaskervilleRegular",
    fontSize: 16,
  },
  imageContainer: {
    // alignItems:"center",
    // margin: 10,
    
    // paddingRight:40,
    // margin:0,
    // margin:0,
    
    width:"100%"
    // height:360,
    // width: wp("100%"),
    // backgroundColor:"red",
    // height:260

  },
  imageStyle: {
    height: 290,
    // width:"auto"
    
    width:"100%"
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
    color: "#424242",
    width: "100%",
    height: 50,
    paddingLeft: 10,
  },
});
