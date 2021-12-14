import React, { useState, useEffect } from "react";
import { StyleSheet, Image, ScrollView, View, Text } from "react-native";
import logo from "../../../assets/logoPosadas.png";
import { EditForm } from "../../components/Auth/EditForm";

import { getToken, getCountries } from "../../api/itinerarioApi";

export default function editInfo(props) {
  const { navigation, route } = props;
  const [countryNames, setCountryNames] = useState([]);
  const [token, setToken] = useState();

  useEffect(() => {
    getToken()
      .then((response) => {
        setToken(response.data.auth_token);
        getAllCountries(response.data.auth_token);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  function getAllCountries(token) {
    if (token) {
      let countries = [];
      getCountries(token)
        .then((response) => {
          response.data.forEach((c) => {
            let myCountry = {
              label: c.country_name,
              value: c.country_name,
            };
            countries.push(myCountry);
          });
          setCountryNames(countries);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
    <View style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <Text style={styles.textTitles}> Editar Información </Text>
      <EditForm
        navigation={navigation}
        route={route}
        countryNames={countryNames}
        token={token}
      />
    </View>
  </ScrollView>
);
  
}

const styles = StyleSheet.create({
    container: {
      width: "80%",
      alignSelf: "center",
    },
    logo: {
      width: "100%",
      height: 120,
      resizeMode: "contain",
      marginBottom: 20,
    },
    textTitles: {
      textAlign: "center",
      fontSize: 48,
      color: "#0B3534",
    },
  });