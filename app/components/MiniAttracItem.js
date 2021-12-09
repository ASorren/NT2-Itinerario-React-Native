import { ListItem, Text, View } from "react-native-elements";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import addButtonIcon from "../../assets/addButtonIcon.png";
import locationIcon from "../../assets/locationIcon.png";

export default function MiniAttracItem({
  item,
  navigator,
  indexAttrac,
  indexDia,
}) {
  const onPress = () => {
    navigator.navigate("detalleEnItinerario", {
      id: item.id,
      indexAttrac: indexAttrac,
      dateAndHour: item.dateAndHour,
      indexDia: indexDia,
    });
  };
  if (item.name !== "") {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          marginTop: 10,
          marginBottom: 20,
        }}
      >
        <ListItem containerStyle={[styles.atracItem]}>
          <ListItem.Content style={{ padding: 5, marginTop: 15 }}>
            <ListItem.Title
              style={[
                styles.title,
                { fontSize: item.name.length < 15 ? 20 : 16 },
              ]}
            >
              {item.name}
            </ListItem.Title>
            <TouchableOpacity disabled={true} style={styles.miniContainer}>
              <ListItem.Subtitle style={styles.primary}>
                {item.typeAttraction}
              </ListItem.Subtitle>
              <ListItem.Subtitle style={styles.secondary}>
                {item.dateAndHour}
              </ListItem.Subtitle>
            </TouchableOpacity>
            <TouchableOpacity disabled={true} style={styles.miniContainerImage}>
              <Image style={styles.imageDos} source={locationIcon} />
              <ListItem.Subtitle>{item.address}</ListItem.Subtitle>
            </TouchableOpacity>
          </ListItem.Content>
          <TouchableOpacity style={styles.imageTouchable} onPress={onPress}>
            <Image style={styles.image} source={addButtonIcon} />
          </TouchableOpacity>
        </ListItem>
      </SafeAreaView>
    );
  }
  return <Text></Text>;
}

const styles = StyleSheet.create({
  atracItem: {
    flex: 1,
    padding: 15,
    marginHorizontal: 15,
    borderRadius: 15,
    maxWidth: 400,
    minWidth: 200,
    maxHeight: 100,
    shadowColor: "#000000",
    shadowOpacity: 1,
    elevation: 8,
    shadowOffset: { width: 1, height: 1 },
    flexDirection: "row",
    marginVertical: -5,
  },
  image: {
    width: 20,
    height: 20,
    borderRadius: 100,
  },
  imageTouchable: {
    width: 20,
    height: 20,
    borderRadius: 100,
    marginTop: -65,
    marginRight: -7,
  },
  miniContainer: {
    flexDirection: "row",
    padding: 5,
  },
  miniContainerImage: {
    flexDirection: "row",
  },
  imageDos: {
    width: 15,
    height: 15,
  },
  title: {
    color: "#385F5E",
  },
  primary: {
    fontSize: 16,
    marginRight: 10,
  },
  secondary: {
    fontSize: 16,
    marginHorizontal: 10,
  },
});
