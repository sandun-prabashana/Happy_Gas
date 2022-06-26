import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import ProfileScreen from './ProfileScreen';
import PickupScreen from './PickupScreen';
import DeliveryScreen from './DeliveryScreen';
import StatusScreen from './StatusScreen';

const ProfileStack = createStackNavigator();
const PickupStack = createStackNavigator();
const DeliveryStack = createStackNavigator();
const StatusStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="Profile"
      activeColor="#fff"
    >
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#27E311',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Pickup"
        component={PickupStackScreen}
        options={{
          tabBarLabel: 'Pickup',
          tabBarColor: '#2E2EFF',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-notifications" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Delivery"
        component={DeliverStackScreen}
        options={{
          tabBarLabel: 'Delivery',
          tabBarColor: '#694fad',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Status"
        component={StatusStackScreen}
        options={{
          tabBarLabel: 'Status',
          tabBarColor: '#d02860',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-aperture" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
);

export default MainTabScreen;

const ProfileStackScreen = ({navigation}) => (
<ProfileStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#27E311',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{
        title:'Profile',
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#27E311" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }} />
</ProfileStack.Navigator>
);

const PickupStackScreen = ({navigation}) => (
<PickupStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#1f65ff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <PickupStack.Screen name="Pickup" component={PickupScreen} options={{
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#1f65ff" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }} />
</PickupStack.Navigator>
);

const DeliverStackScreen = ({navigation}) => (
  <DeliveryStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#694fad',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <DeliveryStack.Screen name="Deliver" component={DeliveryScreen} options={{
          headerLeft: () => (
              <Icon.Button name="ios-menu" size={25} backgroundColor="#694fad" onPress={() => navigation.openDrawer()}></Icon.Button>
          )
          }} />
  </DeliveryStack.Navigator>
  );

  const StatusStackScreen = ({navigation}) => (
    <StatusStack.Navigator screenOptions={{
            headerStyle: {
            backgroundColor: '#d02860',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold'
            }
        }}>
            <StatusStack.Screen name="Status" component={StatusScreen} options={{
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#d02860" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
            }} />
    </StatusStack.Navigator>
    );
  