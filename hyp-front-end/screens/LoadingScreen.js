import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import firebase from 'firebase'
import API from '../adapters/API'
import HypeAppNavigator from '../navigation/HypeAppNavigator'


export default class LoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount = () => {
    this.checkIfLoggedIn()
  };

  checkIfLoggedIn = () => {
    firebase.auth().signOut()
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // user is logged in
        console.log('user is signed in');

        firebase.auth().currentUser.getIdToken(true)
          .then(token => API.setCurrentUser(token))
          .then((user) => {
            console.log('got the user from the back:');
            // debugger
            // console.log(user.user.uid, firebase.auth().currentUser.uid);
            if (user.user.uid == firebase.auth().currentUser.uid) {
              console.log('matched ids');
              this.props.navigation.navigate('Dashboard')

              // return <HypeAppNavigator />
              // this.props.navigation.navigate('SearchScreen')
            } else {
              console.log("couldnt match ids");
              Alert.alert('error: could not find user')
              firebase.auth().signOut()
              this.props.navigation.navigate('LoginScreen')
            }
          })
          .catch(error => {
            firebase.auth().signOut()
            this.props.navigation.navigate('LoginScreen')
            console.log('I caught an error instead of getting the id token from firebase verified on the backend', error)
            // console.log(firebase.auth().currentUser.getIdToken(true).then(console.log))
          })

        // Alert.alert("error: ", error)
      } else {
        // user is signed out
        console.log('user is signed out');

        this.props.navigation.navigate('LoginScreen')
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})