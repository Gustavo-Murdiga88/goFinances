import React from 'react'
import { ThemeProvider } from 'styled-components'
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'
import { StatusBar } from 'react-native'

import theme from './src/global/styles/theme'
import { Register } from './src/screens/Register'
import { Dashboard } from './src/screens/Dashbaord'

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor={theme.colors.primary}
      />
      <Dashboard />
    </ThemeProvider>
  )
}
