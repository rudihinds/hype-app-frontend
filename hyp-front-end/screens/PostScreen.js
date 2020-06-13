import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, Dimensions } from 'react-native';
import { connect } from 'react-redux'
import { fetchPosts, createPost } from '../actions/postActions'
import Colors from '../constants/Colors'
import { ListItem, Card, Button, Icon } from 'react-native-elements'
import PostAvatar from '../components/PostAvatar'
import CommentInput from '../components/CommentInput'
import CommentsContainer from '../containers/CommentsContainer'
import PostTitleTags from '../components/PostTitleTags'
import { Video } from 'expo-av'
import VideoPlayer from 'expo-video-player'
import API from '../adapters/API'
import Comment from '../components/Comment'

// import AddCommentInput from '..components/AddCommentInput'


class PostScreen extends Component {
  // const postProps = props.navigation.state.params.item
  // const { item } = props.navigation.state.params
  // console.log(item)

  componentDidMount = () => {
    console.log('hi');
    // this.props.fetchPosts()
    this.props.createPost({ id: 2, post: 'hi im a post' })
    // console.log('posts in component: ', this.props.posts);
    // console.log('props: ', this.props);


  };
  render() {
    // console.log('props.posts: ', this.props.posts);
    // console.log(this.props.newPost)




    return (
      <View>
        <Text>{this.props.newPost.id}</Text>

      </View>
    )
  }

  // return (

  //   <View>
  //     {/* post video starts here */}
  //     <View>
  //       <VideoPlayer
  //         videoProps={{
  //           shouldPlay: true,
  //           resizeMode: Video.RESIZE_MODE_CONTAIN,
  //           source: {
  //             uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  //           },
  //         }}
  //         inFullscreen={true}
  //         showControlsOnLoad={true}
  //         showFullscreenButton={false}
  //         width={Dimensions.get('window').width}
  //         height={300}
  //       // inFullscreen={false}
  //       />
  //     </View>
  //     <View style={styles.red}>
  //       <View style={styles.postDetails}>
  //         <PostAvatar />
  //         <PostTitleTags title={item.title} tags={postProps.tags} />
  //       </View>
  //     </View>
  //     <CommentsContainer postId={postProps.id} />
  //     <View style={{ marginTop: 100, marginRight: 20 }} >
  //     </View>
  //     <Button
  //       type='outline'
  //       buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
  //       title='Back To Results'
  //       onPress={() => props.navigation.goBack()}
  //     />
  //   </View>
  // )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  postDetails: {
    margin: 7,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  red: {
    borderStyle: 'solid',
    borderColor: 'red',
    borderWidth: 5,
  },
})

PostScreen.navigationOptions = navigationData => {
  const item = navigationData.navigation.getParam('itemData')

  return {
    headerTitle: "post screen",
    headerStyle: {
      backgroundColor: Colors.tertiary
    },
    headerTintColor: Colors.primary,
  }
}

const mapStateToProps = state => ({
  posts: state.posts.items,
  newPost: state.posts.item

})

// const mapDispatchToProps = dispatch

export default connect(mapStateToProps, { fetchPosts, createPost })(PostScreen)

