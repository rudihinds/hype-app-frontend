import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import API from "../adapters/API";
import { useDispatch, useSelector } from "react-redux";
import { commentHandler, storePost } from "../actions/postActions";

const CommentInput = (props) => {
  const dispatch = useDispatch();
  const commentInput = useSelector((state) => state.posts.commentInput);
  const userId = useSelector((state) => state.user.user._id);
  const addComment = async () => {
    const updatedPost = await API.addNewComment(
      commentInput,
      props.post.post._id,
      userId
    );
    dispatch(storePost(updatedPost));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => dispatch(commentHandler(text))}
          placeholder={"    Add a comment..."}
        ></TextInput>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          buttonStyle={styles.button}
          title={"post"}
          onPress={() => {
            if (commentInput !== "") addComment();
            // addComment();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 7,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputContainer: {
    flex: 5,
  },
  input: {
    flex: 5,
    borderRadius: 25,
    margin: 5,
    width: 300,
    height: 40,
    borderColor: "grey",
    borderWidth: 1,
  },
  buttonContainer: {
    margin: 5,
    flex: 1,
  },
  button: {
    backgroundColor: "#282B2F",
  },
});

export default CommentInput;
