import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { swithFollowers } from "../actions/postActions";

export default function UserInfoButton(props) {
  const dispatch = useDispatch();
  const followed = useSelector((state) => state.posts.user.followed);
  const followers = useSelector((state) => state.posts.user.followers);

  // const handleClick = () => {
  //   // console.log("followers was pressed");
  //   // dispatch(swithFollowers());
  //   props.howFollowersFunction();
  // };

  return (
    <TouchableOpacity
      style={styles.followersButton}
      onPress={props.handleClick}
    >
      <View style={styles.followText}>
        <Text style={styles.followText}>{props.title}</Text>
      </View>
      <View style={styles.followNumbers}>
        <Text style={styles.followNumbers}>{props.quantity}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  followButtons: {
    // flexDirection: 'column',
    // width: 10,
    flex: 9,
    flexDirection: "row",
    alignItems: "center",
    // margin: 2,
    // marginTop: 7,
    // borderStyle: 'solid',
    // borderColor: 'orange',
  },
  followText: {
    alignItems: "center",
    fontWeight: "300",
  },
  followNumbers: {
    alignItems: "center",
    fontWeight: "600",
  },
  followersButton: {
    flex: 3,
    // margin: 7,
    // borderStyle: 'solid',
    // borderColor: 'red',
    // borderWidth: 5,
    // borderRadius: 5,
  },
});
