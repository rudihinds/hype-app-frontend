import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UserProfileInfoBar from '../components/UserProfileInfoBar'
import UserBio from '../components/UserBio'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import Colors from '../constants/Colors'
import FollowButton from '../components/FollowButton'
import PostsList from '../components/PostsList'


export default class UserShowScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { username } = navigation.state.params.user

    return {
      headerLeft: () => (
        <HeaderButtons>
          <Item
            title='Back'
            onPress={() => navigation.goBack()}
            color={Colors.primary}
          />
        </HeaderButtons>
      ),
      headerTitle: () => (
        <HeaderButtons>
          <Item
            title={username}
          />
        </HeaderButtons>
      ),
      headerStyle: {
        backgroundColor: Colors.tertiary
      },
      headerTintColor: Colors.primary
    }
  }

  render() {
    const { user: {
      postAmount,
      followers, 
      following,
      userBio,
      firstName,
      lastName,
      iFollow
    } } = this.props.navigation.state.params

    return (
      <View style={styles.window}>
        <UserProfileInfoBar postAmount={postAmount} followers={followers} following={following} />
        <UserBio userBio={userBio} firstName={firstName} surname={lastName} />
        <FollowButton ifollow={iFollow}  />
        <PostsList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  window: {
    display: 'flex',
    // borderStyle: 'solid',
    // borderColor: 'red',
    // borderWidth: 5,
    // borderRadius: 5,
    padding: 5
  }
})
