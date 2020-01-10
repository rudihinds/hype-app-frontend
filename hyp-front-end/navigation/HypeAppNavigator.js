import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import SearchResultsScreen from '../screens/SearchResultsScreen'
import PostScreen from '../screens/PostScreen'
import SearchScreen from '../screens/SearchScreen'
import VideoScreen from '../screens/VideoScreen'


const HypeAppNavigator = createStackNavigator({
  SearchScreen,
  SearchResultsScreen,
  PostScreen,
  VideoScreen
}, {
  // initialRouteName: 'SearchResultsScreen'
}

)

export default createAppContainer(HypeAppNavigator)