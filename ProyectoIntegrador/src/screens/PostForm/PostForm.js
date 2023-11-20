import React, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Camara from '../../components/Camara/Camara';

class PostForm extends Component {
    constructor(){
        super()
        this.state={
           textoPost:'',
           mostrarCamara:true,
           url: "",
           infoUser: ''
        }
    }


    componentDidMount(){
        db.collection('users').where("email", "==", auth.currentUser.email).onSnapshot(
          docs => {
            let datos = []
            docs.forEach(doc => {
                datos.push(
                {
                  id: doc.id,
                  datos: doc.data()
                })
            })
    
            this.setState({
              infoUser: datos
        }, ()=> console.log(this.state.infoUser))
          }
        )
      }
    //1)Completar la creación de posts
    crearPost(owner, textoPost, createdAt){
        //Crear la colección Users
        db.collection('posts').add({
            owner: owner, //auth.currentUser.email,
            textoPost: textoPost, //this.state.textoPost,
            createdAt: createdAt, //Date.now(), 
            foto: this.state.url,
            comentarios: [],
            likes: []
        })
        .then( () => this.props.navigation.navigate("Home"))
        .catch( e => console.log(e))
    }

    onImageUpload(url){
        this.setState({ url: url , mostrarCamara: false});
      }


    render(){
        return(
            <View style={styles.formContainer}>
                <Text style={styles.titulo}>Haz un Posteo!</Text>
                {this.state.mostrarCamara ?
                
                <Camara onImageUpload={(url) => this.onImageUpload(url)}/>
                :
                <React.Fragment>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({textoPost: text})}
                    placeholder='Escribir...'
                    keyboardType='default'
                    value={this.state.textoPost}
                    />
                <TouchableOpacity 
                style={styles.button} 
                onPress={()=>{
                    this.crearPost(auth.currentUser.email, this.state.textoPost, Date.now(), this.state.likes)
                    this.props.navigation.navigate('Home')
                    }}>
                    <Text style={styles.textButton}>Postear</Text>    
                </TouchableOpacity>
                </React.Fragment>
            }
            </View>
        );
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
    },
    titulo:{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    }

})


export default PostForm;