import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput
} from 'react-native';
import SearchField from '../components/SearchField'
import { Button as IconButton } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import Colors from '../constants/Colors'
import API from '../adapters/API';
// import VideoScreen from '../screens/VideoScreen'


export default function SearchScreen(props) {
  const [value, setChangeText] = React.useState('');

  // console.log(props.navigation)

  const getValue = text => console.log(text)

  const startCamera = () => {
    props.navigation.navigate('VideoScreen')
  }


searchHandler = () => {
  console.log(value)
  API.getPostSearchResults(value).then(posts => props.navigation.navigate('SearchResultsScreen', {posts}))

}


return (

    <View style={{ flex: 1 }}>
      <View style={styles.cameraButton}>
        <IconButton

          icon={<Icon
            name='camera'
            size={33}
            color={Colors.primary}
          />}
          type='clear'
          onPress={startCamera}
        />
      </View>
      <View style={styles.friendsButton}>
        <IconButton

          icon={<Icon
            name='heart'
            size={33}
            color={Colors.primary}
          />}
          type='clear'
          onPress={() => props.navigation.navigate('FindFriendsScreen')}
        />
      </View>
      <View style={styles.screen}>

        {/* <SearchField visible={isAddMode} getValue={getValue} /> */}
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => setChangeText(text)}
          value={value}
        />
         <Button 
          title={"Search"} 
          onPress={() => {
            if (value !== '')
            this.searchHandler()
              
          }
          } />
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 100
  },
  cameraButton: {
    height: 200,
    width: 77,
    padding: 10

  },
  friendsButton: {
    height: 200,
    width: 150,
    padding: 10

  }
})

