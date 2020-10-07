import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SearchResultsScreen from "../screens/SearchResultsScreen";
import PostScreen from "../screens/PostScreen";
import SearchScreen from "../screens/SearchScreen";
import VideoScreen from "../screens/VideoScreen";
import SubmitPostScreen from "../screens/SubmitPostScreen";
import FindFriendsScreen from "../screens/FindFriendsScreen";
import UserScreen from "../screens/UserScreen";
import FriendSearchScreen from "../screens/FriendSearchScreen";

const HypeAppNavigator = createStackNavigator(
  {
    SearchScreen,
    SearchResultsScreen,
    PostScreen,
    VideoScreen,
    SubmitPostScreen,
    FindFriendsScreen: {
      screen: FindFriendsScreen,
      navigationOptions: {
        title: "MyScreen",
        // headerLeft: null,
      },
    },
    UserScreen,
    FriendSearchScreen,
  },
  {
    initialRouteName: "SearchScreen",
  }
);

export default createAppContainer(HypeAppNavigator);
