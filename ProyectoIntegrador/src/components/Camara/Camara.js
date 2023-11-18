import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
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
        this.metodosDeCamara.takePictureAsync()
        .then(foto => {
            this.setState({
                urlInternaFoto: foto.uri,
                mostrarCamara: false
            })
        })
        .catch(e => console.log(e))
    }

    rechazarFoto(){
        this.setState({
            mostrarCamara: true,
        })
    }

    guardarLaFotoEnStorage(){
        fetch(this.state.urlInternaFoto)
        .then(res => res.blob())
        .then(imagen => {
           const ref = storage.ref(`foto/${Date.now()}.jpg`)
           ref.put(imagen)
           .then( () => {
            ref.getDownloadURL()
            .then( url => {
                this.props.onImageUpload(url)
            }
            )
        })
        })
        .catch(e => console.log(e))
    }
    render(){
        console.log(this.state.urlInternaFoto)
        return (
            <View>
                {this.state.permisosDeHardware ? 
                this.state.mostrarCamara ?
                <View style={styles.formContainer} >
                    <Camera style={styles.camara} type={Camera.Constants.Type.front} ref={metodosCamara => this.metodosDeCamara = metodosCamara}/>
                    <TouchableOpacity
                        style={styles.button}
                         onPress={() => this.sacarFotos()}
                        >
                        <Text style={styles.textButton}>Sacar foto</Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={styles.formContainer}>
                    <Image style={styles.camara} source={{uri: this.state. urlInternaFoto}} />
                    <TouchableOpacity
                        style={styles.button}
                         onPress={() => this.guardarLaFotoEnStorage()}
                        >
                        <Text style={styles.textButton}>Aceptar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                         onPress={() => this.rechazarFoto()}
                        >
                        <Text style={styles.textButton}>Rechazar</Text>
                    </TouchableOpacity>
                </View>
                :
                <Text>Para sacar fotos, se necesita acceso a tu camara</Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer: {
        height: `60vh`,
        width: `100vw`,
    },
    camara: {
        width: '50%',
        height: '50%',
    },
    input: {
      height: 20,
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      borderStyle: "solid",
      borderRadius: 6,
      marginVertical: 10,
    },
    button: {
      backgroundColor: "blue",
      paddingHorizontal: 10,
      paddingVertical: 6,
      textAlign: "center",
      borderRadius: 4,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#28a745",
    },
    textButton: {
      color: "#fff",
    },
  });
  
export default Camara;