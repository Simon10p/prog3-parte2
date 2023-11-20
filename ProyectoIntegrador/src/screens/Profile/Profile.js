import {TextInput ,View, Text, TouchableOpacity, StyleSheet, FlatList, Image, ScrollView, Touchable } from 'react-native';
import React, { Component } from 'react'
import { auth, db } from '../../firebase/config'
import Post from '../../components/Post/Post';

class Profile extends Component {
  
    constructor(props) {
      super(props)
      this.state = {
        allPosts: [],
        infoUser: [],
        id: '',
        stateEdit: false,
        miniBio: '',
        fotoPerfil: '',
        userName: '',

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
    eliminarUsuario(id) {
      const user = auth.currentUser;
      user.delete()
        .then(() => {
          console.log('Usuario eliminado');
        })
        .then(() => {
          db.collection('users').doc(id).delete()
          this.props.navigation.navigate("Login")
        })
        .catch((error) => {
          console.log(error);
        })
    }
   

    editProfile(){
      
        db.collection("users").doc(this.state.id).update({
          userName: this.state.userName,
          miniBio: this.state.miniBio,
          fotoPerfil: this.state.fotoPerfil
        })
    
      .then(() => {
        console.log("Perfil actualizado exitosamente");
      })
      .catch((error) => {
        console.error("Error al actualizar el perfil:", error);
      });
    

    }

    render() {
      console.log(this.state.id)
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
            <Image style={styles.profileImage} source={{ uri: this.state.infoUser.profileImage }} />
            <TouchableOpacity  onPress={() => this.setState({stateEdit:true})}><Text>Editar perfil</Text></TouchableOpacity>
            {this.state.stateEdit === true ? 
            <View>

          <TextInput
                  style={styles.input}
                  onChangeText={(text)=>this.setState({userName: text})}
                  placeholder='Nombre de usuario*'
                  keyboardType='default'
                  value={this.state.userName}
                  />
             <TextInput
             style={styles.input}
             onChangeText={(text)=>this.setState({miniBio: text})}
             placeholder='Descripcion'
             keyboardType='email-address'
             value={this.state.miniBio}
         />

       <TextInput
             style={styles.input}
             onChangeText={(url)=>this.setState({fotoPerfil: url})}
             placeholder='Agrega el URL de tu foto'
             keyboardType='email-address'
             value={this.state.fotoPerfil}


         />

          <TouchableOpacity style={styles.button} onPress={()=>this.editProfile()}>
                <Text style={styles.textButton}>Confirmar</Text>    
                </TouchableOpacity>
         </View> :
         false
          }


          </View>
  
          <FlatList
            data={this.state.allPosts}
            keyExtractor={(unPost) => unPost.id}
            renderItem={({ item }) => <Post dataPost={item} navigation={this.props.navigation} />}
          />
  
          <TouchableOpacity onPress={() => this.signOut()} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.eliminarUsuario(this.state.id)}>
                  <Text style={styles.logoutButton}>Delete user</Text>
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
      borderBottomColor: '#ddd',
    },
    backButton: {
      color: 'blue',
      marginBottom: 10,
    },
    welcomeText: {
      fontSize: 20,
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
      marginBottom: 10,
    },
    profileImage: {
      width: 150,
      height: 150,
      borderRadius: 75,
      alignSelf: 'center',
      marginBottom: 20,
    },
    logoutButton: {
      backgroundColor: 'red',
      padding: 15,
      borderRadius: 8,
      alignSelf: 'center',
      marginTop: 20,
    },
    logoutButtonText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
    },
    input: {
      height: 40,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 6,
      marginVertical: 10,
    },
  });
  
  export default Profile;
  