import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../../screens/Login/Login';
import Home from '../../screens/Home/Home';
import Profile from '../../screens/Profile/Profile';
import Register from '../../screens/Register/Register';
import Comentarios from '../../screens/Comentarios/Comentarios';
import Buscador from '../../screens/Buscador/Buscador';
import FriendProfile from '../../screens/FriendProfile/FriendProfile';
const Stack = createNativeStackNavigator();

function Navigation(){
    return (
    
        <NavigationContainer style={styles.container}>
          <Stack.Navigator>
          <Stack.Screen name='Login' component={Login} options={ { headerShown: false } }/>
            <Stack.Screen name='Home' component={Home} options={ { headerShown: false } }/>
            <Stack.Screen name='Register' component={Register} options={ { headerShown: false } }/>
            <Stack.Screen name='Profile' component={Profile} options={ { headerShown: false } }/>
            <Stack.Screen name='FriendProfile' component={FriendProfile} options={ { headerShown: false } }/>
            <Stack.Screen name='Comentarios' component={Comentarios} options={ { headerShown: false } }/>
            <Stack.Screen name='Buscador' component={Buscador} options={ { headerShown: false } }/>
          </Stack.Navigator>
        </NavigationContainer>
  
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default Navigation;