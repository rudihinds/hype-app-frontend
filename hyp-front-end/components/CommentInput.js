import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements'
import API from '../adapters/API'



const CommentInput = props => {

  const [value, setChangeText] = React.useState('');
  const [newComment, setNewComment] = React.useState('')
  const addComment = (comment) => {
    API.addNewComment(comment, props.id)
    setNewComment('')
  }

  const handleChangeText = text => {
    setChangeText(text)
  }

  return (
    <View style={{ margin: 7, flexDirection: 'row', justifyContent: 'space-between' }}>
      <TextInput
        style={{ borderRadius: 25, margin: 5, flex: 5, width: 140, height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => handleChangeText(text)}
        value={value}
        placeholder={'    Add a comment...'}
      ></TextInput>

      <View style={{ margin: 5, flex: 1 }}>
        <Button buttonStyle={{ backgroundColor: '#282B2F' }} title={"post"} onPress={() => {
          if (value !== '')
            addComment(value)
        }} />
      </View>
    </View>
  );
}

export default CommentInput
