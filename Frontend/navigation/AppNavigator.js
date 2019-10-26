import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import QuestionScreen from '../screens/QuestionScreen';
import HomeScreen from '../screens/HomeScreen';

import MainTabNavigator from './MainTabNavigator';

export default createAppContainer(
  createStackNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Login: {screen: LoginScreen},
    Question: {screen: QuestionScreen},
    Home: {screen: HomeScreen},
  })
);
