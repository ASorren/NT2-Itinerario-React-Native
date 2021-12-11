import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import COLORS from "../colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Rating } from 'react-native-elements';
import {WhiteButton , PinkButton} from "../../components/buttonI";
import {fetchUser , updateUser , fetchAttraction} from '../../api/PosadasApi';

export default function AtraccionEnItinerario({ route, navigation }) {
  const { id , indexAttrac , dateAndHour, indexDia} = route.params;
  const [item , setItem] = useState();
  const [user , setUser] = useState();
  const [loading , setLoading] = useState(true);

useEffect(() => {
  getData();
} , [])

const getData = () => {
  fetchAttraction(id).then(res => { 
      setItem(res.data)
    }
    ).catch(error => 
      console.log(error)
    );
    setTimeout( () => { 
      fetchUser().then(res => {
        setUser(res.data)
        setLoading(false);
      }).catch(error=> console.log(error));
    } , 150)

}

const removeAttraction = () => {
    let workUser = user;
    let arr = user.itinerary.totalDays[indexDia].attractions; // Array de atracciones del día
    arr.splice(indexAttrac , 1);  // Remuevo la atracción del día
    workUser.itinerary.totalDays[indexDia].attractions = arr; // Piso el día en el usuario con el actualizado
    //console.log('workuser:' , JSON.stringify(workUser.itinerary.totalDays));
    const request = {
      id: user.id,
      type: user.type,
      itinerary: {
        hotel: user.itinerary.hotel,
        dayFrom: user.itinerary.dayFrom,
        dayTo: user.itinerary.dayTo,
        totalDays: workUser.itinerary.totalDays,
      }
    }
    callApiUpdate(request);
}

const callApiUpdate = (request) =>  {
  updateUser(JSON.stringify(request)).then(
     res => {
       if(res.status == 200){
         setTimeout(() => {
           navigation.reset({index : 0, routes: [{name: 'myTrip'}]})
         } , 150)
       }
     }
   ).catch(error => {
     Alert.alert("Aviso",'Error del servidor.');
   })
}

  if(loading){
    return(<View style={{backgroundColor: '#FFFFFF' , width: '100%' , height: '100%'}}/>)
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: COLORS.white,
        paddingBottom: 20,
      }}
    >
      <ImageBackground style={style.headerImage} source={{ uri: item.image }} />
      <View>
   

        <View style={{ marginTop: 20, paddingHorizontal: 20}}>
          <Text style={{ fontSize: 30, fontWeight: "bold", textAlign:'center' }}>{item.name}</Text>
          <View>
            <Rating    
                  style={{ paddingVertical: 10 }}
                  readonly 
                  startingValue={item.rating}
                  imageSize={22}
                />
            </View>
          <View style ={style.directionContainer}>
                    <Icon
                      name='room'
                      color='#32BB77' 
                      size={28}
                     />

                 <Text style={{ fontSize: 17, textAlign:'center', color: COLORS.grey, fontWeight: "bold"}}>
                    {item.address}
                  </Text>

            </View>
           

          <View style={{marginTop: 20, marginBottom: 10, marginLeft: 10, marginRight: 10}}>
              <Text style={{ fontSize: 20, textAlign:'justify' }}>
                {item.description}
              </Text>
          </View>
        </View>
        <View style={style.marginInfo}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Categoria:
          </Text>
          <View style={[style.tagInfo, {marginLeft: 50}]}>
            <Text style={{fontSize: 20, fontWeight: "bold", color: COLORS.grey}}>
              {item.typeAttraction}
            </Text>
          </View>
        </View>

        <View style={style.marginInfo}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Horario: 
          </Text>
          <View style={[style.tagInfo,{marginLeft: 70}]}>
            <Text style={{fontSize: 20, fontWeight: "bold", color: COLORS.grey, }}>
              {dateAndHour}
            </Text>
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <PinkButton text={"Remover Atracción"} onPress={() => removeAttraction()}/>
          <WhiteButton text={"Regresar a Itinerario"} onPress={() => {navigation.navigate('myTrip')}} />
        </View>

      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  btn: {
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  tagInfo: {
    height: 40,
    alignItems: "center",
    marginLeft: 40,
    paddingLeft: 20,
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: "row",
  },
  iconContainer: {
    position: "absolute",
    height: 60,
    width: 60,
    backgroundColor: COLORS.primary,
    top: -30,
    right: 20,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  headerImage: {
    height: 400,
    borderBottomRightRadius: 160,
    borderBottomLeftRadius: 160,
    overflow: "hidden",
  },
  header: {
    marginTop: 60,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    justifyContent: "space-between",
  },
  marginInfo: {
    marginTop: 20,
    flexDirection: "row", 
    justifyContent: "space-between",  
    paddingLeft: 20, 
    alignItems: "center"
  },
  direccion:{
    marginTop:10,
  },
  directionContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center'
     
  },
  removeButton: {
    
  },
});
