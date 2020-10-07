import React, { Component, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import TagInput from "react-native-tags-input";
import LocationPicker from "../components/LocationPicker";
import * as VideoThumbnails from "expo-video-thumbnails";
import Colors from "../constants/Colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import API from "../adapters/API";
import AWS from "aws-sdk/dist/aws-sdk-react-native";
import { RNS3 } from "react-native-aws3";
import { Button } from "react-native-elements";
const s3 = new AWS.S3({
  accessKeyId: "AKIAIQOO3IV63XQLY5EA",
  secretAccessKey: "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",
});

// s3.listBuckets(function(err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Success", data.Buckets);
//   }
// });

export default function SubmitPostScreen(props) {
  const [state, updateState] = useState({
    title: "",
    caption: "",
    latitude: null,
    longitude: null,
    tags: {
      tag: "",
      tagsArray: [],
    },
    captures: {},
    preview: null,
    userId: 1,
    uri: "",
  });

  useEffect(() => {
    const { captures } = props.navigation.state.params;
    if (captures.photoData) {
      updateState({ ...state, uri: captures.photoData.uri });
    } else {
      updateState({ ...state, uri: captures.videoData.uri });
    }

    updateState({ captures });
    if (captures.type === "photo") {
      updateState({ ...state, preview: captures.photoData });
    } else {
      generateThumbnail(captures.videoData.uri);
    }
  }, []);

  generateThumbnail = async (uri) => {
    try {
      const preview = await VideoThumbnails.getThumbnailAsync(uri, {
        time: 1500,
      });
      updateState({ preview });
    } catch (e) {
      console.log("error: ", e);
    }
  };

  const updateTagState = (value) => {
    updateState({
      ...state,
      tags: value,
    });
  };

  const handleTitleChange = (value) => {
    updateState({ ...state, title: value });
    console.log(state);
  };

  const handleCaptionChange = (value) => {
    updateState({ ...state, caption: value });
    console.log(state);
  };

  const submitHandler = async (post) => {
    if (
      state.title !== "" &&
      state.caption !== "" &&
      state.tags.tagsArray.length !== 0
    ) {
      console.log(state);
      const photoOrVideoType = () => {
        if (props.navigation.state.params.captures.type === "photo")
          return ".jpeg";
        if (props.navigation.state.params.captures.type === "video")
          return ".mp4";
      };
      const photoOrVideoName = () => {
        if (props.navigation.state.params.captures.type === "photo")
          return "image/jpg";
        if (props.navigation.state.params.captures.type === "video")
          return "video";
      };
      const fileName =
        Math.random()
          .toString(18)
          .slice(3)
          .substr(0, 10) + photoOrVideoType();
      const file = {
        uri: post.uri,
        name: fileName,
        type: photoOrVideoName(),
      };
      const options = {
        bucket: "roris-test-bucket",
        region: "eu-west-2",
        accessKey: "AKIAIQOO3IV63XQLY5EA",
        secretKey: "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",
        successActionStatus: 201,
      };
      RNS3.put(file, options).then(async (response) => {
        if (response.status !== 201)
          throw new Error("Failed to upload image to S3");
        const savedPost = await API.createPost(
          state,
          response.body.postResponse.location,
          "5f1592e9760fe0473fec1fe0"
        );
        props.navigation.popToTop();
      });
    }
  };

  const grabCoords = (location) => {
    updateState({ ...state, latitude: location.lat, longitude: location.lng });
  };

  const { title, tags, caption, location, preview } = state;

  return (
    <ScrollView>
      <View style={styles.form}>
        <View
          style={[
            styles.formControl,
            styles.input,
            { flexDirection: "row", flex: 6 },
          ]}
          onSubmit={() => submitHandler()}
        >
          {preview && (
            <View style={{ flex: 1 }}>
              <Image
                style={{ height: 65, width: 65 }}
                source={{ uri: preview.uri }}
              />
            </View>
          )}
          <View style={{ flex: 4 }}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              value={state.title}
              onChangeText={handleTitleChange}
              keyboardType="default"
              autoCapitalize="sentences"
              autoCorrect
              returnKeyType="next"
              onEndEditing={() => console.log("onEndEditing")}
              onSubmitEditing={() => console.log("onSubmitEditing")}
              required="true"
            />
          </View>
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Write a caption...</Text>
          <TextInput
            style={styles.input}
            value={caption}
            onChangeText={handleCaptionChange}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            required="true"
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Tags</Text>
          <View style={[styles.container, styles.input]}>
            <TagInput
              updateState={updateTagState}
              tags={state.tags}
              placeholder="add multiple tags with space key"
            />
          </View>
        </View>
        <View style={styles.label}>
          <LocationPicker grabCoords={grabCoords} />
        </View>
        <View>
          <Button
            style={styles.button}
            title="Submit the  Post"
            onPress={submitHandler}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    marginVertical: 8,
    color: "grey",
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    marginTop: 8,
    borderRadius: 5,
    padding: 3,
  },
  tag: {
    backgroundColor: "#fff",
  },
  tagText: {
    color: "#3ca897",
  },
  button: {
    marginTop: 5,
    marginBottom: 5,
    alignItems: "center",
  },
});
