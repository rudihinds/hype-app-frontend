import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Button } from "react-native-elements";
import PostAvatar from "../components/PostAvatar";
import CommentsContainer from "../containers/CommentsContainer";
import PostTitleTags from "../components/PostTitleTags";
import { useSelector } from "react-redux";
import { Video } from "expo-av";

export default function postScreen(props) {
  const post = useSelector((state) => state.posts.chosenPost);
  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <Video
          source={{
            // uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
            uri: "https://roris-test-bucket.s3.amazonaws.com/ac6c07g8h8.mp4",
          }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={styles.video}
        />
      </View>
      <View style={styles.postCardContainer}>
        <View style={styles.postDetails}>
          <TouchableOpacity>
            <PostAvatar img={post.user.img} />
          </TouchableOpacity>
          <PostTitleTags title={post.title} tags={post.tags} />
        </View>
      </View>
      <View style={styles.commentsContainer}>
        <CommentsContainer post={post} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoContainer: {
    flex: 4,
  },
  postCardContainer: {
    display: "flex",
    // borderStyle: "solid",
    // borderColor: "grey",
    // borderWidth: 1,
  },
  commentsContainer: {
    flex: 4,
  },
  postDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 4,
  },
  video: {
    flex: 1,
  },
});
