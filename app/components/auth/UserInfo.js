import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { View, StyleSheet, Alert } from "react-native";
import {
  WhiteButton,
  GreenButton,
  SmallButton,
} from "../buttonI";
import { EditPassModal } from "./EditPassModal";
import { useAuthRemoveContext } from "../../utils/Context/AuthContext";
import { handleUser } from "../../utils/Context/Storage";
import { Text } from "react-native-elements";
import { fetchUser } from "../../api/itinerarioApi";
import LoadingScreen from "../loadingScreen";

export default function UserInfo({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState({});
  const [account, setAccount] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      getUsuario();
    }, 300);
  }, []);

  async function getUsuario() {
    fetchUser()
      .then((res) => {
        setUser(res.data.generalInfo);
        setAccount(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        Alert.alert("Aviso", "Error al conectar con la base de datos");
      });
  }

  const removeUser = useAuthRemoveContext();
  function logout() {
    handleUser("logout", removeUser);
  }

  function editInfo() {
    navigation.navigate("edit", {
      userInfo: {
        myAge: user.age,
        myCity: user.city,
        myCountry: user.country,
        myGender: user.gender,
        mySurname: user.lastName,
        myName: user.name,
        myNationality: user.nationality,
        myEmal: account.email,
      },
    });
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Información de Cuenta</Text>
      <View style={[styles.cardView, { height: 183 }]}>
        <View style={styles.cardContainer}>
          <View>
            <Text style={styles.title}>Nombre</Text>
            <Text styles={styles.subtitle}>
              {user.name} {user.lastName}{" "}
            </Text>
          </View>
          <View style={styles.lineView} />

          <View>
            <Text style={styles.title}>Email</Text>
            <Text styles={styles.subtitle}>{account.email}</Text>
          </View>
          <View style={styles.lineView} />
          <View>
            <Text style={{ ...styles.title, alignSelf: "flex-start" }}>
              Contraseña
            </Text>
            <SmallButton onPress={() => setVisible(true)} text={"Cambiar"} />
          </View>
          <View style={styles.lineView} />
        </View>
      </View>
      <Text style={styles.header}>Información Personal</Text>
      <View style={[styles.cardView, { height: 285 }]}>
        <View style={styles.cardContainer}>
          <View>
            <Text style={styles.title}>Edad</Text>
            <Text styles={styles.subtitle}>{user.age}</Text>
          </View>
          <View style={styles.lineView} />
          <View>
            <Text style={styles.title}>Género</Text>
            <Text styles={styles.subtitle}>{user.gender}</Text>
          </View>
          <View style={styles.lineView} />
          <View>
            <Text style={styles.title}>Nacionalidad</Text>
            <Text styles={styles.subtitle}>{user.nationality}</Text>
          </View>
          <View style={styles.lineView} />
          <View>
            <Text style={styles.title}>País</Text>
            <Text styles={styles.subtitle}>{user.country}</Text>
          </View>
          <View style={styles.lineView} />
          <View>
            <Text style={styles.title}>Ciudad</Text>
            <Text styles={styles.subtitle}>{user.city}</Text>
          </View>
          <View style={styles.lineView} />
        </View>
      </View>
      <EditPassModal open={visible} setVisible={() => setVisible()} />
      <GreenButton text={"Editar Información"} onPress={editInfo} />
      <WhiteButton onPress={logout} text="Logout" />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    color: "#000000",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
    letterSpacing: 1,
  },
  header: {
    flex: 1,
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    letterSpacing: 1,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: "center",
  },
  subtitle: {
    flex: 1,
    marginLeft: 5,
  },
  lineView: {
    flex: 1,
    height: 0.5,
    marginBottom: 10,
  },
  cardView: {
    flex: 1,
    width: "80%",
    borderRadius: 7,
    backgroundColor: "#f1f1f1",
    elevation: 3,
    alignSelf: "center",
    marginBottom: 10,
  },
  cardContainer: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
});