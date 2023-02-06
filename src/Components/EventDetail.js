import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React,{useContext, useEffect} from 'react'
import { Context as Actions } from "../Context/Actions";

import { FontAwesome, Feather } from '@expo/vector-icons';
import moment from 'moment';


const EventDetail = ({ route, navigation }) => {

  const { image, title, content, time, date, website, affiliateId,barname } = route.params;
  const {state, onCheckInAffiliate,verifyButton } = useContext(Actions)
  console.log("Showing website in evenDetails:", website)

  const Date = moment(date).format("DD MMMM YYYY");

  const onPressQueueJump = () => {
    onCheckInAffiliate(affiliateId)
    navigation.navigate("Qr",{clubname: "club"})
    verifyButton (false);

  }
// useEffect(()=>{

// },[])

  return (
    <View style={styles.container}>
      {/* <Text style={{color:"white"}}>YO</Text> */}
      {/* <ScrollView contentContainerStyle={{paddingBottom:200}}> */}
      <View >
        <Image
          style={{
            height: 305,
            width: 373,
            alignSelf: "center",
            marginTop: 30,
            
          }}
          resizeMode="cover"
          source={{ uri: image }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          margin: 25,
          justifyContent: "space-between",

        }}
      >
        <View style={{ flex: 1 }}>
          <Text selectable={true} style={styles.textStyle}>

            {title}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Feather name="clock" size={14} color="white" />
            <Text
              selectable={true}
              style={[styles.textStyle, { left: 7, color: "white" }]}
            >

              {time}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              resizeMode="contain"
              style={{ height: 14, width: 14, tintColor: "white" }}
              source={require("../../assets/Image/calender.png")}
            />
            <Text
              selectable={true}
              style={[styles.textStyle, { left: 7, color: "white" }]}
            >

              {Date}
            </Text>
          </View>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom:200 }}>
        <View >
          <Text
            selectable={true}
            style={[styles.textStyle, { marginLeft: 25 }]}
          >
            {content}
          </Text>
        </View>
      </ScrollView>
      {/* </ScrollView> */}

     {barname?<View
        style={{
          flexDirection: "row",
          position: "absolute",
          bottom: 30,
          alignSelf: "center",
        }}
      >
        <TouchableOpacity
          style={{
            width: 185,
            height: 50,
            backgroundColor: "#927E5A",

            justifyContent: "center",
            alignItems: "center",
            margin: 5,
            borderRadius: 5,
          }}
          onPress={() => navigation.navigate("Venue",{itemWebsite: website})}
        >
          <Text
            style={{
              fontSize: 20,
              color: "#FFFFFF",
              fontFamily: "OpenSans-Regular",
              textTransform: "uppercase",
            }}
          >
            Book Event
          </Text>
        </TouchableOpacity>

       

       
      </View>:<View
        style={{
          flexDirection: "row",
          position: "absolute",
          bottom: 30,
          alignSelf: "center",
        }}
      >
        <TouchableOpacity
          style={{
            width: 185,
            height: 50,
            backgroundColor: "#927E5A",

            justifyContent: "center",
            alignItems: "center",
            margin: 5,
            borderRadius: 5,
          }}
          onPress={() => navigation.navigate("Venue",{itemWebsite: website})}
        >
          <Text
            style={{
              fontSize: 20,
              color: "#FFFFFF",
              fontFamily: "OpenSans-Regular",
              textTransform: "uppercase",
            }}
          >
            Book Venue
          </Text>
        </TouchableOpacity>

        <View
          style={{
            height: "100%",
            width: 1,
            backgroundColor: "#000000",
            alignSelf: "center",
          }}
        ></View>

        <TouchableOpacity
          style={{
            width: 185,
            height: 50,
            backgroundColor: "#927E5A",
            justifyContent: "center",
            alignItems: "center",
            margin: 5,
            borderRadius: 5,
          }}
          onPress={onPressQueueJump}
        >
          <Text
            style={{
              fontSize: 20,

              // marginRight: 15,
              color: "#FFFFFF",
              fontFamily: "OpenSans-Regular",
              textTransform: "uppercase",
            }}
          >
            Queue Jump
          </Text>
        </TouchableOpacity>
      </View>} 
    </View>
  );
}

export default EventDetail

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000", flex: 1,
  },
  textStyle: {
    color: "#927E5A",
    fontFamily: "OpenSansRegular",
    fontSize: 16,

  },
})