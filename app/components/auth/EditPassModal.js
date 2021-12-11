import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import { InputI } from "../../components/inputI";
import { GreenButton } from "../../components/buttonI";
import { forgotPassword, updatePassword } from "../../api/PosadasApi";
import * as Yup from "yup";
import { Formik } from "formik";

const passSchema = Yup.object().shape({
  passwd: Yup.string("Ingrese su nueva contraseña")
    .min(6, "La contraseña debe contener minimo 6 caracteres")
    .required("La contraseña es requerida"),
  passwordConfirm: Yup.string("Confirme su contraseña")
    .test(null, "La contraseña debe coincidir", function (value) {
      return this.parent.passwd === value;
    })
    .required("Confirme su contraseña"),
});

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

export function EditPassModal(props) {
  const { open, setVisible = useState() } = props;
  const [disabled, setDisabled] = useState(false);

  function newPass(password) {
    updatePassword(password)
      .then((response) => {
        setVisible();
      })
      .catch((error) => {
        console.log(error.message);
      });
    Alert.alert("Aviso", "La contraseña se actualizo correctamente");
  }

  return (
    <Formik
      initialValues={{
        passwd: "",
        passwordConfirm: "",
      }}
      validationSchema={passSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values) => {
        newPass(values.passwd);
      }}
    >
      {({ errors, handleChange, handleSubmit, values }) => (
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
            <Text style={styles.title}> Ingrese su nueva contraseña</Text>
            <View style={styles.button}>
              <InputI
                placeHolder={"Contraseña"}
                isSecure={true}
                value={values.passwd}
                id={"email"}
                errorMessage={errors.passwd}
                onChangeText={handleChange("passwd")}
              />
              <InputI
                placeHolder={"Confirme su contraseña"}
                isSecure={true}
                value={values.passwordConfirm}
                onChangeText={handleChange("passwordConfirm")}
                errorMessage={errors.passwordConfirm}
                id={"passwordConfirm"}
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
                onPress={handleSubmit}
              >
                <Text
                  H2
                  style={[
                    styles.buttonText,
                    { color: disabled ? "#6A6A6A" : "#FFFFFF" },
                  ]}
                >
                  Confirmar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ModalPopUp>
      )}
    </Formik>
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
    height: 40,
    alignItems: "flex-end",
    marginBottom: 10,
  },
  button: {
    width: "100%",
    //marginTop:30,
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 25,
  },
});
