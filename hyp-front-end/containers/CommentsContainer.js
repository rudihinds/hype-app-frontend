import React from 'react';
import { View } from 'react-native';
import CommentInput from '../components/CommentInput'
import PostComments from '../components/PostComments'

const CommentsContainer = props => {

  // const postProps = props.navigation.state.params.item

  // useEffect(() => {
  //   const updateCommentsList = () => setCommentsList(postProps.comments)
  //   updateCommentsList()
  // }, [postProps.comments])

  return (
    <View>
      <CommentInput />
      <PostComments postId={props.postId} />
    </View>
  )
}

export default CommentsContainer