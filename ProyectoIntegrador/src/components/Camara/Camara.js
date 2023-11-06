import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { db, auth, storage } from '../../firebase/config';
import firebase from 'firebase';
import {Camera} from "expo-camera";


class Camara extends Component{
    constructor(props){
        super(props);
        
        this.state={
            permisosDeHardware: false,
            urlInternaFoto: "",
            mostrarCamara: true, // para elegir si queremos mostrar camara o preview de foto.


        }
        this.metodosDeCamara = '' //guardar metodos de la camara

      

    }
    componentDidMount(){
        Camera.getCameraPermissionsAsync()
        .then( ()=>{
            this.setState({
                permisosDeHardware: true
            })

        }
            
        )
        .catch( e=> console.log(e))
    }
    sacarFotos(){

    }

    guardarLaFotoEnStorage(){
        
    }
    render(){
        return(
            <View> 
            <Camera
                //style={}
                type= {Camera.Constants.Type.front}
                ref={metodosDeCamara=> this.metodosDeCamara = metodosDeCamara}
            
               
            />
             <TouchableOpacity> 
                <Text>Sacar Foto</Text>
            </TouchableOpacity>
            </View>
        )
    }
}
export default Camara;