import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { Component } from "react";


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
                tabBarIcon: () => <Entypo name="home" size={24} color="black" />,
                headerShown: false }} 
            />

            <Tab.Screen
             name="Post" 
             component={PostForm} 
             options={{
                tabBarIcon: () => <Octicons name="diff-added" size={24} color="black" />,
                headerShown: false }} 
            />

            <Tab.Screen 
              name="Buscador" 
              component={Buscador} 
              options={
              {tabBarIcon: () => <FontAwesome name="search" size={24} color="black" />,
              headerShown: false }}
            />

            <Tab.Screen 
              name="Profile" 
              component={Profile}  
              options={
              {tabBarIcon: () => <Ionicons name="person" size={24} color="black" />,
              headerShown: false }}
            />

        </Tab.Navigator>
        )
    }
}

export default Menu;