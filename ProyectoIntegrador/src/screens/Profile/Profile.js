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
      return (
        <View style={styles.container}>
          <TouchableOpacity onPressOut={() => this.props.navigation.navigate('Home')}>
            <Text style={styles.backButton}>Back to Home</Text>
          </TouchableOpacity>
  
          <View style={styles.profileInfo}>
            <Text style={styles.welcomeText}>Bienvenido a tu perfil, {this.state.infoUser.userName}!</Text>
            <Text style={styles.bioText}>Biografía del usuario: {this.state.infoUser.miniBio}</Text>
            <Text style={styles.emailText}>Tu email: {auth.currentUser.email}</Text>
            <Text style={styles.creationTimeText}>Tu perfil se creó: {auth.currentUser.metadata.creationTime}</Text>
          </View>



        <View style={styles.postContainer}>
          <FlatList
            data={this.state.allPosts}
            keyExtractor={(unPost) => unPost.id}
            renderItem={({ item }) => <Post dataPost={item} navigation = {this.props.navigation}/>}
          />
        </View>

        <TouchableOpacity onPress={() => this.signOut()} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

 
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
  backButton: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 20,
  },
  profileInfo: {
    marginBottom: 20,
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
  postContainer: {
    flex: 1,
  },
  logoutButton: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

  export default Profile
  