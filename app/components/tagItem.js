import { Text } from "react-native-elements";
import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

export default function TagItem({ item, onPress, backgroundColor, textColor }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.itemText, textColor]}>{item.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemText: {
    fontSize: 22,
    textAlign: "center",
  },
  item: {
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 5,
    borderColor: "#32BB77",
    borderWidth: 1,
    borderRadius: 25,
    height: "auto",
    width: "auto",
    maxWidth: 200,
    minWidth: 100,
    alignContent: "center",
  },
});
