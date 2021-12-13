import React, {useState, useEffect} from "react";
import { StyleSheet, View, Text, Modal, Image, TouchableOpacity, Button } from "react-native";
import { InputI } from "../../components/inputI";
import { GreenButton, WhiteButton } from "../../components/buttonI";
import { handleUser } from "../../utils/Context/Storage";
import { useAuthUpdateContext } from '../../utils/Context/AuthContext';
import { ForgotPassModal } from "../../components/Auth/ForgotPassModal";
import { fetchUser } from "../../api/PosadasApi";

import * as Yup from 'yup';
import { Formik } from 'formik';

const loginSchema = Yup.object().shape({
  email: Yup
    .string('Ingrese su email')
    .email('Ingrese un email valido')
    .required('El email es requerido'),
  passwd: Yup
    .string('Ingrese su contraseña')
    .min(6,'La contraseña debe tener un minimo de 6 caracteres')
    .required('La contraseña es requerida'),
});

export function LoginForm(props) {
  const { navigation } = props;
  const updateUser = useAuthUpdateContext();
  const [visible, setVisible] = useState(false);
 


  useEffect(() => {
    handleUser('updateLocal' , updateUser);  
  }, [])

  function login(values){
    setTimeout(() => {
      handleUser('login' , updateUser , {email: values.email, passwd: values.passwd});
      
    }, 800)
  };

   


  return (

    <Formik
    initialValues={{
      email: '',
      passwd: '',
    }}
    validationSchema={loginSchema}
    validateOnChange={false}
    validateOnBlur={false}
    onSubmit={
      (values)=> {
        login(values)
      }
    }
    >
 
    {({ errors, handleChange, handleSubmit, values }) => (

    <View style={styles.formContainer}>

      <InputI
      placeHolder={"Correo electrónico"} 
      isSecure={false}
      value={values.email} 
      onChangeText={handleChange('email')}
      errorMessage={errors.email}
      id={"email"}
      />

      <InputI
      placeHolder={"Contraseña"} 
      isSecure={true}
      value={values.passwd} 
      onChangeText={handleChange('passwd')}
      errorMessage={errors.passwd}
      id={"passwd"}
      />
    
   
      <ForgotPassModal open={visible} setVisible={()=> setVisible()} />
  

      <ForgotPassword style={styles.forgotPassword} />
      <GreenButton  onPress={handleSubmit} text="Login" />

      <WhiteButton
        onPress={() => navigation.navigate("register")}
        text="Registro"
      />
    </View>
    )}
    </Formik>
  );


  function ForgotPassword() {
    return (
      <Text
        style={styles.forgotPassword}
        onPress={() => setVisible(true)}
      >
        {" "}
        ¿Olvidaste tu contraseña?
      </Text>
    );
  }

}

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    //marginTop: 15,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    fontStyle: "italic",
  },
  modalBackground:{
    flex:1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer:{
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation:20,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',

  },
  button:{
    width: "80%",
    marginTop:30,  

  }
});