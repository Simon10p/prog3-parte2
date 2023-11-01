import { auth } from 'ruta/a/firebase/config';
import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";

class Register extends Component{
    constructor(props){
        super(props);
        this.state={
            registered: false
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
        <View>

        </View>
      }



}

const styles = StyleSheet.create({

})

export default Register;