import { API_HOST } from "../utils/constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function loginUser(user) {
  return await axios({
    url: `${API_HOST}public-api/auth/login`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: {
      email: user.email,
      passwd: user.passwd,
      device: "mobileApp",
    },
  });
}

export async function fetchUser() {
  const token = await AsyncStorage.getItem("token");
  const id = await AsyncStorage.getItem("id");
  return await axios({
    url: `${API_HOST}api/usertourist/search/${id}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-token": token,
    },
  });
}

export async function updateGralInfo(info) {
  const id = await AsyncStorage.getItem("id");
  const token = await AsyncStorage.getItem("token");
  return await axios({
    method: "POST",
    url: `${API_HOST}api/usertourist/update`,
    headers: {
      "Content-Type": "application/json",
      "x-token": token,
    },
    data: {
      id: id,
      type: "UserTourist",
      generalInfo: {
        name: info.name,
        lastName: info.lastName,
        age: info.age,
        nationality: info.nationality,
        country: info.country,
        city: info.city,
        gender: info.gender,
      },
    },
  });
}

export async function updatePassword(password) {
  const id = await AsyncStorage.getItem("id");
  const token = await AsyncStorage.getItem("token");
  return await axios({
    method: "POST",
    url: `${API_HOST}api/usertourist/updatepassword`,
    headers: {
      "Content-Type": "application/json",
      "x-token": token,
    },
    data: {
      id: id,
      type: "UserTourist",
      passwd: password,
    },
  });
}

export async function registerUser(user) {
  return await axios({
    url: `${API_HOST}public-api/usertourist/create`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: user,
  });
}

export async function getToken() {
  return await axios({
    method: "GET",
    url: "https://www.universal-tutorial.com/api/getaccesstoken",
    headers: {
      Accept: "application/json",
      "api-token":
        "UywfGTVaISQviEE6aZtvNOLKmGgBhkRGsBDvT4Sg3UwfI5hQMMpeYRoAmE237O2dtDw",
      "user-email": "aa.sorrentino94@gmail.com",
    },
  });
}

export async function getCountries(token) {
  return await axios({
    method: "GET",
    url: "https://www.universal-tutorial.com/api/countries/",
    headers: {
      Authorization: `bearer ${token}`,
      Accept: "application/json",
    },
  });
}

export async function getCities(token, country) {
  return await axios({
    method: "GET",
    url: `https://www.universal-tutorial.com/api/states/${country} `,
    headers: {
      Authorization: `bearer ${token}`,
      Accept: "application/json",
    },
  });
}

export async function forgotPassword(data) {
  return await axios({
    method: "POST",
    url: `${API_HOST}public-api/auth/recuperarpassword`,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      email: data,
      device: "mobileApp",
    },
  });
}

export async function getAllAttractions() {
  const token = await AsyncStorage.getItem("token");

  return await axios({
    method: "GET",
    url: `${API_HOST}api/attraction/fetchall`,
    headers: {
      "Content-Type": "application/json",
      "x-token": token,
    },
  });
}

export async function getAttractionsTypes() {
  const token = await AsyncStorage.getItem("token");

  return await axios({
    url: `${API_HOST}api/attraction/types`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-token": token,
    },
  });
}

export async function updateUser(data) {
  const token = await AsyncStorage.getItem("token");
  return await axios({
    url: `${API_HOST}api/usertourist/update`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": token,
    },
    data: data,
  });
}

export async function updateItinerary(data) {
  const token = await AsyncStorage.getItem("token");
  return await axios({
    url: `${API_HOST}api/usertourist/updateItinerary`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": token,
    },
    data: data,
  });
}

export async function fetchAttraction(id) {
  const token = await AsyncStorage.getItem("token");
  return await axios({
    url: `${API_HOST}api/attraction/searchbyid/${id}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-token": token,
    },
  });
}
