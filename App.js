import React from "react";
import Navigation from "./app/navigations/Navigation";
import { AuthProvider } from "./app/utils/Context/AuthContext";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <AuthProvider>
      <StatusBar />
      <Navigation />
    </AuthProvider>
  );
}
