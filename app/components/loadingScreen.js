import React from "react";
import { View, ActivityIndicator, Image, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
//import logoItinerario from "../../assets/logoItinerario.png";

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.blankContainer} />
      <Image style={styles.image} source={logoItinerario} />
      <View>
        <Text style={styles.title}>ItinerarioApp</Text>
        <Text style={styles.subtitle}>Itinerario</Text>
      </View>
      <View style={{ backgroundColor: "#FFFFFF" }}>
        <ActivityIndicator color="#32BB77" size={55} style={{ margin: 15 }} />
      </View>
      <View style={styles.blankContainerBottom}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  blankContainer: {
    height: "8%",
    backgroundColor: "#FFFFFF",
    width: "100%",
  },
  blankContainerBottom: {
    height: "45%",
    backgroundColor: "#FFFFFF",
    width: "100%",
  },
  container: {
    backgroundColor: "#FFFFFF",
    height: "100%",
    alignItems: "center",
  },
  title: {
    color: "gray",
    fontSize: 28,
    alignSelf: "center",
  },
  subtitle: {
    color: "gray",
    fontSize: 20,
    alignSelf: "center",
  },
  loadingText: {
    color: "#000015",
    fontStyle: "italic",
    fontSize: 15,
    alignSelf: "center",
  },
  image: {
    height: 250,
    width: 250,
    marginVertical: "5%",
  },
});
