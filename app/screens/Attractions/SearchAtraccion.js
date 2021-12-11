import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  Alert,
} from "react-native";
import { SearchBar } from "react-native-elements";
import AttracItem from "../../components/attracItem";
import TagItem from "../../components/tagItem";
import {
  getAttractionsTypes,
  getAllAttractions,
  fetchUser,
} from "../../api/itinerarioApi";

export default function SearchAtraccion(props) {
  const { navigation, route } = props;
  const index = route.params?.index;
  const horas = route.params?.horas;
  const [atraccion, setAtraccion] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [tags, setTags] = useState();
  const [tieneItinerario, setTieneItinerario] = useState(false);
  const [savedAtraccions, setSavedAtraccions] = useState([]);
  const [user, setUser] = useState();

  function verificarItinerario() {
    setTieneItinerario(user.itinerary.dayFrom !== "");
  }

  function getUsuario() {
    fetchUser()
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getUsuario();
  }, []);

  useEffect(() => {
    if (user != null) {
      verificarItinerario();
    }
  }, [user]);

  async function searchByTypeText() {
    //CASO: buscador vacio y fitro desactivado
    if (search === "" && selectedId === "") {
      setAtraccion(savedAtraccions);
    }
    //CASO: buscador vacio y filtro activado
    if (search === "" && selectedId !== "") {
      setAtraccion(filterRecreationByType(savedAtraccions, selectedId));
    }
    //CASO: buscador con info y filtro desactivado
    if (search !== "" && selectedId === "") {
      let data = filterData(savedAtraccions);
      setAtraccion(data);
    }
    //CASO: buscador con info y filtro activado
    if (search !== "" && selectedId !== "") {
      let data = filterData(atraccion);
      setAtraccion(filterRecreationByType(data, selectedId));
    }
  }

  function filterRecreationByType(array, type) {
    return array.filter((attr) => attr.typeAttraction === type);
  }

  async function setAllTypes() {
    let tagFinal = [];
    getAttractionsTypes()
      .then((attractions) => {
        attractions.data.forEach((tagName) => {
          let tag = {
            title: tagName,
            id: tagName,
          };
          tagFinal.push(tag);
        });
        setTags(tagFinal);
      })
      .catch(() => Alert.alert("Aviso", "Error de servidor"));
  }

  async function searchItems(value) {
    setSearch(value);
    if (search !== "") {
      let filteredData = filterData(atraccion);
      setAtraccion(filteredData);
    }
  }

  function filterData(array) {
    return array.filter((i) => {
      return Object.values(i)
        .join("")
        .toLowerCase()
        .includes(search.toLowerCase());
    });
  }

  async function getAttractions() {
    getAllAttractions()
      .then((response) => {
        setSavedAtraccions(response.data);
        setAtraccion(response.data);
      })
      .catch(() => Alert.alert("Aviso", "Error al conectarse con el servidor"));
  }

  useEffect(() => {
    setAllTypes();
    getAttractions();
  }, []);

  useEffect(() => {
    searchByTypeText();
  }, [search, selectedId]);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF", marginTop: 20 }}>
      <View style={{ padding: 20 }}>
        <SearchBar
          placeholder="Buscar Atracciones..."
          onChangeText={(e) => searchItems(e)}
          value={search}
          placeholderTextColor={"#0B3534"}
          inputContainerStyle={styles.searchBarInput}
          containerStyle={styles.searchBarContainer}
          inputStyle={styles.searchBarInput}
          searchIcon={{ color: "#32BB77" }}
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <SafeAreaView style={styles.container}>
          <FlatList
            horizontal={true}
            data={tags}
            renderItem={renderTagItem}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            extraData={selectedId}
          />
        </SafeAreaView>
      </View>
      {atraccion.length > 0 ? (
        <View
          style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
        >
          <SafeAreaView style={styles.container}>
            <FlatList
              keyExtractor={(item) => item.id.toString()}
              data={atraccion}
              renderItem={renderAtracc}
            />
          </SafeAreaView>
        </View>
      ) : (
        <View>
          <Text style={styles.secondaryText}>No se encontraron resultados</Text>
        </View>
      )}
    </View>
  );

  function renderAtracc({ item }) {
    return (
      <AttracItem
        item={item}
        onPress={() => {
          if (!tieneItinerario) {
            Alert.alert(
              "Aviso",
              "Para poder ver el detalle, cree el itinerario"
            );
          } else {
            navigation.navigate("detalleAtraccion", {
              item: item,
              index: index,
              horas: horas,
            });
          }
        }}
      />
    );
  }

  function renderTagItem({ item }) {
    const backgroundColor = item.id === selectedId ? "#32BB77" : "#FFFFFF";
    const color = item.id === selectedId ? "#FFFFFF" : "#32BB77";

    return (
      <TagItem
        item={item}
        onPress={() => {
          if (selectedId === "") {
            setSelectedId(item.id);
          } else {
            setSelectedId("");
          }
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    alignSelf: "center",
    paddingVertical: 15,
    marginVertical: 10,
    width: "60%",
    borderRadius: 32,
    borderColor: "#32BB77",
    borderWidth: 1,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
  },
  searchBarContainer: {
    borderColor: "#32BB77",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    height: 45,
    borderWidth: 2,
    borderTopColor: "#32BB77",
    borderBottomColor: "#32BB77",
  },
  searchBarInput: {
    height: 30,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    color: "#0B3534",
  },
  container: {
    flex: 1,
  },
  secondaryText: {
    fontSize: 14,
    color: "grey",
  },
});
