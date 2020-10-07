import React from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import Comment from "../components/Comment";

const PostComments = (props) => {
  const comments = props.post.post.comments;
  return (
    <View style={styles.commentListContainer}>
      <FlatList
        style={styles.commentList}
        data={comments}
        keyExtractor={(comment) => comment._id}
        renderItem={({ item }) => (
          <Comment
            comment={item.text}
            title={item.text}
            id={item._id}
            belongsTo={item.user.name}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  commentListContainer: {},
  commentList: {
    marginTop: 10,
  },
});

export default PostComments;
