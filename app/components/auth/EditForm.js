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