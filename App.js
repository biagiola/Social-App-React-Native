/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import Providers from './navigation/Index'

//const AppStack = createStackNavigator()

const App: () => React$Node = () => {
  return <Providers />
}

export default App