import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
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
      return (
        <ScrollView style={styles.container}>
          <View style={styles.profileInfo}>
            <TouchableOpacity onPressOut={() => this.props.navigation.navigate('Home')}>
              <Text style={styles.backButton}>Back to Home</Text>
            </TouchableOpacity>
    
              <Text style={styles.welcomeText}>Bienvenido a tu perfil, {this.state.infoUser.userName}!</Text>
              <Text style={styles.bioText}>Biografía del usuario: {this.state.infoUser.miniBio}</Text>
              <Text style={styles.emailText}>Tu email: {auth.currentUser.email}</Text>
              <Text style={styles.creationTimeText}>Tu perfil se creó: {auth.currentUser.metadata.creationTime}</Text>
              <Image style= {styles.profileImage} source={{uri: this.state.infoUser.profileImage}} /> 
            </View>



    
            <FlatList
              data={this.state.allPosts}
              keyExtractor={(unPost) => unPost.id}
              renderItem={({ item }) => <Post dataPost={item} navigation = {this.props.navigation}/>}
            />
        

          <TouchableOpacity onPress={() => this.signOut()} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
          </TouchableOpacity>
        
      </ScrollView>
    );
  }
}

 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileInfo: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: "center,"
  },
  backButton: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bioText: {
    fontSize: 16,
    marginBottom: 10,
  },
  emailText: {
    fontSize: 16,
    marginBottom: 10,
  },
  creationTimeText: {
    fontSize: 16,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileImage:{
    width: 150,
    height: 150,
    borderRadius: 75,
  }
});


  export default Profile
  