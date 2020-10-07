import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { searchUsershandler, searchedUsers } from "../actions/userActions";
import { FlatList } from "react-native-gesture-handler";
import API from "../adapters/API";

export default function FriendSearchScreen({ navigation }) {
  const users = useSelector((state) => state.user.searchedUsers);
  const dispatch = useDispatch();
  const searchinput = useSelector((state) => state.user.searchUserInput);
  const user = useSelector((state) => state.user.user);

  const handleShowUser = async (user) => {
    const theUser = await API.getOneUser(user);
    navigation.navigate("UserScreen", theUser);
  };

  const handleFollowButtonClick = async (id) => {
    await API.followUser(user._id, id);
    const users = await API.findusers(searchinput);
    dispatch(searchedUsers(users));
  };

  const handleUnfollowButtonClick = async (id) => {
    await API.unFollowUser(user._id, id);
    const users = await API.findusers(searchinput);
    await dispatch(searchedUsers(users));
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

  const searchUsers = async () => {
    const users = await API.findusers(searchinput);
    dispatch(searchedUsers(users));
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchInputContainer}>
        <TextInput
          placeholder="   enter a username"
          onChangeText={(text) => dispatch(searchUsershandler(text))}
          style={styles.inputBar}
          returnKeyType="search"
        />
        <Button title="Search" onPress={searchUsers} />
      </View>
      <View>
        <FlatList
          keyExtractor={(item) => item._id}
          data={users}
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
  searchInputContainer: {
    marginTop: 20,
  },
  inputBar: {
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
});
