import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ClubEvents from "./ClubEvents";
import Bars from "./TabsScreen/Bars";
import Clubs from "./Clubs";
import ClubBars from "../Screens/ClubBars";

const Tab = createMaterialTopTabNavigator();

function BarTopTab({ route }) {
  const Product = route.params.productTitle;
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
        name="Dum"
        component={ClubBars}
        initialParams={{ productTitle: Product }}
        options={({ route }) => ({
          title: `Events IN ${Product}`,
        })}
      />
      <Tab.Screen
        name="Bar Events"
        component={ClubEvents}
        initialParams={{ productTitle: Product }}
        options={({ route }) => ({
          title: `What's On ${Product}`,
        })}
      />
    </Tab.Navigator>
  );
}

export default BarTopTab;
