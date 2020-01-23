import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import SearchResultsScreen from '../screens/SearchResultsScreen'
import PostScreen from '../screens/PostScreen'
import SearchScreen from '../screens/SearchScreen'
import VideoScreen from '../screens/VideoScreen'
import SubmitPostScreen from '../screens/SubmitPostScreen'
import ImageStillScreen from '../screens/ImageStillScreen'


const HypeAppNavigator = createStackNavigator({
  SearchScreen,
  SearchResultsScreen,
  PostScreen,
  VideoScreen,
  SubmitPostScreen,
  ImageStillScreen
}, {
  initialRouteName: 'SearchScreen'
}

)

export default createAppContainer(HypeAppNavigator)