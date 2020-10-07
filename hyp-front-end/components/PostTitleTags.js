import React from "react";
import { View, Text } from "react-native";

const PostTitleTags = (props) => {
  const { title, tags } = props;
  return (
    <View style={{ flex: 5 }}>
      <View>
        <Text>{title} </Text>
      </View>
      <View>
        <Text>{tags}</Text>
      </View>
    </View>
  );
};

export default PostTitleTags;
