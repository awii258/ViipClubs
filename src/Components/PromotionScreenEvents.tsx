import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useContext, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";
import CalendarStrip from "react-native-calendar-strip";
import { Feather } from "@expo/vector-icons";
import { Context as Actions } from "../Context/Actions";
import { useNavigation } from "@react-navigation/native";

const PromotionScreen = ({ HEIGHT }) => {
  const navigation = useNavigation();
  const { state, onEvents } = useContext(Actions);

  const [select, setSelect] = useState(true);
  const [showEvents, setShowEvents] = useState([]);
  const [firstRun, setFirstRun] = useState(true);

  const detailComponent = () => {
    setSelect(!select);
  };

  useEffect(() => {
    onEvents();
    // console.log(
    //   "EVENT USEEFFECT =========================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
    // );
  }, []);

  // console.log(
  //   " event events ..................................>>>>>",
  //   state.events
  // );

  const selectCurrentDate = (date, userArray) => {
    // console.log(
    //   "User Array==================================================================================================",
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

  if (firstRun && state?.events && state?.events.length > 0) {
    const userArray = state?.events;

    // console.log(
    //   "Inside first run if=================================================================================="
    // );
    const todaydate = new Date();
    // console.log("today=================", todaydate);
    selectCurrentDate(todaydate, userArray);
    // console.log("show events==========", showEvents);
    setFirstRun(false);
  }
  // console.log("=======================================", state.events);

  const markedDatesFunc = (date) => {
    // Dot
    if (date === selectDate) {
      // Thursdays
      return {
        dots: [
          {
            color: "#FFFFFF",
            selectedColor: "#FFFFFF",
            backgroundColor: "#B49C72",
          },
        ],
      };
    }
    return { date };
  };

  const renderItem = ({ item }: any) => {
    const date = moment(item.date).format("DD MMMM YYYY");

    return (
      <>
        {/* <Text style={{color:"white"}}>YO</Text> */}
        <View style={styles.listContainer}>
          <View style={{ flex: 1 }}>
            <Image
              style={{ width: 71, height: 68, margin: 10 }}
              resizeMode="cover"
              source={{ uri: item.image }}
            />
          </View>
          <View style={{ margin: 12, flex: 2 }}>
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
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Event Detail", {
                image: item.image,
                title: item.title,
                content: item.content,
                time: item.time,
                date: item.date,
                website: item.affiliate.website,
                affiliateId: item.affiliate.id,
              })
            }
            style={{ flex: 1 }}
          >
            <AntDesign
              style={{ alignSelf: "center" }}
              name="right"
              size={22}
              color="#927E5A"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.lineBreak}></View>
      </>
    );
  };

  // console.log("State data=================", state.events);

  const selectDate = (date) => {
    // console.log("selected date -----------", date);
    let eventDateArray = [];
    state.events.forEach((obj) => {
      const apitempdate = moment(obj.date).format("DD-MM-YYYY");
      eventDateArray.push(apitempdate);
    });
    const tempdate = moment(date).format("DD-MM-YYYY");
    if (eventDateArray.includes(tempdate)) {
      // console.log("Event exists");
      setShowEvents(
        state.events.filter(
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
      end: moment().add(7, "days"), // total 4 days enabled
    },
  ];

  // let datesBlacklist = [moment().add(3, 'days')]; // 1 day disabled

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 70 }}>
        <CalendarStrip
          scrollable={true}
          calendarAnimation={{ type: "sequence", duration: 30 }}
          daySelectionAnimation={{
            type: "background",
            duration: 200,
            highlightColor: "rgba(146, 126, 90, 0.3)",
          }}
          // daySelectionAnimation={{type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'white'}}

          style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
          calendarHeaderStyle={{
            color: "#927E5A",
            fontFamily: "OpenSansRegular",
          }}
          calendarColor={"#000000"}
          dateNumberStyle={{ color: "white", fontFamily: "OpenSansRegular" }}
          dateNameStyle={{ color: "white", fontFamily: "OpenSansRegular" }}
          highlightDateNumberStyle={{
            color: "#927E5A",
            fontFamily: "OpenSansRegular",
          }}
          highlightDateNameStyle={{
            color: "#927E5A",
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
          datesWhitelist={datesWhitelist}
          // datesBlacklist={datesBlacklist}
          //  onDateSelected={selectDate}
          iconContainer={{ flex: 0.1 }}
          onDateSelected={selectDate}
        />
      </View>
      <View style={{}}>
        <FlatList
          data={showEvents}
          keyExtractor={(item, index) => item.id.toString()}
          initialNumToRender={1}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          style={{ height: HEIGHT }}
        />
      </View>
    </View>
  );
};

export default PromotionScreen;

const styles = StyleSheet.create({
  textStyle: {
    color: "#927E5A",
    fontFamily: "OpenSansRegular",
    fontSize: 16,
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
    borderBottomWidth: 0.5,
  },
});
