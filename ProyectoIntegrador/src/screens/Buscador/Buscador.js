import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { db, auth } from "../../firebase/config"

class Buscador extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            idUsuario: "",
            infoUser: [],
            busqueda: ''
        };
    }
    componentDidMount() {
        db.collection('users').onSnapshot(docs => {
            let users = []
            docs.forEach(doc => {
                users.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({
                infoUser: users,
            },
                () => console.log(this.state.infoUser)
            )
        })
    }

    

    evitarSubmit(event) {
        event.preventDefault();
    }
    controlarCambios(event) {
        this.setState({ valor: event.target.value }, () => this.props.metodoQueBusca(this.state.valor));
    }

    render() {
        console.log(this.state.infoUser);
        let usuariosFiltrados = this.state.infoUser.filter((unUser) => unUser.data.userName.toLowerCase().includes(this.state.busqueda.toLowerCase())
        );

        return (
            <View>
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='Busca usuarios!'
                    onChangeText={text => this.setState({ busqueda: text })}
                    value={this.state.busqueda}
                />
                { this.state.busqueda.length != 0  ?
                <FlatList
                    data={usuariosFiltrados}
                    keyExtractor={(unUser) => unUser.id}
                    style={styles.container}
                    renderItem={({ item }) => (

                    <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate('FriendProfile', {email: item.data.email})}
                        style={styles.containerProfile}>
            <View>
                {console.log(item)}
            <Text >{item.data.userName}</Text>
            <Text style={styles.email}>{item.data.email}</Text>
              
            </View>
            </TouchableOpacity>
            )}
        />  : null}
                 
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        marginLeft:10
    },
    input:{
        borderWidth:2,
        height:40,
        width:'90%',
        borderRadius:20,
        borderColor:'black',
        padding:10,
        margin:10
    },
   to:{
    width:200,
    height:50,
    margin: 5,
    backgroundColor:'deepskyblue',
    textAlign:'center',
    borderRadius:40,
    alignItems:'center',
    justifyContent:'center',
    marginTop:10
}})

export default Buscador