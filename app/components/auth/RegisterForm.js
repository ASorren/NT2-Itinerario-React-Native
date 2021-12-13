import React , {useState, useEffect} from "react";
import { StyleSheet, View } from "react-native";
import { InputI } from "../../components/inputI";
import { GreenButton } from "../../components/buttonI";
import * as Yup from 'yup';
import { Formik } from 'formik';

const registerSchema = Yup.object().shape({
  email: Yup
    .string('Ingrese su email')
    .email('Ingrese un email valido')
    .required('El email es requerido'),
  passwd: Yup
    .string('Ingrese su contraseña')
    .min(6,'La contraseña debe tener un minimo de 6 caracteres')
    .required('La contraseña es requerida'),
  passwordConfirm: Yup
    .string('Confirme su contraseña')
    .test(null, 'La contraseña debe coincidir', function(value){
      return this.parent.passwd === value
    })
    .required('Confirme su contraseña'),
  userName: Yup
    .string('Ingrese su nombre')
    .min(3,'Su nombre debe tener un minimo de 3 caracteres')
    .required('El nombre es requerido')
});

export function RegisterForm({route, navigation}) {
 
  return (

    <Formik
    initialValues={{
      userName: '' ,
      email: '',
      passwd: '',
      passwordConfirm:'',
    }}
    validationSchema={registerSchema}
    onSubmit={
      (values)=> {
        navigation.navigate("generalinfo", { user: {userName: values.userName , passwd: values.passwd, email: values.email}})
      }
    }
    validateOnChange={false}
    validateOnBlur={false}
    >
    
    {({ errors, handleChange, handleSubmit, values }) => (
    <View style={styles.formContainer}>

      <InputI
      placeHolder={"Nombre de Usuario"} 
      isSecure={false}
      value={values.userName} 
      onChangeText={handleChange('userName')}
      errorMessage={errors.userName}
      id={"userName"}
      />

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

      <InputI
      placeHolder={"Confirme su contraseña"} 
      isSecure={true}
      value={values.passwordConfirm} 
      onChangeText={handleChange('passwordConfirm')}
      errorMessage={errors.passwordConfirm}
      id={"passwordConfirm"}
      />
      <View>
      <GreenButton
        onPress={handleSubmit}
        text="Continuar"
      />
      <GreenButton
        onPress={() => navigation.navigate("login")}
        text={"Volver"}
      />
      </View>
  
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
    alignSelf: 'center',
    paddingVertical: 10,
    marginVertical: 1,
    width: '75%',
    borderRadius: 32,
    borderColor: '#32BB77',
    borderWidth: 1,
    fontSize: 18,
    backgroundColor: '#FFFFFF'
},
});
