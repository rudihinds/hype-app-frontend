import React from "react";
import { View } from "react-native";
import CommentInput from "../components/CommentInput";
import PostComments from "../components/PostComments";

const CommentsContainer = (props) => {
  return (
    <View>
      <CommentInput post={props} />
      <PostComments post={props} />
    </View>
  );
};

export default CommentsContainer;
