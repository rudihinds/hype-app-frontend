import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SearchResultsScreen from "../screens/SearchResultsScreen";
import PostScreen from "../screens/PostScreen";
import SearchScreen from "../screens/SearchScreen";
import VideoScreen from "../screens/VideoScreen";
import SubmitPostScreen from "../screens/SubmitPostScreen";
import ImageStillScreen from "../screens/ImageStillScreen";
import FindFriendsScreen from "../screens/FindFriendsScreen";
import UserShowScreen from "../screens/UserShowScreen";
import PostsWallScreen from "../screens/PostsWallScreen";
import UserScreen from "../screens/UserScreen";

const HypeAppNavigator = createStackNavigator(
  {
    SearchScreen,
    SearchResultsScreen,
    PostsWallScreen,
    PostScreen,
    VideoScreen,
    SubmitPostScreen,
    ImageStillScreen,
    FindFriendsScreen,
    UserShowScreen,
    UserScreen,
  },
  {
    initialRouteName: "SearchScreen",
  }
);

export default createAppContainer(HypeAppNavigator);
