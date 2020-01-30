import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem, Card, Icon, Avatar, ButtonGroup, Button } from 'react-native-elements'


export default class UserInfoButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      quantity: props.quantity
    };
  }

  handleClick = (e) => {
    //need to get the string which is title sent back to the page to use as static navigation options to render different lists
    //or, if we are on the Users Posts Show page, we can use it to make some logic which will take us to a different screen 
    //it is in props and state anyway.
    this.props.getSelectedList(this.state.title)
  }

  render() {
    const { title, quantity } = this.state
    return (
      <TouchableOpacity style={styles.followersButton} onPress={this.handleClick}>
        <View style={styles.followText}>
          <Text style={styles.followText}>{title}</Text>
        </View>
        <View style={styles.followNumbers}>
          <Text style={styles.followNumbers}>{quantity}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  followButtons: {
    // flexDirection: 'column',
    // width: 10,
    flex: 9,
    flexDirection: 'row',
    alignItems: 'center',
    // margin: 2,
    // marginTop: 7,
    // borderStyle: 'solid',
    // borderColor: 'orange',
  },
  followText: {
    alignItems: 'center',
    fontWeight: '300'
  },
  followNumbers: {
    alignItems: 'center',
    fontWeight: '600'
  },
  followersButton: {
    flex: 3,
    // margin: 7,
    // borderStyle: 'solid',
    // borderColor: 'red',
    // borderWidth: 5,
    // borderRadius: 5,
  },
})
