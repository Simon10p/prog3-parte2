import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/screens/Login/Login';
import Profile from './src/screens/Profile/Profile'
import Register from './src/screens/Register/Register';
import Comentarios from './src/screens/Comentarios/Comentarios';
import Buscador from './src/screens/Buscador/Buscador';
import FriendProfile from './src/screens/FriendProfile/FriendProfile';
import Menu from './src/components/Menu/Menu'
import Home from './src/screens/Home/Home'

const Stack = createNativeStackNavigator();

export default function App(){
  return(  
    <NavigationContainer styles= {styles.container}>
      <Stack.Navigator>
      <Stack.Screen name='Login' component={Login} options={ { headerShown: false } }/>
      <Stack.Screen name='Register' component={Register} options={ { headerShown: false } }/>
      <Stack.Screen name='Menu' component={Menu} options={ { headerShown: false } }/>
      <Stack.Screen name='Buscador' component={Buscador} options={ { headerShown: false } }/>
      <Stack.Screen name='Profile' component={Profile} options={ { headerShown: false } }/>
      <Stack.Screen name='FriendProfile' component={FriendProfile} options={ { headerShown: false } }/>
      <Stack.Screen name='Comentarios' component={Comentarios} options={ { headerShown: false } }/>
      <Stack.Screen name='Home' component={Home} options={ { headerShown: false } }/>
      </Stack.Navigator>
    </NavigationContainer>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'

  }
})
