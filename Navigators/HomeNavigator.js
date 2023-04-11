import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../Screens/HomeScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import BankScreen from "../Screens/BankScreen";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function HomeNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#ADD8E6', }} >
        <Tab.Screen name="BankScreen" component={BankScreen}
            options={{
                tabBarLabel: 'Bank',
                tabBarIcon: ({ color }) => (
                    <FontAwesome name="bank" color={color} size={30} />
                ),
            }}
        />
        <Tab.Screen name="HomeScreen" component={HomeScreen} 
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                    <FontAwesome name="home" color={color} size={30} />
                ),
            }}
        />
        {/* <Tab.Screen name="Profile" component={ProfileScreen}
            options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color }) => (
                    <Ionicons name="person" color={color} size={30} />
                ),
            }}
        /> */}
    </Tab.Navigator>
  );
}
