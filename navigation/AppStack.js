import React from 'react'
import { View, Platform, KeyboardAvoidingView, Button } from 'react-native'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import HomeScreen from '../screens/HomeScreen'
import ChatScreen from '../screens/ChatScreen'
import ProfileScreen from '../screens/ProfileScreen'
import AddPostScreen from '../screens/AddPostScreen'
import MessagesScreen from '../screens/MessagesScreen'
import EditProfileScreen from '../screens/EditProfileScreen'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const FeedStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Social App"
      component={HomeScreen}
      options={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#2e64e5',
          fontFamily: 'Kufam-SemiBoldItalic',
          fontSize: 18,
        },
        headerStyle: {
          shadowColor: '#fff',
          elevation: 2,
        },
        headerRight: () => (
          <View style={{marginRight: 10}}>
            <FontAwesome5.Button
              style={{ paddingLeft: 15}}
              name="plus"
              size={22}
              backgroundColor="#fff"
              color="#2e64e5"
              onPress={() => navigation.navigate('AddPost')}
            />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="AddPost"
      component={AddPostScreen}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#2e64e515',
          shadowColor: '#2e64e515',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons 
              style={{paddingRight: 15}}
              name="arrow-back" 
              size={25} 
              color="#2e64e5" 
            />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="HomeProfile"
      component={ProfileScreen}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{ marginLeft: 15 }}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View> 
        ),
      }}
    />
  </Stack.Navigator>
);

const MessageStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={({route}) => ({
        title: route.params.userName,
        headerBackTitleVisible: false,
      })}
    />
  </Stack.Navigator>
);

const ProfileStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{
        headerTitle: 'Edit Profile',
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
  </Stack.Navigator>
);

const AppStack = () => {
  const getTabBarVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[routes.state.index].name
      : '';

    if (routeName === 'Chat') {
      return false;
    }
    return true;
  };

  const getHeaderTitle = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) 

      switch (routeName) {
        case 'Home':
          return 'Home :D';
        case 'Profile':
          return 'Profile :D';
        case 'Messages':
          return 'Messages :D';
      }
  }
        
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          marginVertical: 15
        },
        style: {
          paddingVertical: 20,
          height: 70
        },
        activeTintColor: '#2e64e5',
        
      }}>
      <Tab.Screen
        name="Home"
        component={FeedStack}
        options={({route}) => ({
          tabBarLabel: 'Home',
          // tabBarVisible: route.state && route.state.index === 0,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Messages"
        component={MessageStack}
        options={({route}) => ({
          headerTitle: getHeaderTitle(route),
          tabBarVisible: getHeaderTitle(route),
          // Or Hide tabbar when push!
          // https://github.com/react-navigation/react-navigation/issues/7677
          // tabBarVisible: route.state && route.state.index === 0,
          tabBarLabel: 'Messages',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="chatbox-ellipses-outline" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
