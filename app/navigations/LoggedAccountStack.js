import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyData from "../screens/Auth/MyData";
import Edit from "../screens/Auth/Edit";

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="datos"
        component={MyData}
        options={{ title: "Usuario", headerShown: false }}
      />
      <Stack.Screen
        name="edit"
        component={Edit}
        options={{ title: " Editar Informacion ", headerShown: false }}
      />
    </Stack.Navigator>
  );
}