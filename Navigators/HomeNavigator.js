import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../Screens/HomeScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import BankScreen from "../Screens/BankScreen";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function HomeNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#ADD8E6', }} >
        <Tab.Screen name="HomeScreen" component={HomeScreen} 
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="home" color={color} size={size} />
                ),
            }}
        />
        <Tab.Screen name="BankScreen" component={BankScreen}
            options={{
                tabBarLabel: 'Bank',
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="bank" color={color} size={size} />
                ),
            }}
        />
        <Tab.Screen name="Profile" component={ProfileScreen}
            options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="account-circle" color={color} size={size} />
                ),
            }}
        />
    </Tab.Navigator>
  );
}
