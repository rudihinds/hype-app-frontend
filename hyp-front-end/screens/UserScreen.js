import React, { useState } from "react";
import Colors from "../constants/Colors";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ListItem, Avatar, Button } from "react-native-elements";
import UserInfoButton from "../components/UserInfoButton";
import { FlatList } from "react-native-gesture-handler";
import API from "../adapters/API";
import { useSelector, useDispatch } from "react-redux";
import { searchResultsHandler } from "../actions/postActions";
import { follow, unFollow } from "../actions/userActions";

export default function userScreen({ navigation }) {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [tab, setTab] = useState("followers");

  const handleShowUser = async (user) => {
    const theUser = await API.getOneUser(user);
    navigation.push("UserScreen", theUser);
  };

  const handleFollowButtonClick = async (id) => {
    const followUser = await API.followUser(user._id, id);
    dispatch(follow(followUser));
  };

  const handleUnfollowButtonClick = async (id) => {
    const newUser = await API.unFollowUser(user._id, id);
    dispatch(unFollow(newUser));
  };

  const showFollowersFunction = () => {
    setTab("followers");
  };

  const showFollowedFunction = () => {
    setTab("followed");
  };

  const showUsersPost = async () => {
    const posts = await API.getUsersPosts(navigation.getParam("_id"));
    dispatch(searchResultsHandler(posts));
    navigation.navigate("SearchResultsScreen");
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
    if (item._id === user._id) return;
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
    <View style={styles.container}>
      <View style={styles.infoBarContainer}>
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
      <View style={styles.usersContainer}>
        <FlatList
          keyExtractor={(item) => item._id}
          data={switchStatement()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleShowUser(item)}>
              <ListItem
                leftAvatar={{ source: { uri: item.img } }}
                bottomDivider
                title={item.name}
                rightElement={followedOrNot(item)}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 3,
    marginTop: 7,
  },
  usersContainer: {
    flex: 1,
  },
  followButtons: {
    flex: 9,
    flexDirection: "row",
    alignItems: "center",
  },
  followingButton: {
    flex: 3,
  },
  myPostsButton: {
    flex: 3,
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
