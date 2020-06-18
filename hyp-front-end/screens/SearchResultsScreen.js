import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { ListItem, Card, Button, Icon, Avatar } from 'react-native-elements'
import Colors from '../constants/Colors'
import API from '../adapters/API'
import samplePosts from '../db/sampleComments'

const SearchResultsScreen = props => {
  // const [resultsList, setResultsList] = React.useState([]);
  // const [newComment, setNewComment] = React.useState("")

  useEffect(() => {
    const fetchComments = () => {
      //get posts will send a search term down in live version and return the posts for that search term
      //will receive props from wherever request is sent, ie string of search, can use this as my posts page
      // API.getPosts()
      //   .then(results => setResultsList(results))
      // setResultsList(props.navigation.state.params.posts)
    }
    fetchComments()
  }, [])

  // console.log(resultsList)

  return (
    
    <View>
      <FlatList
        keyExtractor={item => item.postBelongsTo}
        data={resultsList}
        renderItem={({ item }) => (

          <View>
            <TouchableOpacity onPress={() => props.navigation.navigate('PostScreen',
              { item }
            )} >
              <Image source={{ uri: item.video }}
                style={{
                  width: '100%',
                  height: 250,
                }} />
              <View style={{
                marginBottom: 7,
                marginTop: 7,
                flexDirection: 'row',
                justifyContent: 'space-around'
              }}>
                <View style={{ flex: 1 }}>
                  <Avatar rounded source={{ uri: item.user.image }} />
                </View>
                <View style={{ flex: 7 }}>
                  <Text style={{ flex: 1, flexDirection: 'column', marginBottom: 3 }}>{item.title}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )} />
      <Button
        type='outline'
        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
        title='Back To Search'
        onPress={() => props.navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
})

SearchResultsScreen.navigationOptions = {
  headerTitle: "Results",
  headerStyle: {
    backgroundColor: Colors.tertiary
  },
  headerTintColor: Colors.primary
}

export default SearchResultsScreen