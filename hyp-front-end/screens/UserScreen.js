import React, { Component, useEffect, useState } from "react";
import Colors from "../constants/Colors";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  ListItem,
  Card,
  Icon,
  Avatar,
  ButtonGroup,
  Button,
  ThemeProvider,
} from "react-native-elements";
import UserInfoButton from "../components/UserInfoButton";
import { FlatList } from "react-native-gesture-handler";
import API from "../adapters/API";
import { useSelector, useDispatch } from "react-redux";
import {
  showFollowers,
  showFollowed,
  searchResultsHandler,
  follow,
  unFollow,
} from "../actions/postActions";

export default function userScreen({ navigation }) {
  console.log(navigation.getParam("followers"));
  console.log("hello");
  const user = useSelector((state) => state.posts.user);
  const friendsDisplay = useSelector((state) => state.posts.friendsDisplay);
  const dispatch = useDispatch();

  const [tab, setTab] = useState("followers");

  useEffect(() => {
    console.log("use effect worked in findfriendsscreen");
    console.log(user);
  });

  const handleShowUser = async (user) => {
    // dispatch(showUser(user));
    const theUser = await API.getOneUser(user);
    navigation.push("UserScreen", theUser);
  };

  const handleFollowButtonClick = async (id) => {
    const followUser = await API.followUser(user._id, id);
    dispatch(follow(followUser));
    // await console.log(followUser);
  };

  const handleUnfollowButtonClick = async (id) => {
    const newUser = await API.unFollowUser(user._id, id);
    // console.log(unFollowUser);
    dispatch(unFollow(newUser));
    // if (unFollowUser.message === "ok") {
    //   dispatch(addFollowers(id));
    // }
    // await console.log(unFollowUser);
  };

  const showFollowersFunction = () => {
    console.log("hello");
    setTab("followers");
  };

  const showFollowedFunction = () => {
    console.log("ola");
    setTab("followed");
  };

  const showUsersPost = async () => {
    const posts = await API.getUsersPosts(navigation.getParam("_id"));
    await dispatch(searchResultsHandler(posts));
    await navigation.navigate("SearchResultsScreen");
  };

  const switchStatement = () => {
    switch (tab) {
      case "followers":
        return navigation.getParam("followers");
      case "followed":
        return navigation.getParam("followed");
    }
  };

  const followedOrNot = (item) => {
    console.log(item.followers);
    if (item.followers.includes(user._id)) {
      return (
        <Button
          title="unfollow"
          buttonStyle={styles.button}
          onPress={() => handleUnfollowButtonClick(item._id)}
        />
      );
    } else {
      return (
        <Button
          title="follow"
          buttonStyle={styles.button}
          onPress={() => handleFollowButtonClick(item._id)}
        />
      );
    }
  };

  return (
    <View style={styles.window}>
      <View style={styles.infoBar}>
        <View style={styles.avatar}>
          <Avatar
            source={{ uri: navigation.getParam("img") }}
            rounded
            size="large"
          />
        </View>
        <View style={styles.followButtons}>
          <UserInfoButton
            style={styles.followersButton}
            title={"Followers"}
            quantity={navigation.getParam("followers").length}
            handleClick={showFollowersFunction}
          />
          <UserInfoButton
            style={styles.followingButton}
            title={"Following"}
            quantity={navigation.getParam("followed").length}
            handleClick={showFollowedFunction}
          />
          <UserInfoButton
            style={styles.myPostsButton}
            title={"Posts"}
            quantity={navigation.getParam("followers").length}
            handleClick={showUsersPost}
          />
        </View>
      </View>
      <View>
        <FlatList
          keyExtractor={(item) => item._id}
          data={switchStatement()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleShowUser(item)}>
              <ListItem
                leftAvatar={{ source: { uri: item.img } }}
                bottomDivider
                title={item.name}
                // subtitle={item.firstName + " " + item.lastName}
                // subtitleStyle={{ color: Colors.tertiary }}
                rightElement={
                  followedOrNot(item)
                  // <Button
                  //   title="follow"
                  //   buttonStyle={styles.button}
                  //   onPress={() => this.handleFollowButtonClick(item)}
                  // />
                }
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoBar: {
    flexDirection: "row",
    // borderStyle: 'solid',
    // borderColor: 'blue',
    // borderWidth: 5,
    justifyContent: "space-between",
    margin: 3,
    marginTop: 7,
    // paddingTop: 7,
    // paddingLeft: 7
  },
  followButtons: {
    // flexDirection: 'column',
    // width: 10,
    flex: 9,
    flexDirection: "row",
    // margin: 2,
    // marginTop: 7,
    // borderStyle: 'solid',
    // borderColor: 'orange',
    alignItems: "center",
  },
  followText: {
    alignItems: "center",
    fontWeight: "300",
  },
  followNumbers: {
    alignItems: "center",
    fontWeight: "600",
  },
  inputBar: {
    // alignItems: 'flex-end'
    height: 40,
    borderStyle: "solid",
    borderColor: "darkgrey",
    borderWidth: 0.25,
    borderRadius: 10,
    backgroundColor: "lightgrey",
    marginTop: 1,
    marginBottom: 2,
    marginLeft: 5,
    marginRight: 5,
  },
  window: {
    display: "flex",
  },
  followersButton: {
    flex: 3,
    // margin: 7,
    // borderStyle: 'solid',
    // borderColor: 'red',
    // borderWidth: 5,
    // borderRadius: 5,
  },
  followingButton: {
    flex: 3,
    // margin: 7,
    // borderStyle: 'solid',
    // borderColor: 'red',
    // borderWidth: 5,
    // borderRadius: 5,
  },
  myPostsButton: {
    flex: 3,
    // margin: 7,
    // borderStyle: 'solid',
    // borderColor: 'red',
    // borderWidth: 5,
    // borderRadius: 5,
  },
  myPostsNumbers: {
    alignItems: "center",
    borderStyle: "solid",
    borderColor: "red",
    borderWidth: 5,
    borderRadius: 5,
  },
  avatar: {
    justifyContent: "center",
    marginLeft: 5,
  },
  button: {
    width: 110,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    paddingTop: 1,
    backgroundColor: Colors.primary,
  },
});
