import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, TextInput, FlatList} from 'react-native';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase';

class Post extends Component {

    constructor(props){
        super(props);
        this.state = {
            like: false,
            comentario: "",
          cantidadDeLikes: this.props.dataPost.datos.likes.length
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

    unlike(){
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

    comentar(texto){
      const postId = this.props.dataPost.id;

      db.collection("posts").doc(postId).update({
        comentarios: firebase.firestore.FieldValue.arrayUnion(texto)
      })
      .then(() => {
       
        this.setState({ comentario: "" });
      })
      .catch(e => console.log(e));
      }


    render(){
        return (
            <View style={styles.postContainer}>
            <View>
            <TouchableOpacity onPressOut={() => this.props.navigation.navigate('FriendProfile',{email: this.props.dataPost.datos.owner} )}>
              <Text style={styles.ownerText}>{this.props.dataPost.datos.owner}</Text>
            </TouchableOpacity>
            </View>
            <Image style={styles.camara} source={{uri: this.props.dataPost.datos.foto}} />
            <Text style={styles.postText}>{this.props.dataPost.datos.textoPost}</Text>
            <Text style={styles.likesText}>Cantidad de Likes: {this.state.cantidadDeLikes}</Text>
            
            {this.state.like ? (
              <TouchableOpacity style={styles.unlikeButton} onPress={() => this.unlike()}>
                <Text style={styles.buttonText}>Unlike</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.likeButton} onPress={() => this.likear()}>
                <Text style={styles.buttonText}>Likear</Text>
              </TouchableOpacity>
                )}

                <TouchableOpacity
                    onPress={ ()=> this.props.navigation.navigate('Comentarios', this.props.dataPost.datos.owner)}>
                        <Text> {this.props.dataPost.datos.comments.length} comentarios </Text>
                     
                </TouchableOpacity>

                <View>
                <TextInput
                       
                        onChangeText={(text) => this.setState({comentario: text })}
                        placeholder="Comment..."
                        keyboardType="default"
                        value={this.state.comentario}
                    />
                </View>   
                <View>
                <TouchableOpacity onPress={()=>this.comentar(this.state.comentario)}>
                    <Text>Comentar</Text>
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