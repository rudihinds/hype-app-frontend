import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import Colors from '../constants/Colors'
import { ListItem, Card, Button, Icon } from 'react-native-elements'
import PostAvatar from '../components/PostAvatar'
import CommentInput from '../components/CommentInput'
import CommentsContainer from '../containers/CommentsContainer'
import PostTitleTags from '../components/PostTitleTags'

import API from '../adapters/API'
import Comment from '../components/Comment'

// import AddCommentInput from '..components/AddCommentInput'


const PostScreen = props => {
  const postProps = props.navigation.state.params.item



  return (

    <View>
      {/* post video starts here */}
      <View>
        <Image source={{ uri: "https://picsum.photos/300" }} style={{
          width: '100%',
          height: 400,
          // borderBottomColor: 'black',

        }} />
      </View>
      <View style={styles.red}>
        <View style={styles.postDetails}>
          <PostAvatar />
          <PostTitleTags title={postProps.postTitle} tags={postProps.tags} />
        </View>
      </View>
      <CommentsContainer postId={postProps.id} />
      <View style={{ marginTop: 100, marginRight: 20 }} >
      </View>
      <Button
        type='outline'
        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
        title='Back To Results'
        onPress={() => props.navigation.goBack()}
      />
    </View>
  )
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
    headerTitle: "test",
    headerStyle: {
      backgroundColor: Colors.tertiary
    },
    headerTintColor: Colors.primary,
  }
}

export default PostScreen

