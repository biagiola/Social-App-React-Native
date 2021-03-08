/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import Providers from './navigation/Index'
// this is for the extra padding top generated for SafeViewAre Iphone X
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App: () => React$Node = () => {
  return (
    <SafeAreaProvider>
      <Providers />
    </SafeAreaProvider>
  )
}

export default App