import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UserProfileInfoBar from '../components/UserProfileInfoBar'
import UserBio from '../components/UserBio'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import Colors from '../constants/Colors'
import FollowButton from '../components/FollowButton'
import PostsList from '../components/PostsList'
import API from '../adapters/API';




export default class UserShowScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount = () => {
    API.getUsersPosts(1).then(posts => 
        this.setState({posts: posts})
      )
  }

  static navigationOptions = ({ navigation }) => {
    // console.log(navigation.state.params.user);
    
    // const username = navigation.state.params.user.username || 'Rudi'
const username = 'rudi'
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

  // render () {
  //   return (
  //     <View>
  //       <Text>h1</Text>
  //       {
  //         this.state.posts.map(post => <PostsList usersPosts={post} /> )
  //       }
  //     </View>
  //   )
  // }

  render() {
    // const { user: {
    //   postAmount,
    //   followers, 
    //   following,
    //   userBio,
    //   firstName,
    //   lastName,
    //   iFollow,
    //   usersPosts
    // } } = this.props.navigation.state.params

    return (
      <View style={styles.window}>
        {/* <UserProfileInfoBar postAmount={postAmount} followers={followers} following={following} />
        <UserBio userBio={userBio} firstName={firstName} surname={lastName} />
        <FollowButton ifollow={iFollow}  /> */}
        
        <PostsList usersPosts={this.state.posts} navigation={this.props.navigation}  />
        
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
