import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import General from "../screens/Attractions/General";
import CreateItineraty from "../screens/Attractions/CreateItineraty";
import DetalleAtraccion from "../screens/Attractions/DetalleAtraccion";
import MyTrip from "../screens/Attractions/MyTrip";
import SearchAtraccion from "../screens/Attractions/SearchAtraccion";

const Stack = createStackNavigator();

export default function ItineraryStack() {
        return(
            <Stack.Navigator>  
                <Stack.Screen 
                    name="Inicio" 
                    component={General} 
                    options={{title: "Inicio", headerShown: false}}
                    /> 
                <Stack.Screen 
                    name="createItineraty" 
                    component={CreateItineraty} 
                    options={{title: "Crear Itinerario", headerShown: false}}
                    />
                <Stack.Screen 
                    name="detalleAtraccion" 
                    component={DetalleAtraccion} 
                    options={{title: "Detalle Atraccion", headerShown: true}}/>
                <Stack.Screen 
                    name="myTrip" 
                    component={MyTrip} 
                    options={{title: "Mi viaje", headerShown: false}}/>
                <Stack.Screen 
                    name="searchAtraccion" 
                    component={SearchAtraccion} 
                    options={{title: "Buscar Atracciones", headerShown: false}}/> 
            </Stack.Navigator>
        )
    }