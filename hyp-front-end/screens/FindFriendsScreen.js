import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ListItem, Avatar, Button } from "react-native-elements";
import Colors from "../constants/Colors";
import UserInfoButton from "../components/UserInfoButton";
import { FlatList } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import { searchResultsHandler } from "../actions/postActions";
import {
  follow,
  unFollow,
  showFollowers,
  showFollowed,
} from "../actions/userActions";
import API from "../adapters/API";

export default function FindFriendsScreen({ navigation }) {
  const followed = useSelector((state) => state.user.user.followed);
  const followers = useSelector((state) => state.user.user.followers);
  const user = useSelector((state) => state.user.user);
  const friendsDisplay = useSelector((state) => state.user.friendsDisplay);
  const dispatch = useDispatch();

  const handleShowUser = async (user) => {
    const theUser = await API.getOneUser(user);
    navigation.navigate("UserScreen", theUser);
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
    dispatch(showFollowers());
  };

  const showFollowedFunction = () => {
    dispatch(showFollowed());
  };

  const switchStatement = () => {
    switch (friendsDisplay) {
      case "followers":
        return followers;
      case "followed":
        return followed;
    }
  };

  const showUsersPost = async () => {
    const posts = await API.getUsersPosts(user._id);
    dispatch(searchResultsHandler(posts));
    navigation.navigate("SearchResultsScreen");
  };

  const followedOrNot = (item) => {
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
    <View style={styles.conatainer}>
      <View style={styles.infoBarContainer}>
        <View style={styles.avatar}>
          <Avatar source={{ uri: user.img }} rounded size="large" />
        </View>
        <View style={styles.followButtons}>
          <UserInfoButton
            style={styles.followersButton}
            title={"Followers"}
            quantity={followers.length}
            handleClick={showFollowersFunction}
          />
          <UserInfoButton
            style={styles.followingButton}
            title={"Following"}
            quantity={followed.length}
            handleClick={showFollowedFunction}
          />
          <UserInfoButton
            style={styles.myPostsButton}
            title={"Posts"}
            quantity={followers.length}
            handleClick={showUsersPost}
          />
        </View>
      </View>
      <View style={styles.FindFriendsButtonContaner}>
        <Button
          title="Find Friends"
          onPress={() => navigation.navigate("FriendSearchScreen")}
          buttonStyle={styles.FindFriendsButton}
        />
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
  conatainer: {
    flex: 1,
  },
  infoBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 3,
    marginTop: 7,
  },
  FindFriendsButtonContaner: {
    marginTop: 5,
    marginBottom: 5,
    alignItems: "center",
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
  FindFriendsButton: {
    width: 400,
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
