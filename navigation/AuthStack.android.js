import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import SignupScreen from '../screens/SignupScreen'
import LoginScreen from '../screens/LoginScreen'
import OnBoardingScreen from '../screens/OnBoardingScreen'

import FontAwesome from 'react-native-vector-icons/FontAwesome'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

const Stack = createStackNavigator()

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null)
  let routeName;

  useEffect(() => {
     AsyncStorage.getItem('alreadyLaunched').then(value => {
       if(value == null) {
         AsyncStorage.setItem('alreadyLaunched', 'true')
         setIsFirstLaunch(true)
       } else {
         setIsFirstLaunch(false)
       }
     })

     GoogleSignin.configure({
      webClientId: '908610712913-i521o9n7mmjorpv665mnhau472e1blnv.apps.googleusercontent.com',
    })
  }, [])

  if( isFirstLaunch == null ) {
    return null
  } else if ( isFirstLaunch == true) {
    routeName = 'Onboarding'
  } else {
    routeName = 'Login'
  }

  return(
    <Stack.Navigator initialRouteName={routeName}>
      <Stack.Screen
        name='OnboardingScreen'
        component={OnBoardingScreen}
        options={{header: () => null}}
      />
      <Stack.Screen 
        name='Login' 
        component={LoginScreen} 
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={({navigation}) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#f9fafd',
            shadowColor: '#f9fafd',
            elevation: 0,
          },
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <FontAwesome.Button 
                name="arrow-left"
                size={18}
                backgroundColor="#f9fafd" 
                color="#616161"
                onPress={() => navigation.navigate('Login')}
              />
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  )
}

export default AuthStack
