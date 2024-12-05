import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ResetPassword from './PassReset';
import Dashboard from './Dashboard';
import GraphPage from './GraphPage'; // Your Graph page component
import SettingsPage from './SettingsPage'; // Your Settings page component
import ProfilePage from './ProfilePage'; // Your Profile page component

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginForm}
          options={{ title: 'Sign In' }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{ title: 'Reset Password' }}
        />
        <Stack.Screen
            name="Signup"
            component={SignupForm}
            options={{ title: 'Sign Up'}}
        />
        <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{ title: 'Dashboard'}}
        />
        <Stack.Screen
         name="Graph" 
         component={GraphPage}
          options={{ title: 'Graph' }} />
        <Stack.Screen
         name="Settings" 
        component={SettingsPage}
         options={{ title: 'Settings' }} />
        <Stack.Screen 
        name="Profile" 
        component={ProfilePage} 
        options={{ title: 'Profile' }} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
