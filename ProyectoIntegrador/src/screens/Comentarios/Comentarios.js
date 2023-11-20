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
        <View style={styles.containerComments}>
          <FlatList
          data={this.state.comments}
          keyExtractor={item => item.createdAt.toString()}
          renderItem={({item}) => (
            <View>
              <Text style={styles.comentado}>{item.owner} comentó:</Text>
            <Text style={styles.comentado}>{item.comentarios}</Text>
              </View>
            
        )}         
            />
          </View>
        ):(
          <View>
             <Text style= {styles.noComment}>Todavía no hay comentarios. Se el primero en comentar!</Text>
          </View>
           
            )}
            <View style={styles.boton}>
            <TextInput
              onChangeText={text => this.setState({newComment: text})}
              style = {styles.input}
              keyboardType='default'
              placeholder='Escribe lo que piensas!'
              value={this.state.newComment}
            />
            <TouchableOpacity onPress={()=> this.addComment(this.state.id, this.state.newComment)}>
              <Text style={styles.agregar}>Agregar comentario</Text>
            </TouchableOpacity>
          </View>
          <Text onPress={ () => this.props.navigation.navigate ("Menu")} style={styles.goBack}>Volver al Home</Text>
        </View>
        );
      }
}

  
  const styles = StyleSheet.create({
    noComment: {
      justifyContent: 'center',
      textAlign: 'center' ,
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal'
    },
    input: {
      justifyContent: 'center',
      fontWeight: 'normal',
      textAlign: 'center' ,
      fontFamily: 'sans-serif-light',
      color: 'rgb(100, 100, 100)',
    } ,

    containerComments:{
      backgroundColor: 'rgb(255,255,242)',
      textAlign: 'center',
      color: 'rgb(128, 128, 128)',
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
      fontSize: 15,
      margin: 14,
      borderRadius: 8,
      padding: 8

  }, 

  comentado:{
    backgroundColor: 'rgb(255,255,242)',
    fontFamily: 'sans-serif-light',
    fontWeight: 'normal',
    fontSize: 15,
    margin: 1,
    borderRadius: 8,
    textAlign: 'center',
    color: 'rgb(50, 50, 50)',
    padding: 8

}, 

  agregar:{
    fontFamily: 'sans-serif-light',
    fontWeight: 'normal',
    fontSize: 20,
    margin: 10,
    backgroundColor: 'rgb(84, 123, 144)',
    borderRadius: 14,
    textAlign: 'center',
    color: 'rgb(50, 50, 50)',
    padding: 5
  
  },

  goBack:{
    fontFamily: 'sans-serif-light',
    fontWeight: 'normal',
    fontSize: 20,
    margin: 10,
    backgroundColor: 'rgb(255, 71, 90)',
    justifyContent: 'flex-end' ,
    padding: 5,
    borderRadius: 14,
    textAlign: 'center'
  },
  })
  
  export default Comment