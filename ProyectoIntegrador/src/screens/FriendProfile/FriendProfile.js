import { Text, View, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../../firebase/config'
import Post from '../../components/Post/Post'



class FriendProfile extends Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            mailFriend: props.route.params.email,
            postsFriend: [],
            infoUser:{}
        }
    }

    componentDidMount() {
        db
            .collection('posts')
            .where('owner', '==', this.state.mailFriend)
            .onSnapshot(docs => {
                let posts = []
                docs.forEach(doc => posts.push({
                    id: doc.id,
                    datos: doc.data()
                }))
                this.setState({
                    postsFriend: posts
                }, () => console.log("TEST222", this.state.postsFriend))
            })
        db.collection('users')
            .where('email', '==', this.state.mailFriend)
            .onSnapshot(doc => {
                doc.forEach(doc =>
                    this.setState({
                        id: doc.id,
                        infoUser: doc.data()
                    }))
            })
    }
    render() {
        return (
            <View styles={styles.container}>
            <TouchableOpacity onPressOut={()=>this.props.navigation.navigate('Home')}>
                    <Text style={styles.backButton}>Back to Home</Text>
            </TouchableOpacity>
                <View style={styles.profileInfo}> 
                <Text style={styles.welcomeText}>{this.state.infoUser.userName}'s Profile</Text>
                <Text style={styles.emailText}>{this.props.route.params.email}</Text>
                <Text style={styles.bioText}>{this.state.infoUser.miniBio}</Text>
                <Text style={styles.creationTimeText}>Este perfil fue creado {auth.currentUser.metadata.creationTime} </Text>
                <Text style={styles.creationTimeText}>Cantidad de Publicaciones: {this.state.postsFriend.length} </Text>
                <Image 
                    source={{ uri: this.state.infoUser.imagen }}
                    resizeMode='contain' />

                </View>
                    <View style={styles.container3}>

                    <FlatList
                    data={this.state.postsFriend}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <Post dataPost={item} navigation = {this.props.navigation} />} //RENDERIZA UN COMPONENTE POST que le paso a traves de la prop data toda la info que se guarda en items (data sale del push de doc.data
                /> 
                    </View>
                
                    </View>
        )
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

export default FriendProfile;
