import React from "react";
import { Text, View, StyleSheet } from "react-native";

function Comment(props) {
  return (
    <View style={style.commentBody}>
      <View>
        <Text style={style.nameText}>{props.comment}</Text>
        <Text style={style.commentText}>{props.belongsTo}</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  commentBody: {
    marginBottom: 3,
    backgroundColor: "#F5F5F5",
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
  },
  nameText: {
    fontStyle: "italic",
    fontWeight: "bold",
    paddingLeft: 5,
  },
  commentText: {
    paddingLeft: 5,
  },
});

export default Comment;
