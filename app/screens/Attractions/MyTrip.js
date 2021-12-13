import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Modal } from "react-native";
import DayItem from "../../components/DayItem";
import { fetchUser, updateUser } from "../../api/PosadasApi";
import { TouchableOpacity } from "react-native";
import {
  useAuthUpdateContext,
  useAuthContext,
} from "../../utils/Context/AuthContext";
import LoadingScreen from "../../components/loadingScreen";

export default function MyTrip({ route, navigation }) {
  const [atraccion, setAtraccion] = useState([]);
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const updateUserContext = useAuthUpdateContext();
  const userContext = useAuthContext();

  function deleteItinerary() {
    setVisible(false);
    const request = {
      id: user.id,
      type: user.type,
      itinerary: {
        hotel: "",
        dayTo: "",
        dayFrom: "",
        totalDays: [],
      },
    };
    updateUser(JSON.stringify(request))
      .then((res) => {
        if (res.status == 200) {
          updateUserContext({ ...userContext, dayFrom: null });
          setTimeout(() => {
            navigation.reset({ index: 0, routes: [{ name: "Inicio" }] });
          }, 500);
        }
      })
      .catch((error) => {});
  }

  async function crearItinerario() {
    setAtraccion(user.itinerary.totalDays);
  }

  function getUsuario() {
    fetchUser()
      .then((res) => {
        setUser(res.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }

  const renderItem = ({ item, index }) => {
    item.number = index + 1;
    return <DayItem item={item} navigator={navigation} />;
  };

  const renderEndList = () => {
    return (
      <TouchableOpacity
        style={{
          ...styles.buttonDelete,
          backgroundColor: "#E33674",
          borderColor: "#FF0555",
        }}
        onPress={() => setVisible(true)}
      >
        <Text style={{ ...styles.buttonText, color: "#FFFFFF" }}>
          Terminar Itinerario
        </Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setTimeout(() => {
      getUsuario();
    }, 350);
  }, []);

  useEffect(() => {
    if (user != null) {
      crearItinerario();
    }
  }, [user]);

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={atraccion}
        keyExtractor={(item) => item.attendanceDate.toString()}
        renderItem={renderItem}
        ListFooterComponent={renderEndList}
      />
      <Modal
        animationType="slide"
        transparent
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {user.generalInfo.gender === "Masculino" ? (
              <Text style={styles.modalText}>
                ¿Está seguro que desea eliminar el Itinerario? Esta acción es
                irreversible.
              </Text>
            ) : (
              // Esto no sirve de nada pero para el que edite sepa que somos considerades
              <Text style={styles.modalText}>
                ¿Está segura que desea eliminar el Itinerario? Esta acción es
                irreversible.
              </Text>
            )}
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: "#E33674",
                  padding: 5,
                  minWidth: "55%",
                  borderColor: "#FF0555",
                },
              ]}
              onPress={() => {
                deleteItinerary();
              }}
            >
              <Text style={[styles.buttonText, { color: "#FFFFFF" }]}>
                Borrar Itinerario
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: "#FFFFFF", padding: 5 },
              ]}
              onPress={() => setVisible(!visible)}
            >
              <Text style={[styles.buttonText, { color: "#32BB77" }]}>
                Volver a Itinerario
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    alignSelf: "center",
    paddingVertical: 10,
    marginVertical: 10,
    width: "75%",
    borderRadius: 32,
    borderColor: "#32BB77",
    borderWidth: 1,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  buttonDelete: {
    alignSelf: "center",
    paddingVertical: 10,
    marginVertical: 10,
    width: "45%",
    borderRadius: 32,
    borderColor: "#32BB77",
    borderWidth: 1,
  },
});
