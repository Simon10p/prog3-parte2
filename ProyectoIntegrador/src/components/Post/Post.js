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

    render() {
      return (
        <View style={styles.postContainer}>
          <TouchableOpacity
            style={styles.container}
            onPressOut={() =>
              this.props.navigation.navigate('FriendProfile', {
                email: this.props.dataPost.datos.owner,
              })
            }
          >
            <Text style={styles.ownerText}>
              {this.props.dataPost.datos.owner}
            </Text>
          </TouchableOpacity>
          <Image
            style={styles.camara}
            source={{ uri: this.props.dataPost.datos.foto }}
          />
          <Text style={styles.postText}>
            {this.props.dataPost.datos.textoPost}
          </Text>
          <Text style={styles.likesText}>
            {this.state.cantidadDeLikes} likes
          </Text>
          <Text style={styles.textoComentario}>{this.state.cantidadComentarios} comentarios</Text>
          <View style={styles.contenedorLikes}>
            {this.state.like ? (
              <TouchableOpacity
                style={styles.unlikeButton}
                onPress={() => this.disLike()}
              >
                <Text style={styles.buttonText}>Dislike</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.likeButton}
                onPress={() => this.likear()}
              >
                <Text style={styles.buttonText}>Like</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.contenedorComentario}>
          <TouchableOpacity
            style={styles.bottonComentar}
            onPress={() =>
              this.props.navigation.navigate('Comentarios', {
                id: this.props.dataPost.id,
              })
            }
          >
            <Text>Comentar</Text>
          </TouchableOpacity>  
          </View>
         
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    postContainer: {
      margin: 10,
      padding: 10,
      backgroundColor: '#fff',
      borderRadius: 8,
      elevation: 3,
    },
    container: {
      marginBottom: 5,
    },
    ownerText: {
      fontWeight: 'bold',
    },
    camara: {
      width: '100%',
      height: 200,
      marginTop: 10,
      marginBottom: 10,
      borderRadius: 8,
    },
    postText: {
      marginBottom: 10,
    },
    textoComentario: {
      marginBottom: 5,
    },
    likesText: {
      fontWeight: 'bold',
      marginBottom: 5,
    },
    contenedorLikes: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center', // Center items vertically
      marginBottom: 1,
      marginLeft:3
    },
    contenedorComentario: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center', // Center items vertically
      marginBottom: 1,

    },
    likeButton: {
      backgroundColor: 'blue',
      padding: 8,
      borderRadius: 5,
      marginRight: 5,
    },
    unlikeButton: {
      backgroundColor: 'red',
      padding: 8,
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
    },
    bottonComentar: {
      backgroundColor: '#4CAF50',
      padding: 8,
      borderRadius: 5,
      marginLeft: 5, // Add margin to separate the buttons
      marginTop: 10,
    },
  });
  
  
  
  
  export default Post;