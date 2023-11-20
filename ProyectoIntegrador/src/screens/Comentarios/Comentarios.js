import { Text, View, TextInput, TouchableOpacity, StyleSheet,FlatList} from 'react-native'
  import React, { Component } from 'react'
  import {db, auth} from '../../firebase/config'
  import firebase from 'firebase'
import { ThemeProvider } from '@react-navigation/native'
  
  
  class Comment extends Component {
    constructor(props){
      super(props)
      this.state = {
        newComment:'',
        id: this.props.route.params.id,
        comments: []
      }
    }
  
    
    componentDidMount(){
    db
    .collection('posts')
    .doc(this.state.id)
    .onSnapshot(doc => {

       this.setState({
        comments: doc.data().comentarios
        }) 

       })
}

    addComment(idDoc, text){
      db
      .collection('posts')
      .doc(idDoc)
      .update({
        comentarios: firebase.firestore.FieldValue.arrayUnion({
          owner:auth.currentUser.email,
          createdAt: Date.now(),
          comentarios: text
        })
      })
      .catch(e => console.log(e))
    
      this.setState({
        newComment: ''
      })
    }
   
    render() {
      return (
        <View>
        {this.state.comments.length > 0 ? (
        <View style={styles.texto}>
          <FlatList
          data={this.state.comments}
          keyExtractor={item => item.createdAt.toString()}
          renderItem={({item}) => (
            <View>
              <Text style={styles.textox}>{item.owner} comentó:</Text>
            <Text style={styles.textox}>{item.comentarios}</Text>
              </View>
            
        )}         
            />
          </View>
        ):(
            <Text>No hay comentarios en esta publicacion</Text>
            )}
            <View style={styles.boton}>
            <TextInput
              onChangeText={text => this.setState({newComment: text})}
              style = {styles.input}
              keyboardType='default'
              placeholder='Agrega un comentario'
              value={this.state.newComment}
            />
            <TouchableOpacity onPress={()=> this.addComment(this.state.id, this.state.newComment)}>
              <Text style={styles.boton}>Agregar comentario</Text>
            </TouchableOpacity>
          </View>
          <Text onPress={ () => this.props.navigation.navigate ("Menu")} style={styles.botonx}>Volver al inicio</Text>
        </View>
        );
      }
}

  
  const styles = StyleSheet.create({
    input: {
      justifyContent: 'center',
      textAlign: 'center' ,
      fontFamily: 'monospace',
    } ,

    texto:{
      backgroundColor: 'rgb(255,255,242)',
      fontFamily: 'monospace',
      fontSize: 13,
      margin: 14,
      borderRadius: 12,
      textAlign: 'center',
      color: 'rgb(128, 128, 128)',
      padding: 8

  }, 

  textox:{
    backgroundColor: 'rgb(255,255,242)',
    fontFamily: 'monospace',
    fontSize: 13,
    margin: 1,
    borderRadius: 12,
    textAlign: 'center',
    color: 'rgb(128, 128, 128)',
    padding: 8

}, 

  boton:{
    fontFamily: 'monospace',
    fontSize: 16,
    margin: 10,
    backgroundColor: 'rgb(173, 216, 230)',
    borderRadius: 20,
    textAlign: 'center',
    padding: 5
  
  },

  botonx:{
    fontFamily: 'monospace',
    fontSize: 16,
    margin: 10,
    backgroundColor: 'rgb(173, 216, 230)',
    borderRadius: 20,
    textAlign: 'center',
    justifyContent: 'flex-end' ,
    padding: 5
  
  },
  })
  
  export default Comment