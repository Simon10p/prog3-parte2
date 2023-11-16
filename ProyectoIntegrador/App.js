import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Register from "./src/screens/Register/Register"
import Login from './src/screens/Login/Login';
import Home from './src/screens/Home/Home';
import Profile from './src/screens/Profile/Profile';
import FriendProfile from './src/screens/FriendProfile/FriendProfile'
import Menu from './src/components/Menu/Menu';

const Stack = createNativeStackNavigator();

export default function App() {


  return (
    
      <NavigationContainer style={styles.container}>
        <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} options={ { headerShown: false } }/>
          <Stack.Screen name='Home' component={Home} options={ { headerShown: false } }/>
          <Stack.Screen name='Register' component={Register} options={ { headerShown: false } }/>
          {/* <Stack.Screen
          name="Menu"
          component={Menu}
          options={{ headerShown: false }}
        /> */}
          <Stack.Screen name='Profile' component={Profile} options={ { headerShown: false } }/>
          <Stack.Screen name='FriendProfile' component={FriendProfile} options={ { headerShown: false } }/>
        </Stack.Navigator>
      </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
