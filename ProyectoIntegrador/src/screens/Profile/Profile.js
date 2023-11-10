import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import React, { Component } from 'react'
import { auth, db } from '../../firebase/config'
import Posteo from '../../components/Posteo/Posteo';

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
  
      db.collection('post').where('owner', '==', auth.currentUser.email)
      .orderBy('createdAt' , 'desc')
      .onSnapshot(docs => {
        let posts = []
        docs.forEach(doc => {
          posts.push({
            id: doc.id,
            data: doc.data()
          })
        })
        this.setState({
          allPosts: posts
        },
          () => console.log(this.state.allPosts)
        )
  
      })
  
      db.collection('users')
        .where('creador', '==', auth.currentUser.email)
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
      return (
        <>
          <div>
            <Text>Este es tu perfil!</Text>
            <li>
  
              <ul><Text > Bienvenido a tu perfil {this.state.infoUser.nombreDeUsuario}! </Text></ul>
              <ul><Text> La biografia del usuario: {this.state.infoUser.descripcion}</Text></ul>
              <ul><Text> Tu mail: {auth.currentUser.email} </Text> </ul>
              <ul><Text> Tu perfil se creo: {auth.currentUser.metadata.creationTime} </Text> </ul>
            </li>
            
          </div>
          <View style={styles.container3}> <FlatList
            data={this.state.allPosts}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <Posteo navigation={this.props.navigation} data={item.data} id={item.id} />} //RENDERIZA UN COMPONENTE POST que le paso a traves de la prop data toda la info que se guarda en items (data sale del push de doc.data
          />  </View>
          
  
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
  