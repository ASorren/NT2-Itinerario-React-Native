import React from "react";
import { ListItem } from "react-native-elements";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Timeline from "react-native-timeline-flatlist";
import MiniAttracItem from "./MiniAttracItem";
import ButtonAdd from "./ButtonAdd";
import moment from "moment";
import "moment/locale/es";

export default function DayItem({ item, navigator }) {
  let data = [];
  item.attractions.forEach((attrac) => {
    data.push({
      name: attrac.name,
      description: attrac?.desc,
      dateAndHour: attrac?.dateAndHour,
      address: attrac?.address,
      typeAttraction: attrac?.typeAttraction,
      rating: attrac?.rating,
      id: attrac.id,
    });
  });
  const horas = item.attractions.map((att) => att.dateAndHour.split(":", 1)[0]);
  moment.locale("es");
  const dateLowerCase = moment(item.attendanceDate).format("MMM DD"); // Esto es para que el día se muestre "Mes : Nom   Día : 00"
  const date = dateLowerCase.charAt(0).toUpperCase() + dateLowerCase.slice(1); //Se capitaliza la primera letra para que no quede en minuscula
  const index = item.number - 1; // Esto va a la ruta de SearchAttraction para enviarselo a lo demás

  const renderDetail = (rowData, sectionID, rowID) => {
    return (
      <MiniAttracItem
        indexAttrac={sectionID}
        item={rowData}
        navigator={navigator}
        indexDia={index}
      />
    );
  };

  const renderCircle = (rowData, sectionID, rowID) => {
    return (
      <TouchableOpacity
        disabled={true}
        style={{
          backgroundColor: "green",
          width: 10,
          height: 10,
          borderRadius: 95,
        }}
      />
    );
  };

  return (
    <SafeAreaView style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
      <ListItem
        Component={TouchableOpacity}
        disabled={true}
        containerStyle={styles.container}
      >
        <ListItem.Title style={styles.primaryText}>
          {"Día " + item.number}
        </ListItem.Title>
        <ListItem.Subtitle style={styles.secondaryText}>
          {date}
        </ListItem.Subtitle>
        <ButtonAdd
          onPress={() => {
            navigator.navigate("searchAtraccion", {
              index: index,
              horas: horas,
            });
          }}
          styleButton={{
            marginBottom: 20,
            marginLeft:
              item.number < 10
                ? 15
                : item.number >= 10 && item.number < 100
                ? 4
                : -12,
          }}
        />
      </ListItem>
      {item.attractions.length === 0 ? (
        <Text style={{ color: "#385F5E", textAlign: "center" }}>
          Agregue atracciones con el botón +.
        </Text>
      ) : (
        <Timeline
          circleColor={"#32BB77"}
          lineColor={"#32BB77"}
          data={data}
          showTime={false}
          renderDetail={renderDetail}
          renderFullLine={true}
          circleSize={20}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#32BB77",
    borderRadius: 15,
    marginHorizontal: 5,
    marginVertical: 5,
    padding: 15,
    height: 35,
  },
  button: {
    color: "red",
    maxHeight: 20,
    marginBottom: 5,
  },
  primaryText: {
    color: "#FFFFFF",
    fontSize: 24,
    marginHorizontal: 25,
  },
  secondaryText: {
    color: "#FFFFFF",
    fontSize: 20,
    marginHorizontal: 25,
  },
});
