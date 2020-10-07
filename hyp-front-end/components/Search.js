import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Button, TextInput, StyleSheet } from "react-native";
import { searchHandler } from "../actions/postActions";
import { searchResultsHandler } from "../actions/postActions";
import API from "../adapters/API";

const Search = (props) => {
  const dispatch = useDispatch();
  const searchInput = useSelector((state) => state.posts.searchInput);

  const goToResulstsScreen = async () => {
    const posts = await API.getPostSearchResults(searchInput);
    await dispatch(searchResultsHandler(posts));
    await props.navigation.navigate("SearchResultsScreen");
  };

  return (
    <View>
      <TextInput
        style={styles.searchBar}
        onChangeText={(text) => dispatch(searchHandler(text))}
      />
      <Button
        title={"Search"}
        onPress={() => {
          if (searchInput !== "") goToResulstsScreen(searchInput);
        }}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchBar: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 40,
    marginLeft: 40,
  },
});
