import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

import Home from '../../screens/Home/Home';
import Profile from '../../screens/Profile/Profile';
import Buscador from '../../screens/Buscador/Buscador';
import PostForm from '../../screens/PostForm/PostForm';

const Tab = createBottomTabNavigator();

function TabNavigation(){
  return (
    <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>
        <Tab.Screen name="Home" component={Home} options = {{ headerShown: false ,
      tabBarIcon: () => <FontAwesome name='home' size={24} color='black'/> }}/> 
        <Tab.Screen name="Buscar" component={Buscador} options = {{  headerShown: false ,
      tabBarIcon: () => <FontAwesome name='search' size={24} /> }}/>
        <Tab.Screen name="Crear Post" component={PostForm} options = {{  headerShown: false ,
    tabBarIcon: () => <Octicons  name='diff-added' size={24} />}}/>
        <Tab.Screen name="Mi Perfil" component={Profile} options = {{  headerShown: false ,
    tabBarIcon: () => <FontAwesome name='user' size={24}/>
    }}/>
        
    </Tab.Navigator>
)
}
export default TabNavigation