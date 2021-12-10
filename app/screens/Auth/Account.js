import React, { useState } from "react";
import { View, KeyboardAvoidingView } from "react-native";
import Login from "./Login";
import Register from "./Register";
import { layoutStyle } from "../../styles";

export default function Account() {
  const [showLogin, setShowLogin] = useState(false);

  const changeForm = () => setShowLogin(!showLogin);
  return (
    <View style={layoutStyle.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {showLogin ? (
          <Login changeForm={changeForm} />
        ) : (
          <Register changeForm={changeForm} />
        )}
      </KeyboardAvoidingView>
    </View>
  );
}
