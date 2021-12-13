import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser, registerUser, fetchUser } from "../../api/PosadasApi";
import { Alert } from "react-native";

// Recibe un usuario, una acción con el usuario y un hook al cual correr.
export async function handleUser(action, hook, user) {
  switch (action) {
    case "login":
      loginUserStorage(user, hook);
      break;
    case "logout":
      removeUser(hook);
      break;
    case "forceUpdate":
      forceUpdateCredentials(hook);
      break;
    case "updateLocal":
      updateLocalCredentials(hook);
      break;
    case "register":
      register(user);
      break;
    case "getUser":
      getUser();
      break;
    case "updateLocalUser":
      updateLocalUser(hook, user);
      break;
    case "setLocalUser": 
      setLocalUser(hook);
      break;
    case "getLocalUser":
      getLocalUser(hook);
      break;
    case "updateGeneralInfo":
      updateGeneralInfo(user);
  }
}


async function updateLocalUser(hook, user) {
  hook({ generalInfo: user }); //lol
}

async function getLocalUser(hook) {
  return hook();
}

async function setLocalUser(hook) {
  fetchUser()
    .then((res) => {
      const user = res.data;
      
    })
    .catch(
      (error) => {
        console.log(error);
        removeUser();
      } 
    );
}

async function addUser(data) {
  try {
    const user = data.user;
    await AsyncStorage.setItem("dayFrom", user.itinerary.dayFrom);
    await AsyncStorage.setItem("token", data.token);
    await AsyncStorage.setItem("id", user.id);
  } catch (e) {
    console.log(e);
  }
}

async function updateGeneralInfo(info) {
  try {
    await AsyncStorage.setItem("name", info.name);
    await AsyncStorage.setItem("lastName", info.lastName);
    await AsyncStorage.setItem("age", info.age);
    await AsyncStorage.setItem("country", info.country);
    await AsyncStorage.setItem("nationality", info.nationality);
    await AsyncStorage.setItem("city", info.city);
    await AsyncStorage.setItem("gender", info.gender);
  } catch (err) {
    console.log(err.msg);
  }
}

async function checkCredentials() {
  const token = await AsyncStorage.getItem("token");
  if (token != null) {
    try {
      fetchUser()
        .then((response) => {
          const data = response.data;
          addUser({ user: data, token: token });
          if (data == null) {
            removeUser();
            return false;
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (e) {
      console.log(e);
      await AsyncStorage.removeItem("token");
    }
  }
  return token != null;
}

async function removeUser(hook) {
  try {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("id");
    await AsyncStorage.removeItem("dayFrom");
    hook();
  } catch (e) {
    console.log(e);
  }
}

async function loginUserStorage(user, hook) {
  const logged = await checkCredentials();
  if (!logged) {
    try {
      loginUser(user)
        .then(function (response) {
          const data = response.data;
          addUser(data);
          hook({
            token: data.token,
            id: data.user.id,
            generalInfo: data.user.generalInfo,
            dayFrom: data.user.itinerary.dayFrom,
          });
        })
        .catch(function (error) {
          Alert.alert("Error", "Datos incorrectos");
        });
    } catch (e) {
      console.log(e.message);
    }
  } else {
    hook(user);
  }
}

function register(user) {
  try {
    registerUser(user)
      .then((response) => {
        if (JSON.stringify(response.status) == "200") {
          return Alert.alert("Aviso", "Registro exitoso.");
        }
      })
      .catch((e) => {
        Alert.alert(
          "Aviso",
          "Registro no completado, revise los datos ingresados e intente nuevamente."
        );
      });
  } catch (e) {
    console.log(e.message);
  }
}


async function forceUpdateCredentials(hook) {
  try {
    const token = await AsyncStorage.getItem("token");
    const id = await AsyncStorage.getItem("id");
    hook({ token: token, id: id });
  } catch (e) {
    console.log(e);
  }
}

async function updateLocalCredentials(hook) {
  try {
    const logged = checkCredentials();
    if (!logged) {
      removeUser();
    } else {
      let token = await AsyncStorage.getItem("token");
      let id = await AsyncStorage.getItem("id");
      let dayFrom = await AsyncStorage.getItem("dayFrom");
      setTimeout(() => {
        hook({ token: token, id: id, dayFrom: dayFrom });
      }, 250);
    }
  } catch (e) {
    console.log(e);
  }
}

async function getUser() {
  try {
    let data = await fetchUser().then((response) => {
      data = response.data;
      return data;
    });
  } catch (e) {
    Alert.alert("Aviso", "Ocurrió un error.");
    console.log(e);
  }
}