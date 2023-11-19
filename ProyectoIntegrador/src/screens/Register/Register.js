import {db, auth } from '../../firebase/config';
import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, TextInput} from "react-native";
import Camara from "../../components/Camara/Camara"

let pp = ''
class Register extends Component{
    constructor(props){
        super(props);
        this.state={
            registered: false,
            email: '',
            userName: '',
            password: '',
            miniBio: '',
            fotoPerfil: '',
            errors: "",
            camaraState: false
        }
    }
    componentDidMount(){
        console.log("Chequear si el usuario está loguado en firebase.");
        // Puse la funcionalidad aquí para probarla. No necesariamente debe ir en este componente.

        auth.onAuthStateChanged( user => {
            console.log(user)
            if( user ){
                //Redirigir al usuario a la home del sitio.
                this.props.navigation.navigate('Home')
            }

        } )

    }
    register(email, pass, userName, descripcion, fotoPerfil){
  /* ERRORES */
            if(this.state.email == '' || this.state.email.includes("@") == false){
            return this.setState({errors: "Porfavor ingresa una direccion de correo valida"})
            }else if (this.state.password == '' || this.state.password.length <6){
            return this.setState({errors: "Por favor ingresa una contraseña de al menos 6 caracteres"})
            }else if (this.state.userName == '') {
            return this.setState({errors:'Por favor ingrese un nombre de usuario valido'})
            }
        auth.createUserWithEmailAndPassword(email, pass)
        .then( response => {
            //Cuando firebase responde sin error
            console.log('Registrado ok', response);

             //Cambiar los estados a vacío como están al inicio.

            //Crear una colección Users
            db.collection('users').add({
                email: auth.currentUser.email,
                userName: userName,
                createdAt: Date.now(),
                miniBio: descripcion,
                fotoPerfil: fotoPerfil
            })

            .then( res => console.log(res))

        })
        .catch( error => {
            //Cuando Firebase responde con un error
            this.setState({
                errors: error.message
            })
            console.log(error);

        })
}

    onImageUpload(url){
        this.setState({fotoPerfil: url, camaraState: false})
    }
     
      render(){
        return(
            <>
            {this.state.camaraState
            ?
            <Camara onImageUpload={(url) => this.onImageUpload(url)} />    
        :
        <>      

    <View style={styles.formContainer}>
        <Text style={styles.title}>Registrate</Text>
              <TextInput
                  style={styles.input}
                  onChangeText={(text)=>this.setState({email: text})}
                  placeholder='email*'
                  keyboardType='email-address'
                  value={this.state.email}
                  />
              <TextInput
                  style={styles.input}
                  onChangeText={(text)=>this.setState({userName: text})}
                  placeholder='nombre de usuario*'
                  keyboardType='default'
                  value={this.state.userName}
                  />
              <TextInput
                  style={styles.input}
                  onChangeText={(text)=>this.setState({password: text})}
                  placeholder='contraseña*'
                  keyboardType='email-address'
                  secureTextEntry={true}
                  value={this.state.password}
              />
              <TextInput
                  style={styles.input}
                  onChangeText={(text)=>this.setState({miniBio: text})}
                  placeholder='descripcion'
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

              {
                this.state.email.length > 0 && this.state.password.length > 0 && this.state.userName.length > 0 ? 
                //agregar aca el register que siempre estaba hecho porque no hay errores
                <TouchableOpacity style={styles.button} onPress={()=>this.register(this.state.email, this.state.password, this.state.userName, this.state.miniBio, this.state.fotoPerfil)}>
                <Text style={styles.textButton}>Registrarse</Text>    
                </TouchableOpacity> : 
                <TouchableOpacity  onPress={()=> this.setState({errors: 'Por favor rellene los campos obligatorios'})}>  
                </TouchableOpacity>
                }

                {
                    this.state.errors.length > 0 ? 
                    <Text> {this.state.errors} </Text>
                    :
                    false
                }
              
              <TouchableOpacity onPress={ () => this.props.navigation.navigate('Login')}>
                 <Text style={styles.registerLink}>Ya tengo cuenta. Ingresa aquí</Text>
              </TouchableOpacity>
      </View> 
      </>
        }
          </>
        )  
    }
}

const styles = StyleSheet.create({
    formContainer: {
      paddingHorizontal: 10,
      marginTop: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: 'blue',
     
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
      button: {
        backgroundColor: 'blue',
        padding: 12,
        borderRadius: 6,
        alignItems: 'center',
      },
      textButton: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
      registerLink: {
        marginTop: 10,
        textAlign: 'center',
        color: 'blue',
        fontSize: 16,
      },
      containerErrors:{
        borderWidth: 1,
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.1)', // Fondo ligeramente rojo
        padding: 10,
        borderRadius: 6,
        marginTop: 10,
    },

    errorsMessage:{
        color: 'red',
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center"
    }
    });


export default Register;