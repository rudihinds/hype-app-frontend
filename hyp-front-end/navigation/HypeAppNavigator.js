import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import SearchResultsScreen from '../screens/SearchResultsScreen'
import PostScreen from '../screens/PostScreen'
import SearchScreen from '../screens/SearchScreen'
import VideoScreen from '../screens/VideoScreen'
import SubmitPostScreen from '../screens/SubmitPostScreen'
import ImageStillScreen from '../screens/ImageStillScreen'
import FindFriendsScreen from '../screens/FindFriendsScreen'
import UserShowScreen from '../screens/UserShowScreen'


const HypeAppNavigator = createStackNavigator({
  SearchScreen,
  SearchResultsScreen,
  PostScreen,
  VideoScreen,
  SubmitPostScreen,
  ImageStillScreen,
  FindFriendsScreen,
  UserShowScreen,
},
  {
    initialRouteName: 'SearchScreen'
  })

export default createAppContainer(HypeAppNavigator)