import React, { PureComponent } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Button } from 'react-native-elements'
import Colors from '../constants/Colors'

const { winWidth } = Dimensions.get('window')

export default class followButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getCorrectButtonStyle = () => {
    const { ifollow } = this.props
    console.log(ifollow)

    if (ifollow) {
      return <Button buttonStyle={{ width: winWidth, margin: 7, backgroundColor: Colors.tertiary }}
        title='unfollow'
        color='grey'
      >
      </Button>
    } else {
      return <Button buttonStyle={{ width: winWidth, margin: 7, backgroundColor: Colors.primary }}
        title='follow'
        color={Colors.primary}
      >
      </Button>
    }
  }

  render() {
    // const button = this.props.
    return (
      <View>
        {this.getCorrectButtonStyle()}
      </View>
    );
  }
}
