import {db, auth } from '../../firebase/config';
import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, TextInput} from "react-native";

class Register extends Component{
    constructor(props){
        super(props);
        this.state={
            registered: false,
            email: '',
            userName: '',
            password: '',
            miniBio: '',
            fotoPerfil: ''
        }
    }
    componentDidMount(){
        console.log("Chequear si el usuario está loguado en firebase.");
        // Puse la funcionalidad aquí para probarla. No necesariamente debe ir en este componente.

        auth.onAuthStateChanged( user => {
            console.log(user)
            if( user ){
                //Redirigir al usuario a la home del sitio.
                this.props.navigation.navigate('Home')
            }

        } )

    }
    register(email, pass, userName, descripcion){
        auth.createUserWithEmailAndPassword(email, pass)
        .then( response => {
            //Cuando firebase responde sin error
            console.log('Registrado ok', response);

             //Cambiar los estados a vacío como están al inicio.

            //Crear una colección Users
            db.collection('users').add({
                email: auth.currentUser.email,
                userName: userName,
                createdAt: Date.now(),
                miniBio: descripcion
            })

            .then( res => console.log(res))

        })
        .catch( error => {
            //Cuando Firebase responde con un error
            console.log(error);

        })
}
     
      render(){
        return(
    <View style={styles.formContainer}>
        <Text>Register</Text>
              <TextInput
                  style={styles.input}
                  onChangeText={(text)=>this.setState({email: text})}
                  placeholder='email'
                  keyboardType='email-address'
                  value={this.state.email}
                  />
              <TextInput
                  style={styles.input}
                  onChangeText={(text)=>this.setState({userName: text})}
                  placeholder='user name'
                  keyboardType='default'
                  value={this.state.userName}
                  />
              <TextInput
                  style={styles.input}
                  onChangeText={(text)=>this.setState({password: text})}
                  placeholder='password'
                  keyboardType='email-address'
                  secureTextEntry={true}
                  value={this.state.password}
              />
              <TextInput
                  style={styles.input}
                  onChangeText={(text)=>this.setState({miniBio: text})}
                  placeholder='description'
                  keyboardType='email-address'
                  value={this.state.miniBio}
              />
              <TouchableOpacity style={styles.button} onPress={()=>this.register(this.state.email, this.state.password, this.state.userName, this.state.miniBio)}>
                  <Text style={styles.textButton}>Registrarse</Text>    
              </TouchableOpacity>
              <TouchableOpacity onPress={ () => this.props.navigation.navigate('Login')}>
                 <Text>Ya tengo cuenta. Ir al login</Text>
              </TouchableOpacity>
      </View> 
        )  
    }
}

const styles = StyleSheet.create({
  formContainer:{
      paddingHorizontal:10,
      marginTop: 20,
  },
  input:{
      height:20,
      paddingVertical:15,
      paddingHorizontal: 10,
      borderWidth:1,
      borderColor: '#ccc',
      borderStyle: 'solid',
      borderRadius: 6,
      marginVertical:10,
  },
  button:{
      backgroundColor:'#28a745',
      paddingHorizontal: 10,
      paddingVertical: 6,
      textAlign: 'center',
      borderRadius:4, 
      borderWidth:1,
      borderStyle: 'solid',
      borderColor: '#28a745'
  },
  textButton:{
      color: '#fff'
  }

})

export default Register;