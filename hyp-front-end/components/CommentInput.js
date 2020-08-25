import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";
import { Button } from "react-native-elements";
import API from "../adapters/API";
import { useDispatch, useSelector } from "react-redux";
import { commentHandler } from "../actions/postActions";

const CommentInput = (props) => {
  console.log(props);
  const dispatch = useDispatch();
  const commentInput = useSelector((state) => state.posts.commentInput);
  const addComment = async () => {
    const comment = await API.addNewComment(commentInput, props.post.post._id);
    console.log(comment);
  };

  return (
    <View
      style={{
        margin: 7,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <TextInput
        style={{
          borderRadius: 25,
          margin: 5,
          flex: 5,
          width: 140,
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
        }}
        onChangeText={(text) => dispatch(commentHandler(text))}
        placeholder={"    Add a comment..."}
      ></TextInput>

      <View style={{ margin: 5, flex: 1 }}>
        <Button
          buttonStyle={{ backgroundColor: "#282B2F" }}
          title={"post"}
          onPress={() => {
            if (commentInput !== "") addComment();
          }}
        />
      </View>
    </View>
  );
};

export default CommentInput;
