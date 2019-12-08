import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ListItem, Card, Button, Icon, Avatar } from 'react-native-elements'
import Colors from '../constants/Colors'



const SearchResultsScreen = props => {
  const [resultsList, setResultsList] = React.useState([
    'yellow',
    'blue',
    'green',
    'red',
    'orange',
    'indigo',
    'violet',
    'ben sherman'
  ]);

 
    return (
      <View>
    <FlatList keyExtractor={item => item} data={resultsList} renderItem={itemData => (
        <TouchableOpacity onPress={() => props.navigation.navigate('PostScreen', {
          // send down data as key value pairs from the individual post data ie in itemData, might just send down the lot...
          itemData
        })}>
          <Card
            title={itemData.item}
            // image={require('../img/fuckSake.jpg')}
            image={{uri: 'https://picsum.photos/300'}}

          >
            <View style={{marginBottom: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
              <View style={{flex: 1}}>
                <Avatar
                  rounded
                  source={{uri:'https://i.pravatar.cc/'}}
                />
              </View>
              <View style={{flex: 7}}>
                <Text style={{flex: 1, flexDirection: 'column'}}>Title</Text>
                <Text style={{flex: 1, flexDirection: 'column'}}>Tags</Text>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
        )}/>

        <Button
              type='outline'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
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