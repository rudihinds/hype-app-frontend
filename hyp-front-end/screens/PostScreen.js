import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Colors from '../constants/Colors'
import { ListItem, Card, Button, Icon, Avatar } from 'react-native-elements'


const PostScreen = props => {
  const item = props.navigation.getParam('itemData')
 
    return (

      <View>
          <View>
            <Image source={{uri: "https://picsum.photos/300"}} style={{
              width: '100%',
              height: '80%'
            }} />
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
          </View>

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
    alignItems: 'center'
  }
})

PostScreen.navigationOptions = navigationData => {
const item = navigationData.navigation.getParam('itemData')

  return {
    headerTitle: item.item,
    headerStyle: {
      backgroundColor: Colors.tertiary
    },
    headerTintColor: Colors.primary,
    // mode: 'modal'
  }

}

export default PostScreen

