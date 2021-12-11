import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import moment from "moment";
import CalendarPicker from "react-native-calendar-picker";
import RNPickerSelect from "react-native-picker-select";
import { fetchUser ,  updateUser , getAllAttractions} from "../../api/PosadasApi";
import {useAuthUpdateContext , useAuthContext} from '../../utils/Context/AuthContext';

export default function CreateItineraty(props) {
  
  const { navigation, route } = props;
  const updateUserContext = useAuthUpdateContext();
  const userContext = useAuthContext();
  const [selectedStartDate, setSelectedStartDate] = useState(Date);
  const [selectedEndDate, setSelectedEndDate] = useState(Date);
  const minDate = new Date(); // Today
  const maxDate = new Date(2035, 12, 30);
  const [place, setPlace] = useState("Seleccionar tipo de estadía");
  const [hoteles, setHoteles] = useState([]);
  const [userInfo , setUserInfo] = useState({});
  const [isLoading , setIsLoading] = useState(true);
  const [completed , setCompleted] = useState(false);

  const [hotel, setHotel] = useState("Seleccione un hotel")

 

  function onDateChange(date, type) {
    if (type === "END_DATE") {
      setSelectedEndDate(date);
    } else {
      setSelectedEndDate(null);
      setSelectedStartDate(date);
    }
  }

  const pressEnd = () =>{
    if(selectedStartDate !=  null && selectedEndDate != null)
    {
      const momentStart = moment(selectedStartDate);
      const momentEnd = moment(selectedEndDate);
      let momentArray = moment(selectedStartDate);
      const startDate = momentStart.format('yyyy-MM-DD');
      const endDate = momentEnd.format('yyyy-MM-DD');
      let totalDays = momentEnd.diff(momentStart, 'days')+1;
      let arr = [];
      let i = 0;
      let x = 0;
      while(i < totalDays){
        arr.push({attendanceDate : momentArray.add(x , 'days').format('yyyy-MM-DD'), isDayOff : false, attractions: []});
        if(x == 0){
          x++;
        }
        i++;
      }
      const reqArray = arr;
      // Request para hacerle update al itinerario
      
      const request = {
        id: userInfo.id,
        type: userInfo.type,
        itinerary : {
          dayFrom: startDate,
          dayTo: endDate,
          hotel : (place === "Hotel") ? hotel : place, // Carga el place o el hotel que corresponde si se selecciona hotel
          totalDays : reqArray,
        },
      };
      
      // Fin de la request
      updateUser(JSON.stringify(request)).then(
        res => {
          if(res.status == 200)  {
            updateUserContext({...userContext , dayFrom: startDate});
            setTimeout(()=>{ navigation.navigate('myTrip') } , 200);
        }
        }
      ).catch(error => console.log(error));
    }
  }
  
  useEffect(() => {
    setCompleted(checkCompleted());
  }, [selectedStartDate , selectedEndDate, place, hotel])

  useEffect(()=> {
    getHoteles();
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  }, [])

  useEffect(() => {
    fetchUserInfo();
  }, [isLoading])

  function getHoteles() {
    let arrayHotels = [];
    getAllAttractions().then(res => {
      res.data.forEach(h =>{
        if(h.typeAttraction === "Hotel"){
          let hotel = {
            label: h.name,
            value: h.name
          }
          arrayHotels.push(hotel);
        }
      })
      setHoteles(arrayHotels);
    })
    .catch((err)=>{
      console.log(err.message)
    })
  }

  function fetchUserInfo(){
    fetchUser().then(response => setUserInfo(response.data));
  }

  function checkCompleted(){
    let flag = true;
    if(place === "Hotel"){
      flag = hotel !== "Seleccione un hotel"
    }
    return place !== "Seleccionar tipo de estadía" && place !== null && selectedStartDate !== null && selectedEndDate !== null && selectedStartDate !== selectedEndDate && flag;
  }

// CalendarPicker idioma cambiado por gon (que es medio puto)

  return (
    <ScrollView style={{backgroundColor: '#FFFFFF'}}>
      <View style={styles.container}>
        <Text style={styles.text}> Fechas de Estadía </Text>
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          minDate={minDate}
          maxDate={maxDate}
          todayBackgroundColor="#88ebba"
          selectedDayColor="#32BB77"
          selectedDayTextColor="#FFFFFF"
          weekdays={['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom']}
          months={['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']}
          previousTitle="Anterior"
          nextTitle="Próximo"
          onDateChange={onDateChange}
        />
        <Text style={styles.text}> Lugar de Estadía </Text>
        <View>
          <View style={styles.picker}>
            <RNPickerSelect
              placeholder={{label: "Seleccionar tipo de estadía", value: "Seleccionar tipo de estadía"}}
              items={[
                { label: "Hotel", value: "Hotel" },
                { label: "Casa", value: "Casa" },
                { label: "Otro", value: "Otro" },
              ]}
              onValueChange={(value) => setPlace(value)}
            >
              <Text>{place}</Text>
            </RNPickerSelect>
          </View>
          
          {place === "Hotel" ? (
            <View style={styles.picker}>
            <RNPickerSelect
              placeholder={{label: "Seleccione un hotel", value: "Seleccione un hotel"}}
              items={hoteles}
              onValueChange={(value) => setHotel(value)}
            >
              <Text>{hotel}</Text>
            </RNPickerSelect>
          </View>
          ) : <></> 
          }
          <View style={styles.bottom}>
              <TouchableOpacity
                onPress={() => pressEnd()}
                disabled={!completed}
                style={[styles.button , {backgroundColor : completed ? '#32BB77' : '#C8C7C6' , borderColor : completed ? '#32BB77' : '#FFFFFF'}]}
              >
                <Text style={[styles.buttonText , {color: completed? '#FFFFFF' : '#FFFFFF'} ]}>Confirmar</Text>
              </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: 0,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#32BB77",
    marginEnd: 10,
    alignItems: "center",
    textAlign: "center",
    margin: 20,
    borderRadius: 30,
  },
  picker: {
    margin: 10,
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: "#32BB77",
    borderRadius: 20,
    color: "black",
    paddingRight: 5,
  },
  bottom: {
    margin: 10,
  },
  button: {
    alignSelf: 'center',
    paddingVertical: 10,
    width: '75%',
    borderRadius: 32,
    borderColor: '#32BB77',
    borderWidth: 1,
  },
  buttonText : {
    textAlign: 'center',
    fontSize: 18
  },
});
