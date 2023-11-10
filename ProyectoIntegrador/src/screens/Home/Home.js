import react, { Component } from 'react';
import {TextInput, FlatList ,TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import { auth, db } from '../../firebase/config';
import PostForm from '../PostForm/PostForm';
import Post from '../../components/Post/Post';


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
        db.collection("posts").onSnapshot(
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
            <View>
                <Text>HOME</Text>
                <TouchableOpacity onPressOut={()=>this.logout()}>
                    <Text>Logout</Text>
                </TouchableOpacity>

            {/* importar form para crear post, el form deberia estar en una pantalla aparte para que no este todo raro */}
            <PostForm />
            <FlatList 
                data = {this.state.posts}
                keyExtractor={ unPost => unPost.id}
                renderItem= { ({item}) => <Post dataPost = {item}    /> }
            />
            </View>
        )
    }
}



export default Home;