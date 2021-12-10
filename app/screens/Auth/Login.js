import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import logo from "../../../assets/logoPosadas.png";
import { LoginForm } from "../../components/Auth/LoginForm";

export default function Login(props) {
  const { navigation, route } = props;

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.container}>
        <Image style={styles.logo} source={logo} />
        <Text style={styles.textTitles}> PosadaApp </Text>
        <LoginForm navigation={navigation} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    alignSelf: "center",
    marginTop: 80
  },
  logo: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
    marginBottom: 20,
  },
  textTitles: {
    alignSelf: "center",
    fontSize: 48,
    color: "#0B3534",
  },
});