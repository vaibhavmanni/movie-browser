import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from "../screens/Home";
import Details from "../screens/Details";


const Stack = createStackNavigator()

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{gestureEnabled: true,}}>
        <Stack.Screen name='Home' component={Home} 
          options={{
          title: 'Movie Browser',
          headerStyle: {
            backgroundColor: '#1199ab',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center'
        }} 
        />
        <Stack.Screen name='Details' component={Details}
        options={{
          title: 'Details',
          headerStyle: {
            backgroundColor: '#1199ab',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center'
        }}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
