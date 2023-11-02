import { auth } from '../../firebase/config';
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

    register(email, pass){
        auth.createUserWithEmailAndPassword(email, pass)
         .then( response => {
             this.setState({registered: true});
          })     
         .catch( error => {
           this.setState({error: 'Fallo en el registro.'})
         })
      }
     
      render(){
        <View style={styles.formContainer}>
          <Text>Register</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='email'
                    keyboardType='email-address'/>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({userName: text})}
                    placeholder='user name'
                    keyboardType='default'/>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='password'
                    keyboardType='email-address'
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button} onPress={()=>this.register(this.state.email, this.state.password)}>
                    <Text style={styles.textButton}>Registrarse</Text>    
                </TouchableOpacity>
        </View>
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