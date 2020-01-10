import React, { Component } from 'react';
import { View, Text } from 'react-native';

const PostTitleTags = props => {

  const { title, tags } = props

    return (
      <View style={{ flex: 5 }}>
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
          <Text >{title}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
          <Text>ePost tags</Text>
        </View>
      </View>
    );
  }

  export default PostTitleTags