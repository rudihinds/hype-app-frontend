import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Button } from 'react-native';
import firebase from 'firebase'
import API from '../adapters/API'
import * as Google from 'expo-google-app-auth';
import { AsyncStorage } from 'react-native';

export default class LoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signingIn: false
    };
  }

  componentDidMount = () => {
    // this.checkIfLoggedIn()
    AsyncStorage.getItem('token').then(token => console.log('token from get async: ', token));
  };

  signInWithGoogleAsync = async () => {
    this.setState({ signingIn: true })
    try {
      const result = await Google.logInAsync({
        // behavior: 'web',
        iosClientId: '214206807961-mg9102p9h7l534sp78abfeft1gm4tpo0.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        // console.log(result.idToken);

        //send token from google signin to server to authenticate user and receive JWT token back to store for future reqs
        API.signInWithGoogle(result.idToken)
          .then(res => {
            // console.log(res.token);
            console.log('new token from google sign in: ', res.token);
            AsyncStorage.setItem('token', res.token)
            // console.log('response: ', res)
          })
          .then(() => this.props.navigation.navigate('PostScreen'))

      } else {
        console.log('hit couldnt login with google conditional');
        console.log('google.loginAsync didnt work, couldnt get google user obj');
        this.setState({ signingIn: false })
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true, e };
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.signingIn ?
          <ActivityIndicator size='large' />
          :
          <Button
            title='sign in with Google'
            onPress={() => this.signInWithGoogleAsync()}
          />
        }
        <Button
          title='get users'
          onPress={() => {
            API.getUsers().then(res => {
              console.log(res);
            })
          }}
        />
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