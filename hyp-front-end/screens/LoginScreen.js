import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase'
import API from '../adapters/API';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // onSignIn = googleUser => {
  //   console.log('firebase current user: ', firebase.auth().currentUser);

  //   var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
  //     unsubscribe();
  //     // console.log('hello', googleUser, firebaseUser);
  //     // Check if we are already signed-in Firebase with the correct user.
  //     if (!this.isUserEqual(googleUser, firebaseUser)) {
  //       // Build Firebase credential with the Google ID token.
  //       var credential = firebase.auth.GoogleAuthProvider.credential(
  //         googleUser.idToken,
  //         googleUser.accessToken
  //       );
  //       console.log('credential?: ', credential);
  //       // Sign in with credential from the Google user.
  //       firebase.auth()
  //         .signInWithCredential(credential)
  //         .then(function (result) {
  //           console.log('user signed in with credential')
  //           if (result.additionalUserInfo.isNewUser) {
  //             firebase
  //               .database()
  //               .ref('/users/' + result.user.uid)
  //               .set({
  //                 gmail: result.user.email,
  //                 profile_picture: result.additionalUserInfo.profile.picture,
  //                 locale: result.additionalUserInfo.profile.locale,
  //                 first_name: result.additionalUserInfo.profile.given_name,
  //                 last_name: result.additionalUserInfo.profile.family_name,
  //                 created_at: Date.now()
  //               })
  //           } else {
  //             firebase
  //               .database()
  //               .ref('/users/' + result.user.uid).update({
  //                 last_logged_in: Date.now()
  //               })
  //           }

  //         })
  //         .catch(function (error) {
  //           // Handle Errors here.
  //           var errorCode = error.code;
  //           var errorMessage = error.message;
  //           // The email of the user's account used.
  //           var email = error.email;
  //           // The firebase.auth.AuthCredential type that was used.
  //           var credential = error.credential;
  //           // ...
  //         });
  //     } else {
  //       console.log('User already signed-in Firebase.');
  //     }
  //   }.bind(this)
  //   );
  // }

  // isUserEqual = (googleUser, firebaseUser) => {
  //   console.log("g: ", googleUser, "f: ", firebaseUser);

  //   if (firebaseUser) {
  //     var providerData = firebaseUser.providerData;
  //     for (var i = 0; i < providerData.length; i++) {
  //       if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
  //         providerData[i].uid === googleUser.getBasicProfile().getId()) {
  //         // We don't need to reauth the Firebase connection.
  //         return true;
  //       }
  //     }
  //   }
  //   return false;
  // }

  render() {
    return (
      <View style={styles.container}>
        <Button
          title='sign in with Google'
          onPress={() => this.signInWithGoogleAsync()} />
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