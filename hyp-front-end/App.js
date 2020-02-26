import React from 'react';
import SearchScreen from './screens/SearchScreen'
import { View, StyleSheet } from 'react-native';
import HypeAppNavigator from './navigation/HypeAppNavigator'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import LoginScreen from './screens/LoginScreen'
import LoadingScreen from './screens/LoadingScreen'
import DashBoardScreen from './screens/DashBoardScreen'
import firebase from 'firebase'
import { firebaseConfig } from './config'

firebase.initializeApp(firebaseConfig)
export default class App extends React.Component {

  render() {
    return (
      // <View style={styles.container}>
      <AppNavigator />
      /* </View> */
    );
  }
}

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen,
  LoginScreen,
  DashBoardScreen,
  Dashboard: { screen: HypeAppNavigator }
})

const AppNavigator = createAppContainer(AppSwitchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
