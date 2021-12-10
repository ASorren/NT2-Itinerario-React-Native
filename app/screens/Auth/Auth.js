import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { layoutStyle } from "../../styles";
import logo from "../../../assets/logoPosadas.png";
import RegisterForm from "../../components/Auth/RegisterForm";

export default function Auth() {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <View style={layoutStyle.container}>
      <Image style={styles.logo} source={logo} />
      {showLogin ? <Text>FormLogin</Text> : <RegisterForm />}
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
});
