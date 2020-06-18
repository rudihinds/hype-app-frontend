import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Image } from 'react-native';
import { ListItem, Card, Button, Icon, Avatar } from 'react-native-elements'
import { getAllPosts } from '../actions/postActions'
import Colors from '../constants/Colors'

class PostsWallScreen extends Component {


  componentDidMount = () => {
    /* 
    may need to change to will receive props or will mount.
    the wall will show whatever posts it receives, needs to have any action creators as props that it will use
    this will definitely include posts from your friends, or circle, or gneral, or new etc, may even be by category etc
    this build will just be for functionality, infinite scroll, pagination etc. will need to thingk about what is presented
    and in what order on the server side
    */
    console.log('cdm in posts wall hit');
    this.props.getAllPosts()
  };

  render() {
    console.log('render in posts wall');
    // const { }
    if (!this.props.allPosts.length) return <ActivityIndicator />
    return (
      // <View>
      <View>
        <FlatList
          keyExtractor={item => item._id}
          data={this.props.allPosts}
          renderItem={({ item }) => {
            const { _id, title, tags, video, user: { name } } = item
            const avatarUrl = 'https://robohash.org/'
            const randomImg = 'https://source.unsplash.com/random'
            return (
              <TouchableOpacity onPress={() => props.navigation.navigate('PostScreen',
                { item }
              )} >
                <Image source={{ uri: randomImg }}
                  style={{
                    width: '100%',
                    height: 250,
                  }} />
                <View style={{
                  marginBottom: 7,
                  marginTop: 7,
                  flexDirection: 'row',
                  justifyContent: 'space-around'
                }}>
                  <View style={{ flex: 1 }}>
                    <Avatar rounded source={{ uri: `${avatarUrl}/${_id}` }} />
                  </View>
                  <View style={{ flex: 7 }}>
                    <Text style={{ flex: 1, flexDirection: 'column', marginBottom: 3 }}>{title}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
})

PostsWallScreen.navigationOptions = {
  headerTitle: "Results",
  headerStyle: {
    backgroundColor: Colors.tertiary
  },
  headerTintColor: Colors.primary
}

const mapStateToProps = state => ({
  allPosts: state.posts.allPosts,
})

export default connect(mapStateToProps, { getAllPosts })(PostsWallScreen)