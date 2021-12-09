import React from "react";
import { Text } from "react-native-elements";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function ButtonAdd({ onPress, styleButton, styleText }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, styleButton]}>
      <Text style={[styles.text, styleText]}>+</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#385F5E",
    width: 50,
    height: 50,
    justifyContent: "center",
    borderRadius: 100,
    borderColor: "#FFFFFF",
    borderWidth: 3,
  },
  text: {
    flex: 1,
    fontSize: 25,
    color: "#FFFFFF",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 4,
  },
});
