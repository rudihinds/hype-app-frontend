import React, { useEffect } from "react";
import { StyleSheet, View, Button, TextInput, Text } from "react-native";
import { Button as IconButton } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from "../constants/Colors";
import { searchHandler } from "../actions/postActions";
import { useDispatch, useSelector } from "react-redux";
import API from "../adapters/API";
import { saveUser, searchResultsHandler } from "../actions/postActions";

export default function SearchScreen(props) {
  const dispatch = useDispatch();
  const searchInput = useSelector((state) => state.posts.searchInput);
  useEffect(() => {
    const getLoggedUser = async () => {
      const user = await API.getCurrentUser(searchInput);
      dispatch(saveUser(user));
    };
    getLoggedUser();
  });

  const startCamera = () => {
    props.navigation.navigate("VideoScreen");
  };

  const goToResulstsScreen = async (input) => {
    const posts = await API.getPostSearchResults(searchInput);
    await dispatch(searchResultsHandler(posts));
    await props.navigation.navigate("SearchResultsScreen");
  };

  const switchToUser = () => {
    props.navigation.navigate("FindFriendsScreen");
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.cameraButton}>
        <IconButton
          icon={<Icon name="camera" size={33} color={Colors.primary} />}
          type="clear"
          onPress={startCamera}
        />
      </View>
      <View style={styles.friendsButton}>
        <IconButton
          icon={<Icon name="heart" size={33} color={Colors.primary} />}
          type="clear"
          onPress={switchToUser}
        />
      </View>
      <View style={styles.screen}>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(text) => dispatch(searchHandler(text))}
        />
        <Button
          title={"Search"}
          onPress={() => {
            if (searchInput !== "") goToResulstsScreen(searchInput);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 100,
  },
  cameraButton: {
    height: 200,
    width: 77,
    padding: 10,
  },
  friendsButton: {
    height: 200,
    width: 150,
    padding: 10,
  },
});
