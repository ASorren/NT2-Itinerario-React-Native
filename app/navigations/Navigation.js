import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import AccountStack from "./AccountStack";
import LoggedAccountStack from "./LoggedAccountStack";
import ItineraryStack from "./ItineraryStack";
import { useAuthContext } from "../utils/Context/AuthContext";
import HasItineraryStack from "./HasItineraryStack";

const Tab = createBottomTabNavigator();
export default function Navigation() {
  const user = useAuthContext();

  if (user.token != undefined && user.token !== "") {
    if (user.dayFrom == undefined || user.dayFrom == "") {
      return (
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="itinerary"
            screenOptions={({ route }) => ({
              tabBarInactiveTintColor: "#385F5E",
              tabBarActiveTintColor: "#32BB77",
              headerShown: false,
              tabBarIcon: ({ color }) => screenOptions(route, color),
              tabBarHideOnKeyboard: true,
            })}
          >
            <Tab.Screen
              name="itinerary"
              component={ItineraryStack}
              options={{ title: "Itinerario" }}
            />
            <Tab.Screen
              name="account"
              component={LoggedAccountStack}
              options={{ title: "Mi Cuenta" }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      );
    }
    return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="itinerary"
          screenOptions={({ route }) => ({
            tabBarInactiveTintColor: "#385F5E",
            tabBarActiveTintColor: "#32BB77",
            headerShown: false,
            tabBarIcon: ({ color }) => screenOptions(route, color),
            tabBarHideOnKeyboard: true,
          })}
        >
          <Tab.Screen
            name="itinerary"
            component={HasItineraryStack}
            options={{ title: "Itinerario" }}
          />
          <Tab.Screen
            name="account"
            component={LoggedAccountStack}
            options={{ title: "Mi Cuenta" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <AccountStack />
    </NavigationContainer>
  );
}

function screenOptions(route, color) {
  let iconName;
  switch (route.name) {
    case "explore":
      iconName = "map-search";
      break;
    case "itinerary":
      iconName = "calendar-clock";
      break;
    case "account":
      iconName = "account";
      break;
  }
  return (
    <Icon type="material-community" name={iconName} size={35} color={color} />
  );
}
