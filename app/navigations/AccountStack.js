import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Auth/Login";
import Register from "../screens/Auth/Register";
import GeneralInfo from "../screens/Auth/GeneralInfo";

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="login"
        component={Login}
        options={{ title: "Mi viaje", headerShown: false }}
      />
      <Stack.Screen
        name="register"
        component={Register}
        options={{ title: "Registro", headerShown: false }}
      />
      <Stack.Screen
        name="generalinfo"
        component={GeneralInfo}
        options={{ title: "General Info", headerShown: false }}
      />
    </Stack.Navigator>
  );
}