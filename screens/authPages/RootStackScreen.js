import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerShown= 'false'>
        <RootStack.Screen options={{headerShown: false}} name="SplashScreen" component={SplashScreen}/>
        <RootStack.Screen options={{headerShown: false}} name="SignInScreen" component={SignInScreen}/>
        <RootStack.Screen options={{headerShown: false}} name="SignUpScreen" component={SignUpScreen}/>
    </RootStack.Navigator>
);

export default RootStackScreen;