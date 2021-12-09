import { ListItem, Avatar } from "react-native-elements";
import { TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";

export default function AttracItem({ item, onPress }) {
  return (
    <ListItem
      Component={TouchableOpacity}
      containerStyle={[styles.atracItem]}
      onPress={onPress}
    >
      <Image style={styles.image} source={{ uri: item.image }} />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.status}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}

const styles = StyleSheet.create({
  atracItem: {
    flex: 1,
    padding: 5,
    marginVertical: 15,
    marginHorizontal: 15,
    borderRadius: 15,
    maxWidth: 700,
    minWidth: 300,
    maxHeight: 130,
    shadowColor: "#000000",
    shadowOpacity: 1,
    elevation: 8,
    shadowOffset: { width: 1, height: 1 },
  },

  image: {
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    height: 130,
    width: 125,
    marginLeft: -5,
  },
});
