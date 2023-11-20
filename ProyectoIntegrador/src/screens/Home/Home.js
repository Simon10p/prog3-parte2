import React, { Component } from 'react';
import {ActivityIndicator, Image, TextInput, FlatList ,TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import { auth, db } from '../../firebase/config';

import PostForm from '../PostForm/PostForm';
import Post from '../../components/Post/Post';
import Buscador from '../Buscador/Buscador'


class Home extends Component {
    constructor(){
        super()
        this.state={
            posts:[]
        }
    }

    logout(){
        auth.signOut();

        this.props.navigation.navigate('Login')

    }
    
//usamos on snapshot para traer lo que esta en firebase
//on snapshot recibe un callback, el parametro va a tener la ifnroamcion q trajo de firebase
// dentro de ese callback creamos una variable para ir llenando la info con lo que nos trae firebase
//la info que nos trae firebase es un array con muchas cosas de las cuales solo queremos algunas
    componentDidMount(){
        db.collection("posts").orderBy("createdAt" , "desc").onSnapshot(
            listaPosts => {
             let postAMostrar = [];
             listaPosts.forEach(unPost => {
                postAMostrar.push({
                    id: unPost.id,
                    datos: unPost.data()
                })
             })   
             this.setState({
                posts:postAMostrar
             })
            }
        )
    }



    render(){ 
        console.log(this.state.posts)
        return(
             <View style={styles.container}>
                {
                    this.state.posts.length === 0 ?
                    <View style={styles.activityIndicatorContainer}>
                      <ActivityIndicator  size='small' color='blue' />
                    </View>
                    : 
        <>
        <View style={styles.containerHijo}>  <FlatList 
                data = {this.state.posts}
                keyExtractor={ unPost => unPost.id}
                renderItem= { ({item}) => <Post dataPost = {item} navigation = {this.props.navigation} /> }
            /></View>
          
        </>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
      height: '100%',
      backgroundColor: "white"
    },
    containerHijo:{
        flex:5
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: 'blue',
     
    },
    profileLink: {
      fontSize: 16,
      color: 'blue',
      marginTop: 10,
     
    },
    logoutLink: {
        fontSize: 16,
        color: 'blue',
        marginTop: 10,
      },
    });


export default Home;

{ /* <Text style={styles.title} >HOME</Text>
<TouchableOpacity onPressOut={()=>this.props.navigation.navigate('Profile')}>
    <Text style={styles.profileLink} > Mi Perfil</Text>
</TouchableOpacity>
<TouchableOpacity onPressOut={()=>this.logout()}>
    <Text style={styles.logoutLink} >Cerrar sesión</Text>
</TouchableOpacity>
<Buscador navigation={this.props.navigation}/> */}