import React from 'react';
import { View, Text, StyleSheet, Container } from 'react-native';


function UserBio(props) {
  return (
    // <View style={{ margin: 7, paddingLeft: 2 }}>
    <View style={styles.userBioContainer}>
      <Text style={{ fontWeight: 'bold' }}>{props.firstName} {props.surname}</Text>
      <Text>{props.userBio}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  userBioContainer: {
    margin: 6
    // borderStyle: 'solid',
    // borderColor: 'yellow',
    // borderWidth: 5,
  }
})

export default UserBio;