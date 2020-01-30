import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem, Card, Icon, Avatar, ButtonGroup, Button, ThemeProvider } from 'react-native-elements'
import Colors from '../constants/Colors'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import UserInfoButton from '../components/UserInfoButton';
import PostsLists from '../components/PostsList'
import { FlatList } from 'react-native-gesture-handler';
import { throwIfAudioIsDisabled } from 'expo-av/build/Audio/AudioAvailability';

export default class FindFriendsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      searchInput: '',
      selectedList: 'Find Friends',
      user: {
        username: 'rudihinds',
        followersAmount: 500,
        followingsAmount: 99,
        postsAmount: 25
      },
    };
  }

  static navigationOptions = ({ navigation }) => {
    // console.log("inside the navigation options header:", navigation.getParam('selectedList'))
    // const littleList = navigation.getParam('selectedList')
    // console.log(littleList)
    const selectedList = (navigation.getParam('selectedList')) ? navigation.getParam('selectedList') : "Find Friends"
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
            title={selectedList}
          />
        </HeaderButtons>
      ),
      headerStyle: {
        backgroundColor: Colors.tertiary
      },
      headerTintColor: 'white'
    }
  }

  componentDidMount = () => {
    // console.log(this.getSelectedList())
    this.props.navigation.setParams({ selectedList: this.state.selectedList })
    fetch('https://bbc9d876.ngrok.io/users').then(res => res.json()).then(userList => this.setState({ userList }))
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.selectedList !== this.state.selectedList) {
      // console.log(this._getSelectedList())
      this.props.navigation.setParams({ selectedList: this._getSelectedList() })
    }
  }

  checkEnter = (e) => {
    const { text } = e.nativeEvent
    console.log(text)
  }

  handleChangeText = searchInput => {
    this.setState({ searchInput })
  }

  _getSelectedList = () => {
    return this.state.selectedList
  }

  getSelectedList = (selectedList) => {
    const user = this.state.user
    if (selectedList !== 'Posts') {
      this.setState({ selectedList })
    } else {
      this.props.navigation.navigate('UserShowScreen', {
        user
      })
    }
  }

  handleFollowButtonClick = (id) => {
    console.log(id)
  }

  handleShowUser = (user) => {
    this.props.navigation.navigate('UserShowScreen', {
      user
    })
  }

  render() {
    const { user: { username, followersAmount, followingsAmount, postsAmount }, searchInput, userList, selectedList } = this.state
    return (
      <View style={styles.window}>
        <View style={styles.infoBar}>
          <View style={styles.avatar}>
            <Avatar source={{ uri: 'https://i.pravatar.cc/' }} rounded size='large' />
          </View>
          <View style={styles.followButtons}>
            <UserInfoButton style={styles.myPostsButton} title={'Posts'} quantity={postsAmount} getSelectedList={this.getSelectedList} />
            <UserInfoButton style={styles.followersButton} title={'Followers'} quantity={followersAmount} getSelectedList={this.getSelectedList} />
            <UserInfoButton style={styles.followingButton} title={'Following'} quantity={followingsAmount} getSelectedList={this.getSelectedList} />
          </View>
        </View>
        <View>
          <TextInput
            placeholder='   enter a username'
            onSubmitEditing={this.checkEnter}
            onChangeText={this.handleChangeText}
            style={styles.inputBar}
            returnKeyType='search'
          />
        </View>
        <View>
          <FlatList
            keyExtractor={item => item.userId.toString()}
            data={userList}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this.handleShowUser(item)}>
                <ListItem
                  leftAvatar={{ source: { uri: 'https://i.pravatar.cc/' } }}
                  bottomDivider
                  title={item.username}
                  subtitle={item.firstName + " " + item.lastName}
                  subtitleStyle={{ color: Colors.tertiary }}
                  rightElement={<Button
                    title="follow"
                    buttonStyle={styles.button}
                    onPress={() => this.handleFollowButtonClick(item)}
                  />}
                />
              </TouchableOpacity>
            )
            }
          />
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
    justifyContent: 'space-between',
    margin: 3,
    marginTop: 7,
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
