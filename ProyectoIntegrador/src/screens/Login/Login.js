import react, { Component } from 'react';
import { auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, ActivityIndicator} from 'react-native';

class Login extends Component {
    constructor(){
        super()
        this.state={
            logState:false,
            email:'',
            password:'',
            errors: "",
        }
    }
    componentDidMount(){
        auth.onAuthStateChanged((user) => {
            if(user){
                this.props.navigation.navigate('Menu')
            } 
            this.setState({
                logState: true
            })
           
        })
    }
    login(email,pass){
        auth.signInWithEmailAndPassword(email, pass)
             .then( res => {
                 this.props.navigation.navigate("Menu")
    })
    .catch((error) => {
        if (error.code == 'auth/internal-error'){
          this.setState({
            errors: "Verifica tu contraseña"
          })
        }
        else {
        this.setState({
          errors: "El email ingresado no es correcto"
      })}
        console.log(error);
      });
         
    }
            render() {
                return (
                    <View style={styles.formContainer}>
                {this.state.logState == true ?
            <>
                      <Text style={styles.title}>Ingresa sesión</Text>
                      <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({ email: text })}
                        placeholder="email"
                        keyboardType="email-address"
                        value={this.state.email}
                      />


                      <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({ password: text })}
                        placeholder="password"
                        keyboardType="default"
                        secureTextEntry={true}
                        value={this.state.password} />

                {this.state.email.length > 0 && this.state.password.length > 0 ? 

                 <TouchableOpacity
                  style={styles.button}
                   onPress={() => this.login(this.state.email, this.state.password)}>
            <Text style={styles.textButton}>Ingresar</Text>
          </TouchableOpacity> :
        <TouchableOpacity style={styles.buttonError} onPress={()=> this.setState({errors: 'Por favor completa los campos requeridos'})}>
        <Text style={styles.textButton} > Login</Text>    
        </TouchableOpacity> }

        {this.state.errors.length > 0 ? <View style={styles.containerErrors}><Text style={styles.errorsMessage}> {this.state.errors} </Text></View> : false}



          <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
            <Text style={styles.registerLink}>¿No tenes cuenta? Registrate aca.</Text>
          </TouchableOpacity>
          </>
          :
                    <View>
 <ActivityIndicator  size='small' color='blue' />
                    </View>
        }
        </View>
           
        )
    }
}

const styles = StyleSheet.create({
    formContainer: {
      paddingHorizontal: 20,
      marginTop: 50,
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
      borderRadius: 8,
      marginBottom: 20,
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
      marginTop: 15,
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
export default Login;