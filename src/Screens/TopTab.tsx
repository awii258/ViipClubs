import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ClubEvents from './ClubEvents';
import Bars from './TabsScreen/Bars';
import Clubs from './Clubs';

const Tab = createMaterialTopTabNavigator();
 
function TopTab({route}) {

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
        component={Clubs}
        initialParams={{ productTitle: Product }}
        options={({ route }) => ({
          title: `Clubs IN ${Product}`,
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

export default TopTab;