import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import PostAvatar from "../components/PostAvatar";
import CommentsContainer from "../containers/CommentsContainer";
import PostTitleTags from "../components/PostTitleTags";
import { Video } from "expo-av";

class PostScreen extends Component {
  render() {
    const postProps = this.props.navigation.state.params.item;
    const { item } = this.props.navigation.state.params;
    console.log(postProps);
    return (
      <View>
        <View>
          <Video
            source={{
              uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
            }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            isLooping
            style={{ width: 300, height: 300 }}
          />
        </View>
        <View style={styles.red}>
          <View style={styles.postDetails}>
            <TouchableOpacity>
              <PostAvatar />
            </TouchableOpacity>
            <PostTitleTags title={item.title} tags={postProps.tags} />
          </View>
        </View>
        <CommentsContainer post={postProps} />
        <View style={{ marginTop: 100, marginRight: 20 }}></View>
        <Button
          type="outline"
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          title="Back To Results"
          onPress={() => props.navigation.goBack()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  postDetails: {
    margin: 7,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  red: {
    borderStyle: "solid",
    borderColor: "red",
    borderWidth: 5,
  },
});

export default PostScreen;
