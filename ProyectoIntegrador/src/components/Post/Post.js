import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, TextInput, FlatList} from 'react-native';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase';

class Post extends Component {


    constructor(props){
        super(props);
        this.state = {
            like: false,
            cantidadComentarios: this.props.dataPost.datos.comentarios.length,
          cantidadDeLikes: this.props.dataPost.datos.likes.length,
          stateMensaje: false
        }
    }
    componentDidMount(){
        //Chequear apenas carga si el post está o no likeado
        if(this.props.dataPost.datos.likes.includes(auth.currentUser.email)){
            this.setState({
                like:true
            })
        }
        
    }

    //Necesitamos en FB que cada Post tenga una propiedad con un array de emails

    likear(){
        //Agrega un email en la propiedad like del post.
        db.collection('posts').doc(this.props.dataPost.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then( res => this.setState({
            like: true,
            cantidadDeLikes: this.props.dataPost.datos.likes.length
        })

        )
        .catch( e => console.log(e))
    }

    disLike(){
        //Quita un email en la propiedad like del post.
        db.collection('posts').doc(this.props.dataPost.id).update({
            likes:firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then( res => this.setState({
            like: false,
            cantidadDeLikes: this.props.dataPost.datos.likes.length
        })

        )
        .catch( e => console.log(e))
    }

    render(){
      console.log(this.props.dataPost.id)
        return (
            <View style={styles.postContainer}>
            <View>
            <TouchableOpacity onPressOut={() => this.props.navigation.navigate('FriendProfile',{email: this.props.dataPost.datos.owner} )}>
              <Text style={styles.ownerText}>{this.props.dataPost.datos.owner}</Text>
            </TouchableOpacity>
            </View>
            <Image style={styles.camara} source={{uri: this.props.dataPost.datos.foto}} />
            <Text style={styles.postText}>{this.props.dataPost.datos.textoPost}</Text>
            <Text style={styles.likesText}> {this.state.cantidadDeLikes} likes</Text>
            
            {this.state.like ? (
              <TouchableOpacity style={styles.unlikeButton} onPress={() => this.disLike()}>
                <Text style={styles.buttonText}>Dislike</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.likeButton} onPress={() => this.likear()}>
                <Text style={styles.buttonText}>Likear</Text>
              </TouchableOpacity>
                )}

                <Text> {this.state.cantidadComentarios} comentarios </Text>
                     
                <View>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate("Comentarios", {id: this.props.dataPost.id})} >
                <Text> Comentar</Text>   
                    </TouchableOpacity>
                </View>   
            </View>

        )
    }

}
const styles = StyleSheet.create({
    postContainer: {
      padding: 10,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
    },
    camara: {
      width: '50%',
      height: '100%',
  },
    ownerText: {
      fontWeight: 'bold',
      marginBottom: 5,
    },
    postText: {
      marginBottom: 10,
    },
    likesText: {
      marginBottom: 10,
    },
      likeButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
      },
      unlikeButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
      },
})

export default Post;