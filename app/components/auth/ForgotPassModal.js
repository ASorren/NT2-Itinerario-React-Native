import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { InputI } from "../inputI";
import { forgotPassword } from "../../api/itinerarioApi";

const ModalPopUp = ({ visible, children }) => {
  const [showModal, setShowModal] = useState(visible);

  useEffect(() => {
    toggleModal();
  }, [visible]);

  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackground}>
        <View style={[styles.modalContainer]}>{children}</View>
      </View>
    </Modal>
  );
};

export function ForgotPassModal(props) {
    const { open, setVisible = useState() } = props;
    const [disabled, setDisabled] = useState(true);
    const [forgotEmail, setForgotEmail] = useState();
  
    function checkCompleted() {
      setDisabled(!validateEmail());
    }
  
    useEffect(() => {
      checkCompleted();
    }, [forgotEmail]);
  
    function validateEmail() {
      var re = /\S+@\S+.\S+/;
      return re.test(forgotEmail);
    }
  
    function passWord() {
      forgotPassword(forgotEmail)
        .then((response) => {
          setVisible();
        })
        .catch((error) => {
          console.log(error.message);
        });
      Alert.alert(
        "Aviso",
        "Le llegará un email si se encuentra registrado, revisar si se encuentra en SPAM"
      );
    }
  
    return (
      <ModalPopUp visible={open}>
        <View style={{ alignItems: "center" }}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Image
                source={require("../../../assets/x.png")}
                style={{ height: 20, width: 20 }}
              />
            </TouchableOpacity>
          </View>
          <Text style={{ marginBottom: 20 }}>
            ¿Se te olvidó la contraseña? Te enviaremos una nueva a tu correo
          </Text>
          <View style={styles.button}>
            <InputI
              placeHolder={"Ingresa tu correo"}
              isSecure={false}
              id={"email"}
              defaultValue={forgotEmail}
              onChangeText={(email) => setForgotEmail(email)}
            />
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={[
                styles.buttonPosta,
                {
                  backgroundColor: disabled ? "#FFFFFF" : "#32BB77",
                  borderColor: "#6A6A6A",
                },
              ]}
              disabled={disabled}
              onPress={() => {
                passWord();
              }}
            >
              <Text
                style={[
                  styles.buttonText,
                  { color: disabled ? "#6A6A6A" : "#FFFFFF" },
                ]}
              >
                Enviar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalPopUp>
    );
  }
  
  const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      width: "80%",
      backgroundColor: "white",
      paddingHorizontal: 20,
      paddingVertical: 30,
      borderRadius: 20,
      elevation: 20,
    },
    header: {
      width: "100%",
      height: 30,
      alignItems: "flex-end",
    },
    button: {
      width: "100%",
    },
    buttonPosta: {
      alignSelf: "center",
      paddingVertical: 10,
      marginVertical: 10,
      width: "75%",
      borderRadius: 32,
      borderColor: "#32BB77",
      borderWidth: 1,
      backgroundColor: "#32BB77",
    },
    buttonText: {
      color: "#f1f1f1",
      textAlign: "center",
      fontSize: 18,
    },
  });