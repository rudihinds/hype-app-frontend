import React from 'react';
import { View, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
const { width: winWidth } = Dimensions.get('window')


export default ({ captures = [] }) => (
  <ScrollView
    horizontal={true}
    style={[styles.bottomToolbar, styles.galleryContainer]}
  >
    {captures.map(({ uri }) => (
      <View style={styles.galleryImageContainer} key={uri}>
        <Image source={{ uri }} style={styles.galleryImage} />
      </View>
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  galleryContainer: {
    bottom: 100
  },
  bottomToolbar: {
    width: winWidth,
    position: 'absolute',
    height: 100,
    bottom: 0,
  },
  galleryImageContainer: {
    width: 75,
    height: 75,
    marginRight: 5
  },
  galleryImage: {
    width: 75,
    height: 75
  }
})