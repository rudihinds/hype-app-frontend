import React, { Component } from 'react';
import { View, ImageBackground, StyleSheet, Dimensions, Button } from 'react-native';
import { withNavigation } from 'react-navigation'
// import { Button } from 'react-native-elements'

const { width: winWidth, height: winHeight } = Dimensions.get('window')


function ImageStillScreen(props) {
  const { captures } = props

  // console.log(captures)

  return (
    <View>
      <ImageBackground
        style={styles.image}
        source={{ uri: captures['photoData']['uri'] }}
      >
        <Button

          style={[styles.nextButton, styles.red]}
          title={'next'}
          color={'white'}
          // size={15}
          // color='white'

          onPress={() => props.navigation.navigate('SubmitPostScreen',
            { captures }
          )}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  preview: {
    height: winHeight,
    width: winWidth,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  image: {
    width: winWidth,
    height: winHeight

  },
  video: {
    width: winWidth,
    height: winHeight
  },
  buttonStyle: {
    // flex:2,
    // height: winHeight
  },
  red: {
    justifyContent: 'flex-end'
  },
});

export default withNavigation(ImageStillScreen)