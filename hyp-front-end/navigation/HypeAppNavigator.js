import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import SearchResultsScreen from '../screens/SearchResultsScreen'
import PostScreen from '../screens/PostScreen'
import SearchScreen from '../screens/SearchScreen'

const HypeAppNavigator = createStackNavigator({
  SearchScreen,
  SearchResultsScreen,
  PostScreen
}, {
  initialRouteName: 'SearchResultsScreen'
}

)

export default createAppContainer(HypeAppNavigator)