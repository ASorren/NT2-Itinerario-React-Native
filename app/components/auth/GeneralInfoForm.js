import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { InputI } from "../../components/inputI";
import { GreenButton } from "../../components/buttonI";
import { handleUser } from "../../utils/Context/Storage";
import { Input } from "react-native-elements";
import * as Yup from "yup";
import { Formik } from "formik";
import RNPickerSelect from "react-native-picker-select";
import { getCities } from "../../api/itinerarioApi";

const mensajeYup = "El campo es obligatorio";
const generalInfoSchema = Yup.object().shape({
  name: Yup.string().required(mensajeYup),
  surname: Yup.string().required(mensajeYup),
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

export function GeneralInfoForm({ route, navigation, countryNames, token }) {
  const { userName, email, passwd } = route.params.user;
  const [gender, setGender] = useState("Genero");
  const [nationality, setNationality] = useState("Nacionalidad");
  const [country, setCountry] = useState("Pais de Residencia");
  const [city, setCity] = useState("Ciudad de Residencia");
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

  function register(data) {
    const user = {
      userName: userName,
      email: email,
      passwd: passwd,
      name: data.name,
      lastName: data.surname,
      age: data.age,
      gender: data.genre,
      nationality: data.countryOrigin,
      country: data.countryResidence,
      city: data.cityResidence,
    };
    if (user) {
      handleUser("register", () => {}, user);
      navigation.navigate("login");
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
    <Formik
      initialValues={{
        name: "",
        surname: "",
        age: "",
        genre: "",
        countryOrigin: "",
        countryResidence: "",
        cityResidence: "",
      }}
      validationSchema={generalInfoSchema}
      onSubmit={(values) => {
        register(values);
      }}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ errors, handleChange, handleSubmit, setFieldValue, values }) => (
        <View style={styles.formContainer}>
          <InputI
            placeHolder={"Nombre"}
            isSecure={false}
            value={values.name}
            onChangeText={handleChange("name")}
            errorMessage={errors.name}
            id={"name"}
          />
          <InputI
            placeHolder={"Apellido"}
            isSecure={false}
            value={values.surname}
            onChangeText={handleChange("surname")}
            errorMessage={errors.surname}
            id={"surname"}
          />
          <Input
            style={{
              ...styles.input,
              textAlign: "center",
              marginLeft: 10,
            }}
            placeholder={"Edad"}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            keyboardType="numeric"
            value={values.age}
            onChangeText={handleChange("age")}
            errorMessage={errors.age}
            id={"age"}
          />
          <View style={styles.picker}>
            <RNPickerSelect
              placeholder={generoPlaceHolder}
              items={generos}
              onValueChange={(value) => {
                setGender(value);
                setFieldValue("genre", value);
              }}
              value={values.genre}
            >
              <Text style={styles.buttonText}>{gender}</Text>
            </RNPickerSelect>
          </View>
          <Text style={styles.errorText}>{errors.genre}</Text>
          <View style={styles.picker}>
            <RNPickerSelect
              placeholder={nationalityPlaceHolder}
              items={countryNames}
              onValueChange={(value) => {
                setNationality(value);
                setFieldValue("countryOrigin", value);
              }}
              value={values.countryOrigin}
            >
              <Text style={styles.buttonText}>{nationality}</Text>
            </RNPickerSelect>
          </View>
          <Text style={styles.errorText}>{errors.countryOrigin}</Text>
          <View style={styles.picker}>
            <RNPickerSelect
              placeholder={countryPlaceHolder}
              items={countryNames}
              onValueChange={(value) => {
                setCountry(value);
                setFieldValue("countryResidence", value);
              }}
              value={values.countryResidence}
            >
              <Text style={styles.buttonText}>{country}</Text>
            </RNPickerSelect>
          </View>
          <Text style={styles.errorText}>{errors.countryResidence}</Text>
          <View style={styles.picker}>
            <RNPickerSelect
              placeholder={cityPlaceHolder}
              items={citiesName}
              onValueChange={(value) => {
                setCity(value);
                setFieldValue("cityResidence", value);
              }}
              value={values.cityResidence}
            >
              <Text style={styles.buttonText}>{city}</Text>
            </RNPickerSelect>
          </View>
          <Text style={styles.errorText}>{errors.cityResidence}</Text>
          <GreenButton onPress={handleSubmit} text="Registrarse" />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  input: {
    alignSelf: "center",
    paddingVertical: 10,
    marginVertical: 1,
    width: "75%",
    borderRadius: 32,
    borderColor: "#32BB77",
    borderWidth: 1,
    fontSize: 18,
    backgroundColor: "#FFFFFF",
  },
  picker: {
    paddingVertical: 10,
    marginVertical: 1,
    width: "91%",
    height: 50,
    borderRadius: 32,
    borderColor: "#32BB77",
    borderWidth: 1,
    fontSize: 18,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    marginLeft: 20,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    color: "black",
  },
  errorText: {
    fontSize: 12,
    color: "red",
    marginBottom: 10,
    marginLeft: 15,
    marginTop: 1,
  },
});
