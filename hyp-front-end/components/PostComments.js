import React, { useEffect } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import API from '../adapters/API'
import Comment from '../components/Comment'



const PostComments = props => {
  const postId = props.postId
  const [commentsList, setCommentsList] = React.useState([]);


  useEffect(() => {
    //this is not optimal, this will render every time. needs to only render when a new comment is posted, 
    //take data from comments container in parent, use useeffect to store in state here and set as dependency in this below.
    const updateCommentsList = () => {
      API.getPostData(postId)
        .then(post => setCommentsList(post.comments))
    }
    updateCommentsList()
  }, [])

  return (
    <SafeAreaView>
      <FlatList
        style={{ backgroundColor: 'black' }}
        data={commentsList}
        keyExtractor={comment => comment.commentBelongsTo}
        renderItem={({ item }) => <Comment comment={item.commentBody} title={item.commentTitle} id={item.id} belongsTo={item.commentBelongsTo} />}
      />

    </SafeAreaView>
  )

}

export default PostComments