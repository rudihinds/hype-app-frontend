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
      return <Button style={{ width: winWidth, margin: 7 }}
        title='unfollow'
        color='grey'
      >
      </Button>
    } else {
      return <Button style={{ width: winWidth }}
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
