import React, { useState, useEffect } from "react";
import { StyleSheet, Image, ScrollView, View, Text } from "react-native";
import logo from "../../../assets/logoPosadas.png";
import { EditForm } from "../../components/Auth/EditForm";

import { getToken, getCountries } from "../../api/PosadasApi";

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
      <h1>Empty html</h1>
  )
}