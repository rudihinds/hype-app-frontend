import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Button, Avatar } from "react-native-elements";
import Colors from "../constants/Colors";
import API from "../adapters/API";
import { useSelector, useDispatch } from "react-redux";
import { searchResultsHandler } from "../actions/postActions";

const SearchResultsScreen = (props) => {
  // const searchInput = useSelector((state) => state.posts.searchInput);
  const searchResults = useSelector((state) => state.posts.searchedPosts);
  // const dispatch = useDispatch();
  console.log(props);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const posts = await API.getPostSearchResults(searchInput);
  //     dispatch(searchResultsHandler(posts));
  //   };
  //   fetchPosts();
  // });

  return (
    <View>
      <FlatList
        data={searchResults}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("PostScreen", { item })}
            >
              <Image
                source={{ uri: item.thumbnail }}
                style={{
                  width: "100%",
                  height: 250,
                }}
              />
              <View
                style={{
                  marginBottom: 7,
                  marginTop: 7,
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <View style={{ flex: 1 }}>
                  <Avatar rounded source={{ uri: item.user.img }} />
                </View>
                <View style={{ flex: 7 }}>
                  <Text
                    style={{
                      flex: 1,
                      flexDirection: "column",
                      marginBottom: 3,
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
      <Button
        type="outline"
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
        }}
        title="Back To Search"
        onPress={() => props.navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
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
