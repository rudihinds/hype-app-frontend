import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Avatar } from "react-native-elements";
import Colors from "../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import { storePost } from "../actions/postActions";

const SearchResultsScreen = (props) => {
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.posts.searchedPosts);

  const choosePost = async (post) => {
    dispatch(storePost(post));
    props.navigation.navigate("PostScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.postsContainer}>
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
              <TouchableOpacity onPress={() => choosePost(item)}>
                <View style={styles.postImageContainer}>
                  <Image
                    source={{ uri: item.thumbnail }}
                    style={styles.image}
                  />
                </View>
                <View style={styles.postCardContainer}>
                  <View style={styles.avatar}>
                    <Avatar rounded source={{ uri: item.user.img }} />
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionText}>{item.title}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  postsContainer: {
    flex: 1,
    marginBottom: 30,
  },
  postContainer: {
    flex: 1,
  },
  postImageContainer: {
    flex: 1,
  },
  postCardContainer: {
    flex: 1,
    marginBottom: 7,
    marginTop: 7,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  image: {
    width: "100%",
    height: 250,
  },
  avatar: {
    flex: 1,
  },
  descriptionContainer: {
    flex: 7,
  },
  descriptionText: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 3,
  },
});

SearchResultsScreen.navigationOptions = {
  headerTitle: "Results",
  headerStyle: {
    backgroundColor: Colors.tertiary,
  },
  headerTintColor: Colors.primary,
};

export default SearchResultsScreen;
