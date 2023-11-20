import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Entypo from '@expo/vector-icons/Entypo'
import Home from "../../screens/Home/Home";
import PostForm from "../../screens/PostForm/PostForm";
import Profile from "../../screens/Profile/Profile";
import Buscador from "../../screens/Buscador/Buscador";


const Tab = createBottomTabNavigator()

class Menu extends Component {
    constructor() {
      super();
      this.state = {};
    }
    render(){
        return(
            <Tab.Navigator screenOptions = {{tabBarShowLabel:false}}>
            <Tab.Screen 
              name="Home" 
              component={Home} 
              options={{
                tabBarIcon: () => <Entypo name="home" size={25} color="black" />,
                headerShown: false }} 
            />

            <Tab.Screen
             name="Post" 
             component={PostForm} 
             options={{
                tabBarIcon: () => <MaterialIcons name="post-add" size={25} color="black" />,
                headerShown: false }} 
            />

            <Tab.Screen 
              name="Buscador" 
              component={Buscador} 
              options={
              {tabBarIcon: () => <MaterialIcons name="person-search" size={25} color="black" />,
              headerShown: false }}
            />

            <Tab.Screen 
              name="Profile" 
              component={Profile}  
              options={
              {tabBarIcon: () => <Entypo name="man" size={25} color="black" />,
              headerShown: false }}
            />

        </Tab.Navigator>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'blue',
   
  },
  profileLink: {
    fontSize: 16,
    color: 'blue',
    marginTop: 10,
   
  },
  logoutLink: {
      fontSize: 16,
      color: 'blue',
      marginTop: 10,
    },
  });

export default Menu;