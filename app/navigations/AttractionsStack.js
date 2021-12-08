import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DetalleAtraccion from "../screens/Attractions/DetalleAtraccion";
import SearchAtraccion from "../screens/Attractions/SearchAtraccion";

const Stack = createStackNavigator();
export default function AttractionsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="attractions"
        component={SearchAtraccion}
        options={{ title: "Atracciones", headerShown: false }}
      />
      <Stack.Screen
        name="prueba"
        component={DetalleAtraccion}
        options={{ title: "Detalle Atracción", headerShown: false }}
      />
    </Stack.Navigator>
  );
}
