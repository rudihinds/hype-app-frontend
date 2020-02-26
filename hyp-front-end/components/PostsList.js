import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Button } from 'react-native';
import API from '../adapters/API'
import { ListItem, Card, Icon, Avatar, ButtonGroup } from 'react-native-elements'


export default class PostsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  // componentDidMount = () => {
  //   //this posts list needs its own brain as it will be used by many features to render different lists, even
  //   //the fetch needs to be dynamic based on some url route passed down to hit
  //   API.getPosts()
  //     .then(posts => this.setState({ posts }))
  // };

  render() {
    const { usersPosts } = this.props
    // this.props.map(post => console.log(post))
    // this.props.usersPosts.map(post => console.log(post.video))

    // console.log(this.props)

    return (
      // <View>
      //   <FlatList
      //    keyExtractor={item => item.id.toString()}
      //    data={usersPosts}
      //    renderItem={({ item }) => (
      //      <View>
      //        <Text>
      //          hello
      //        </Text>
      //     </View>
      //    )}
      //   />
        
      <View>
         
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={usersPosts}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('PostScreen',
                {item}
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
                    <Avatar rounded source={{ uri: 'https://i.pravatar.cc/' }} />
                  </View>
                  <View style={{ flex: 7 }}>
                    <Text style={{ flex: 1, flexDirection: 'column', marginBottom: 3 }}>{item.title} |  {item.title}</Text>
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
}
