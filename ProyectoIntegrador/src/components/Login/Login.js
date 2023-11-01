import { auth } from 'ruta/a/firebase/config';
import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";

class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            login: false
        }
    }

    login(email, pass){
        auth.signInWithEmailAndPassword(email, pass)
         .then( response => {
             this.setState({login: true});
          })     
         .catch( error => {
           this.setState({error: 'Fallo en el registro.'})
         })
      }
     
      render(){
        <View>

        </View>
      }



}

const styles = StyleSheet.create({

})

export default Login;