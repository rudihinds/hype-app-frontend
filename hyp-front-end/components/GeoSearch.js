import React from "react";
import { View, Button, TextInput, StyleSheet, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { searchHandler, geoSearchHandler } from "../actions/postActions";
import API from "../adapters/API";

const GeoSearch = (props) => {
  const dispatch = useDispatch();
  const searchInput = useSelector((state) => state.posts.searchInput);
  const geoSearch = useSelector((state) => state.posts.geoSearchInput);

  const goToResulstsScreen = async () => {
    const location = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?&limit=1&q=${geoSearch}&key=ddc663a288db423297736765e742b5d0`
    ).then((res) => res.json());
    const locationLatLon = location.results[0].geometry;
    const posts = await API.getGeoSearchResults(searchInput, locationLatLon);
    await dispatch(searchResultsHandler(posts));
    await props.navigation.navigate("SearchResultsScreen");
  };

  return (
    <View>
      <TextInput
        style={styles.searchBar}
        onChangeText={(text) => dispatch(searchHandler(text))}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Near </Text>
      </View>
      <TextInput
        style={styles.searchBar}
        onChangeText={(text) => dispatch(geoSearchHandler(text))}
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

export default GeoSearch;

const styles = StyleSheet.create({
  searchBar: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 40,
    marginLeft: 40,
  },
  textContainer: {
    alignItems: "center",
  },
  text: {
    margin: 20,
  },
});
