import React from 'react'

// напиши навигацию react-native-navigation версии 7 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import
 MaterialCommunityIcons
from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Alert, Text} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//import HomeScreen from './Screens/home';
import Screen from './Screens/screen2';
import Screen3 from './Screens/screen3';
import Products from './Screens/products'

import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}
        >
        <Stack.Screen
          name="Products"
          component={Products} />
        <Stack.Screen
          name="Details"
          component={Screen} />
      </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Settings"
        component={Screen} />
      <Stack.Screen
        name="Screen3"
        component={Screen3} />
    </Stack.Navigator>
  );
}

const Navigation = () => {
  return (
    <SafeAreaView style={{flex:1}}>
    <NavigationContainer>
    <Tab.Navigator
        initialRouteName="Feed"
        screenOptions={({ route }) => ({
          headerStyle: { backgroundColor: '#04283e' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'HomeStack') {
              iconName = focused
                ? 'home-circle'
                : 'home-circle-outline';
            } else if (route.name === 'SettingsStack') {
              iconName = focused
                ? 'account-settings'
                : 'account-settings-outline';
            }
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          }
        })}>
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            title: 'Home',
          }}  />
        <Tab.Screen
          name="SettingsStack"
          component={SettingsStack}
          options={{
            tabBarLabel: 'Settings',
            title: 'Setting'
          }} />
      </Tab.Navigator>

      {/* <Stack.Navigator>
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
          options={{
            //headerTitle: (props) => <Text>TITLE</Text>,
            headerStyle: {
              //textAlign: 'center', 
              backgroundColor: '#f4511e',
            },
            headerTitleStyle: {
              //textAlign: 'center', 
              fontWeight: 'bold',
              color: '#fff'
            },
            title: 'Overview',
            // headerLeft: () => (
            //   <Button
            //     onPress={() => alert('This is a button!')}
            //     title="Info"
            //     style={{flex:1}}
            //   />
            // ),
            // headerRight: () => (
            //   <Button
            //     onPress={() => Alert.alert('This is a button!', 'Description', [
            //       {
            //         text: 'CLICK',
            //         onPress: ()=> console.log('CLICK Pressed')
            //       },
            //       {
            //         text: 'CLICK2',
            //         onPress: ()=> console.log('CLICK2 Pressed')
            //       }
            //     ])}
            //     title="Info"
            //     style={{flex:1}}
            //   />
            // ),
          }}
        />
        <Stack.Screen 
          name="Screen" 
          component={Screen} 
          options={({route})=>{ 
           return { title: route?.params?.title }
          }}
        />
      </Stack.Navigator> */}
    </NavigationContainer>
    </SafeAreaView>
  );
};

// Экспортируем навигацию для использования в других компонентах
export default Navigation;



