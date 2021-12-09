import React from "react";
import { StyleSheet, View, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";

export function ItemDropdown(props) {
  const { data, title, hook } = props;
  return (
    <View style={styles.picker}>
      <RNPickerSelect items={data} onValueChange={(value) => hook(value)}>
        <Text>{title}</Text>
      </RNPickerSelect>
    </View>
  );
}

const styles = StyleSheet.create({
  picker: {
    alignSelf: "center",
    paddingVertical: 10,
    marginVertical: 1,
    width: "100%",
    borderRadius: 32,
    borderColor: "#32BB77",
    borderWidth: 1,
    fontSize: 18,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    height: 25,
  },
});