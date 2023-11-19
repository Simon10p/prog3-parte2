import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export default function App(){
  return(      
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
      <Stack.Screen name='Login' component={Login} options={ { headerShown: false } }/>
      <Stack.Screen name='Register' component={Register} options={ { headerShown: false } }/>
      <Stack.Screen name='Menu' component={Menu} options={ { headerShown: false } }/>
      <Stack.Screen name='Buscador' component={Buscador} options={ { headerShown: false } }/>
        <Stack.Screen name='Profile' component={Profile} options={ { headerShown: false } }/>
        <Stack.Screen name='FriendProfile' component={FriendProfile} options={ { headerShown: false } }/>
        <Stack.Screen name='Comentarios' component={Comentarios} options={ { headerShown: false } }/>
  
      </Stack.Navigator>
    </NavigationContainer>
  );
};

