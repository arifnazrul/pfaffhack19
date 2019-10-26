import React from 'react';
import {
  Icon,
  TopNavigation,
  TopNavigationAction,
} from 'react-native-ui-kitten';

const BackIcon = (style={}) => (
  <Icon {...style} name='arrow-back' />
);

const BackAction = () => (
  <TopNavigationAction icon={BackIcon}/>
);

export const TopNavigationContainer = () => (
  <TopNavigation
    title='Application Title'
  />
);