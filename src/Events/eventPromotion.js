import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Image,
    ScrollView,
  } from "react-native";
  import React, { useEffect, useContext, useState } from "react";
  import { AntDesign } from "@expo/vector-icons";
  import moment from "moment";
  import CalendarStrip from "react-native-calendar-strip";
  import { Feather } from "@expo/vector-icons";
  import { Context as Actions } from "../Context/Actions";
  import { useNavigation } from "@react-navigation/native";
  import { useRoute } from "@react-navigation/native";
  import Spinner from 'react-native-loading-spinner-overlay';
  
  
  const eventPromotion = ({ HEIGHT }) => {
    const navigation = useNavigation();
    const route = useRoute();
    const { state, onEvents, onEventByTowns } = useContext(Actions);
  
    //  const {title } = route.params.productTitle;
    const { productTitle } = route.params;
    let town = productTitle;
  
    const [select, setSelect] = useState(true);
    const [showEvents, setShowEvents] = useState([]);
    const [firstRun, setFirstRun] = useState(true);
    const[isLoading, setIsLoading] = useState(true)
  
    useEffect(() => {
      //  onEvents();
  
      // console.log(
      //   "Product Title changed >>>>>>>>>>>>>>>>>>>>>Product Title changed>>>>>>>>>>>>>>>>>",
      //   productTitle
      // );
      // setShowEvents([]);
      onEventByTowns(productTitle);
      // console.log(
      //   "Towns==============================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>towns",
      //   town
      // );
      // console.log(
      //   "EVENT USEEFFECT ========>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
      // );
    }, [productTitle]);
  
    // console.log(
    //   " event events ..................................>>>>>",
    //   state.eventTown
    // );
  
    //   useEffect(()=>{
    // setShowEvents([]);
    //   })
  
    const selectCurrentDate = (date, userArray) => {
      // console.log(
      //   "User Array=================================================================",
      //   userArray
      // );
      // console.log(
      //   "Select Current Date============================================================start"
      // );
      // console.log("selected date -----------", date);
      let eventDateArray = [];
      userArray.forEach((obj) => {
        const apitempdate = moment(obj.date).format("DD-MM-YYYY");
        eventDateArray.push(apitempdate);
      });
      // console.log("Event date array==========", eventDateArray);
      const tempdate = moment(date).format("DD-MM-YYYY");
      // console.log("Temp date +++++++++++++++++++++", tempdate);
  
      if (eventDateArray.includes(tempdate)) {
        // console.log("Event exists");
        setShowEvents(
          userArray.filter(
            (item) => moment(item.date).format("DD-MM-YYYY") === tempdate
          )
        );
      } else {
        setShowEvents([]);
        // console.log("no event today");
      }
    };
  
    // if (firstRun && state?.eventTown && state?.eventTown.length > 0) {
    //   const userArray = state?.eventTown;
  
    //   console.log("Inside first run if============================================================");
    //   const todaydate = new Date();
    //   console.log("today=================", todaydate);
    //   selectCurrentDate(todaydate, userArray);
    //   console.log("show events==========", showEvents);
    //   setFirstRun(false);
    // }
  console.log("this is event array", state?.cityEvents)
    useEffect(() => {
      if (state && state?.cityEvents) {
        const userArray = state?.cityEvents;
        // console.log(
        //   "Inside first run if============================================================"
        // );
        const todaydate = new Date();
        // console.log("today=================", todaydate);
        selectCurrentDate(todaydate, userArray);
        // console.log("show events==========", showEvents);
        // setFirstRun(false);
        setIsLoading(false)
      }
    }, [state?.cityEvents]);
    
    if(isLoading){
      return (
        <Spinner
        //visibility of Overlay Loading Spinner
        visible={isLoading}
        color={"#927E5A"}
        //Text with the Spinner
        textContent={'Loading...'}
        //Text style of the Spinner Text
        textStyle={styles.spinnerTextStyle}
      />
      )
    }
  
   
         
  
    // console.log("=======================================", state.eventTown);
  
    const renderItem = ({ item }: any) => {
      const date = moment(item.date).format("DD MMMM YYYY");
  
      return (
        <>
        
  
          {/* <Text style={{color:"white"}}>YO</Text> */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Event Detail", {
                image: item.image,
                title: item.title,
                content: item.content,
                time: item.time,
                date: item.date,
                website: item.affiliate.website,
                affiliateId: item.affiliate.id  
              })
            }
            style={{ flex: 1 }}
          >
            <View style={styles.listContainer}>
              <View style={{ flex: 1 }}>
                <Image
                  style={{ width: 71, height: 68, margin: 10 }}
                  resizeMode="cover"
                  source={{ uri: item.image }}
                />
              </View>
              <View style={{ margin: 12, flex: 2 }}>
                <Text selectable={true} style={{
                  color:"white",
                  textTransform:"uppercase"
                }}>
                  {item.affiliate.name}
                </Text>
                <Text selectable={true} style={styles.textStyle}>
                  {item.title}
                </Text>
                <Text
                  selectable={true}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[styles.textStyle, { fontSize: 12 }]}
                >
                  {item.content}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Feather name="clock" size={11} color="white" />
                  <Text
                    selectable={true}
                    style={[
                      styles.textStyle,
                      { color: "#FFFFFF", fontSize: 12, left: 7 },
                    ]}
                  >
                    {item.time}
                  </Text>
                </View>
              </View>
  
              <AntDesign
                style={{ alignSelf: "center" }}
                name="right"
                size={22}
                color="#927E5A"
              />
            </View>
          </TouchableOpacity>
  
          <View style={styles.lineBreak}></View>
        </>
      );
    };
    // const renderSeparator = () => {
    //   return (
    //     <View
    //       style={{ height: 1, width: "100%", backgroundColor: "#927E5A" }}
    //     ></View>
    //   );
    // };
  
    // console.log("State data=================", state.eventTown);
  
    const selectDate = (date) => {
      // console.log("selected date -----------", date);
      let eventDateArray = [];
      state?.cityEvents.forEach((obj) => {
        const apitempdate = moment(obj.date).format("DD-MM-YYYY");
        eventDateArray.push(apitempdate);
      });
      const tempdate = moment(date).format("DD-MM-YYYY");
      if (eventDateArray.includes(tempdate)) {
        // console.log("Event exists");
        setShowEvents(
            state?.cityEvents.filter(
            (item) => moment(item.date).format("DD-MM-YYYY") === tempdate
          )
        );
      } else {
        setShowEvents([]);
        // console.log("no event today");
      }
    };
  
    // console.log("show events==========", showEvents);
  
    let datesWhitelist = [
      {
        //currentDate= new Date().toDateString();
        start: moment(),
        end: moment().add(30, "days"), // total 4 days enabled
      },
    ];
  
    // let datesBlacklist = [moment().add(3, 'days')]; // 1 day disabled
  
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 70, marginBottom: 15 }}>
          <CalendarStrip
            selectedDate={new Date()}
            // highlightColor={"red"}
            calendarAnimation={{ type: "sequence", duration: 30 }}
            daySelectionAnimation={{
              type: "background",
              duration: 200,
              highlightColor: "rgba(146, 126, 90, 0.3)",
            }}
            style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
            calendarHeaderStyle={{
              color: "#927E5A",
              fontFamily: "OpenSansRegular",
            }}
            calendarColor={"#000000"}
            dateNumberStyle={{ color: "white", fontFamily: "OpenSansRegular" }}
            dateNameStyle={{ color: "white", fontFamily: "OpenSansRegular" }}
            highlightDateNumberStyle={{
              color: "white",
              fontFamily: "OpenSansRegular",
            }}
            highlightDateNameStyle={{
              color: "white",
              fontFamily: "OpenSansRegular",
            }}
            disabledDateNameStyle={{
              color: "white",
              fontFamily: "OpenSansRegular",
            }}
            disabledDateNumberStyle={{
              color: "white",
              fontFamily: "OpenSansRegular",
            }}
            scrollable={true}
            iconContainer={{ flex: 0.1 }}
            onDateSelected={selectDate}
          />
        </View>
        {/* <Text style={{color:"white",backgroundColor:"red",fontSize:15}}>{town}</Text> */}
        <View style={{ flex: 1 }}>
          <ScrollView
            style={{ flex: 1 }}
            // contentContainerStyle={{ paddingBottom: 200 }}
            showsVerticalScrollIndicator={false}
          >
            <FlatList
              data={showEvents}
              keyExtractor={(item, index) => item.id.toString()}
              initialNumToRender={1}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
              // ItemSeparatorComponent={renderSeparator}
              style={{ height: HEIGHT }}
            />
          </ScrollView>
        </View>
      </View>
    );
  };
  
  export default eventPromotion;
  
  const styles = StyleSheet.create({
    textStyle: {
      color: "#927E5A",
      fontFamily: "OpenSansRegular",
      fontSize: 16,
    },
    spinnerTextStyle: {
      color: '#927E5A',
    },
    listContainer: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "center",
      justifyContent: "space-evenly",
      margin: 15,
    },
    lineBreak: {
      borderBottomColor: "#927E5A",
      borderBottomWidth: 1,
    },
  });
  