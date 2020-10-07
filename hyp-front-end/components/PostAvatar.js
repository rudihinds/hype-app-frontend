import React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";

const PostAvatar = (props) => {
  return (
    <View style={styles.avatar}>
      <Avatar rounded source={{ uri: props.img }} size="medium" />
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    marginRight: 10,
    flex: 1,
  },
});

export default PostAvatar;
