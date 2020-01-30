import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UserInfoButton from './UserInfoButton';
import Colors from '../constants/Colors'
import { ListItem, Card, Icon, Avatar, ButtonGroup, Button } from 'react-native-elements'


export default class UserProfileInfoBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // user: props.user
    };
  }

  render() {
    const { postAmount, followers, following } = this.props

    return (

      <View style={styles.infoBar}>
        <View style={styles.avatar}>
          <Avatar
            source={{ uri: 'https://i.pravatar.cc/' }}
            rounded
            size='large'
          />
        </View>
        <View style={styles.followButtons}>
          <UserInfoButton style={styles.myPostsButton} title={'Posts'} quantity={postAmount} />
          <UserInfoButton style={styles.followersButton} title={'Followers'} quantity={followers} />
          <UserInfoButton style={styles.followingButton} title={'Following'} quantity={following} />
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  infoBar: {
    flexDirection: 'row',
    // borderStyle: 'solid',
    // borderColor: 'blue',
    // borderWidth: 5,
    // justifyContent: 'space-between',
    // margin: 5,
    // marginTop: 7,
    // paddingTop: 7,
    // paddingLeft: 7
  },
  followButtons: {
    // flexDirection: 'column',
    // width: 10,
    flex: 9,
    flexDirection: 'row',
    // margin: 2,
    // marginTop: 7,
    // borderStyle: 'solid',
    // borderColor: 'orange',
    alignItems: 'center'

  },
  followText: {
    alignItems: 'center',
    fontWeight: '300'

  },
  followNumbers: {
    alignItems: 'center',
    fontWeight: '600'

  },
  inputBar: {
    // alignItems: 'flex-end'
    height: 40,
    borderStyle: 'solid',
    borderColor: 'darkgrey',
    borderWidth: .25,
    borderRadius: 10,
    backgroundColor: 'lightgrey',
    marginTop: 1,
    marginBottom: 2,
    marginLeft: 5,
    marginRight: 5,

  },
  window: {
    display: 'flex',
    borderStyle: 'solid',
    borderColor: 'red',
    borderWidth: 5,
    borderRadius: 5,
    // padding:25
  },
  followersButton: {
    flex: 3,
    // margin: 7,
    // borderStyle: 'solid',
    // borderColor: 'red',
    // borderWidth: 5,
    // borderRadius: 5,
  },
  followingButton: {
    flex: 3,
    // margin: 7,
    // borderStyle: 'solid',
    // borderColor: 'red',
    // borderWidth: 5,
    // borderRadius: 5,
  },
  myPostsButton: {
    flex: 3,
    // margin: 7,
    // borderStyle: 'solid',
    // borderColor: 'red',
    // borderWidth: 5,
    // borderRadius: 5,
  },
  myPostsNumbers: {
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: 'red',
    borderWidth: 5,
    borderRadius: 5,
  },
  avatar: {
    justifyContent: 'center',
    marginLeft: 5

  },
  button: {
    width: 110,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    paddingTop: 1,
    backgroundColor: Colors.primary
  }

})