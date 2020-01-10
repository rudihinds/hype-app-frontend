import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-elements'



const PostAvatar = props => {

  return (
    <View style={{ flex: 1 }}>
      <Avatar
        rounded
        source={{ uri: 'https://i.pravatar.cc/' }}
        size='medium'
      />
    </View>
  );

}

export default PostAvatar


