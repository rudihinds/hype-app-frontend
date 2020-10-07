import React, { useEffect, useState } from "react";
import { StyleSheet, View, Button, TextInput, Text } from "react-native";
import { Button as IconButton, ButtonGroup } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from "../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import API from "../adapters/API";
import { saveUser } from "../actions/userActions";
import Search from "../components/Search";
import GeoSearch from "../components/GeoSearch";

export default function SearchScreen(props) {
  const dispatch = useDispatch();
  const searchInput = useSelector((state) => state.posts.searchInput);
  const [selectedSearch, setSelectedSearch] = useState(0);
  const buttons = ["General Search", "Geo Search"];
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

  const switchToUser = () => {
    props.navigation.navigate("FindFriendsScreen");
  };

  const updateIndex = (selectedIndex) => {
    setSelectedSearch(selectedIndex);
  };

  const searchDisplay = () => {
    if (selectedSearch === 0) {
      return <Search navigation={props.navigation} />;
    }
    if (selectedSearch === 1) {
      return <GeoSearch />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconsContainer}>
        <View style={styles.iconRow}>
          <IconButton
            icon={<Icon name="camera" size={33} color={Colors.primary} />}
            type="clear"
            onPress={startCamera}
          />
          <IconButton
            icon={<Icon name="heart" size={33} color={Colors.primary} />}
            type="clear"
            onPress={switchToUser}
          />
        </View>
      </View>
      <View style={styles.searchOptions}>
        <ButtonGroup
          onPress={updateIndex}
          selectedIndex={selectedSearch}
          buttons={buttons}
          containerStyle={{ height: 30, width: 300 }}
        />
      </View>
      <View style={styles.searchContainer}>{searchDisplay()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flex: 1,
  },
  iconsContainer: {
    flex: 1,
  },
  iconRow: {
    flexDirection: "row",
  },
  searchOptions: {
    alignItems: "center",
  },
});
