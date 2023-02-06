import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ClubEvents from "./ClubEvents";
import Bars from "./TabsScreen/Bars";
import Clubs from "./Clubs";
import ClubBars from "../Screens/ClubBars";
import EventsType from "./Events/EventsType";
import TownEurope from "../Screens/TownEurope";
import Towns from "../Screens/Towns";
const Tab = createMaterialTopTabNavigator();

function BarTopTab() {
  // const Product = route.params.productTitle;
  return (
    <Tab.Navigator
      screenOptions={{
        
        tabBarStyle: {
          backgroundColor: "#000000",
          borderTopWidth: 1,
          borderColor: "#927E5A",
          // borderRadius: 15,
        },
        tabBarLabelStyle: {
          fontFamily: "BaskervilleRegular",
          borderBottomColor: "#927E5A",
          fontSize:22
        },
        tabBarIndicatorStyle: {
          backgroundColor: "#FFFFFF",
        },
        tabBarActiveTintColor: "#927E5A",
        tabBarInactiveTintColor: "#927E5A",
        tabBarIndicatorContainerStyle: {
          borderBottomColor: "#927E5A",
        },
      }}
    >
      <Tab.Screen
        name="Towns"
        component={Towns}
        // initialParams={{ productTitle: Product }}
        options={({ route }) => ({
          // title: `Events IN ${Product}`,
          title:"UK"
        })}
      />
      <Tab.Screen
        name="Town Europe"
        component={TownEurope}
        // initialParams={{ productTitle: Product }}
        options={({ route }) => ({
          // title: `What's On ${Product}`,
          title:"Europe",
          // headerTitleStyle: {
          //   color: "#000",
          //   fontFamily: "BaskervilleRegular",
          //   fontSize:100,
          // },
        })}
      />
    </Tab.Navigator>
  );
}

export default BarTopTab;
