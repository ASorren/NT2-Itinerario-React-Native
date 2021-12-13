import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AtraccionEnItinerario from "../screens/Attractions/AtraccionEnItinerario";
import DetalleAtraccion from "../screens/Attractions/DetalleAtraccion";
import MyTrip from "../screens/Attractions/MyTrip";
import SearchAtraccion from "../screens/Attractions/SearchAtraccion";

const Stack = createStackNavigator();

export default function HasItineraryStack() {
        return(
            <Stack.Navigator 
            >  
               <Stack.Screen 
                    name="myTrip" 
                    component={MyTrip} 
                    options={{title: "Mi viaje", headerShown: false}}/>
              
                <Stack.Screen 
                    name="detalleAtraccion" 
                    component={DetalleAtraccion} 
                    options={{title: "Detalle Atraccion", headerShown: true}}/>
               
                <Stack.Screen 
                    name="searchAtraccion" 
                    component={SearchAtraccion} 
                    options={{title: "Buscar Atracciones", headerShown: false}}/>
                <Stack.Screen
                    name="detalleEnItinerario"
                    component={AtraccionEnItinerario}
                    options={{title: 'Detalle Atraccion' , headerShown: false}}
                />

            </Stack.Navigator>
        )
}
