import React, { useEffect } from "react";
import { FlatList, SafeAreaView } from "react-native";
import API from "../adapters/API";
import Comment from "../components/Comment";

const PostComments = (props) => {
  const comments = props.post.post.comments;
  console.log(comments);
  return (
    <SafeAreaView>
      <FlatList
        style={{ backgroundColor: "black" }}
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
    </SafeAreaView>
  );
};

export default PostComments;
