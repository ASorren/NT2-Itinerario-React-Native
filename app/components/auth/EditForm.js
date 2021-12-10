import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { InputI } from "../../components/inputI";
import { GreenButton } from "../../components/buttonI";
import { handleUser } from "../../utils/Context/Storage";
import { Input } from "react-native-elements";
import { ItemDropdown } from "../ItemDropdown";
import * as Yup from "yup";
import { Formik } from "formik";
import RNPickerSelect from "react-native-picker-select";
import { getCities, updateGralInfo } from "../../api/PosadasApi";

const mensajeYup = "El campo es obligatorio";

const generalInfoSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, "Su nombre debe tener un minimo de 5 caracteres")
    .required(mensajeYup),
  surname: Yup.string()
    .min(5, "Su apellido debe tener un minimo de 5 caracteres")
    .required(mensajeYup),
  age: Yup.number("Solo se pueden ingresar numeros")
    .min(18, "Debes tener al menos 18 años")
    .max(99, "Debes tener menos de 100 años")
    .required(mensajeYup),

  genre: Yup.string(mensajeYup)
    .required(mensajeYup)
    .typeError(mensajeYup)
    .notOneOf(["Genero"], mensajeYup),

  countryOrigin: Yup.string(mensajeYup)
    .required(mensajeYup)
    .notOneOf(["Nacionalidad"], mensajeYup)
    .typeError(mensajeYup),

  countryResidence: Yup.string(mensajeYup)
    .required(mensajeYup)
    .typeError(mensajeYup)
    .notOneOf(["Pais de Residencia"], mensajeYup),

  cityResidence: Yup.string("Campo obligatorio")
    .required(mensajeYup)
    .typeError(mensajeYup)
    .notOneOf(["Ciudad de Residencia"], mensajeYup),
});

export function EditForm({ route, navigation, countryNames, token }) {
    const {
      myAge,
      myCity,
      myCountry,
      myGender,
      mySurname,
      myName,
      myNationality,
      myEmail,
    } = route.params.userInfo;
    const [gender, setGender] = useState(myGender);
    const [nationality, setNationality] = useState(myNationality);
    const [country, setCountry] = useState(myCountry);
    const [city, setCity] = useState(myCity);
    const [citiesName, setCitiesName] = useState([]);
  
    useEffect(() => {
      getAllCities(token, country);
    }, [country]);
  
    function getAllCities(token, country) {
      if (token && country) {
        let cities = [];
        getCities(token, country)
          .then((response) => {
            response.data.forEach((c) => {
              let myCity = {
                label: c.state_name,
                value: c.state_name,
              };
              cities.push(myCity);
            });
            setCitiesName(cities);
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    }
  
    function update(data) {
      const generalInfo = {
        name: data.name,
        lastName: data.surname,
        age: data.age,
        gender: data.genre,
        nationality: data.countryOrigin,
        country: data.countryResidence,
        city: data.cityResidence,
      };
      if (generalInfo) {
        updateGralInfo(generalInfo)
          .then(() => {
            handleUser("updateGeneralInfo", () => {}, generalInfo);
            navigation.reset({ index: 0, routes: [{ name: "datos" }] });
          })
          .catch((error) => {
            console.log(error.msg);
          });
      }
    }
  
    const generoPlaceHolder = {
      label: "Genero",
      value: "Genero",
    };
  
    const nationalityPlaceHolder = {
      label: "Nacionalidad",
      value: "Nacionalidad",
    };
  
    const countryPlaceHolder = {
      label: "Pais de Residencia",
      value: "Pais de Residencia",
    };
  
    const cityPlaceHolder = {
      label: "Ciudad de Residencia",
      value: "Ciudad de Residencia",
    };
  
    const generos = [
      { label: "Masculino", value: "Masculino" },
      { label: "Femenino", value: "Femenino" },
    ];

    return (
        <h1>Empty Return</h1>
    );
}