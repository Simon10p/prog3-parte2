import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import React, { Component } from 'react'
import { auth, db } from '../../firebase/config'
import Post from '../../components/Post/Post';

class Profile extends Component {
  
    constructor(props) {
      super(props)
      this.state = {
        allPosts: [],
        infoUser: {},
        id: ''
      }
    }
    componentDidMount() {
  
      db.collection('posts').where('owner', '==', auth.currentUser.email)
      .orderBy('createdAt' , 'desc')
      .onSnapshot(docs => {
        let posts = []
        docs.forEach(doc => {
          posts.push({
            id: doc.id,
            datos: doc.data()
          })
        })
        this.setState({
          allPosts: posts
        },
        console.log("hola", this.state.allPosts)
        )
  
      })
  
      db.collection('users')
        .where('email', '==', auth.currentUser.email)
        .onSnapshot(doc => {
          doc.forEach(doc =>
            this.setState({
              id: doc.id,
              infoUser: doc.data()
            }))
  
        })
  
  
    }
  
    signOut() {
      auth.signOut()
      this.props.navigation.navigate('Login')
    }


    render() {
      console.log("TEST", this.state.allPosts);
      return (
        <>
        <TouchableOpacity onPressOut={()=>this.props.navigation.navigate('Home')}>
                    <Text>Back to Home</Text>
                </TouchableOpacity>
          <View>
            <Text>Este es tu perfil!</Text>
            
  
              <Text > Bienvenido a tu perfil {this.state.infoUser.userName}! </Text>
             <Text> La biografia del usuario: {this.state.infoUser.miniBio}</Text>
              <Text> Tu mail: {auth.currentUser.email} </Text> 
              <Text> Tu perfil se creo: {auth.currentUser.metadata.creationTime} </Text> 
            
            
          </View>

          <View style={styles.container3}> 
          <FlatList 
                data = {this.state.allPosts}
                keyExtractor={ unPost => unPost.id}
                renderItem= { ({item}) => <Post dataPost = {item}    /> }
            />
             </View>
          
  
          <TouchableOpacity onPress={() => this.signOut()}>
              <Text style={styles.boton}> Cerrar tu sesión</Text>
            </TouchableOpacity>
          </>
      )
    }
  }

  const styles = StyleSheet.create({
    container1:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    container2:{
      flex:3
    },
    container3:{
      flex:5
    },
    image:{
      height:300
    },
    boton:{
      fontFamily: 'monospace',
      fontSize: 16,
      margin: 15,
      backgroundColor: 'rgb(186, 0, 0)',
      borderRadius: 20,
      textAlign: 'center',
      padding: 5
  
  },
  })
  export default Profile
  