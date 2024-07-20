import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import LoginScreen from './src/LoginScreen';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import ProfileScreen from './src/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <PaperProvider >
      <NavigationContainer>
      {/* <LoginScreen /> */}
      <Stack.Navigator headerMode="none">
        <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: true,
          headerTransparent: true,
          title: null,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: true,
          headerTransparent: true,
          title: null,
        }}
      />
    </Stack.Navigator>
      </NavigationContainer>
     
    </PaperProvider>
  );
};

export default App;
