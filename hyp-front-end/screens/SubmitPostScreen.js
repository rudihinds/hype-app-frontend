import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';
import Tags from "react-native-tags";
import { Icon } from 'react-native-elements';
import TagInput from 'react-native-tags-input';
import LocationPicker from '../components/LocationPicker'
// import * as VideoThumbnails from 'expo-video-thumbnails';


const mainColor = '#3ca897';


export default class SubmitPostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      caption: '',
      location: {},
      tags: {
        tag: '',
        tagsArray: []
      },
      preview: null
    };
  }

  // its not accepting the URI as a valid format, we need the pure unsaved uri or video link etc, will be on video screen
  // i havent got the next process set up for video
  componentDidMount = () => {
    console.log(this.props.navigation.state.params.captures.photoData)
    const { uri } = this.props.navigation.state.params.captures.photoData
    this.generateThumbnail(this.props.navigation.state.params.captures.photoData.uri)


  };

  generateThumbnail = async (propsUri) => {
    try {
      console.log(propsUri)
      const { uri } = await VideoThumbnails.getThumbnailAsync(
        propsUri,
        {

        }
      )
      this.setState({ preview: uri })
    } catch (e) {
      console.log('this is the rassclart error: ', e)
    }
  }


  updateTagState = (state) => {
    this.setState({
      tags: state
    })
  };

  handleTitleChange = (value) => {
    this.setState({ title: value })
  }

  handleTagsChange = (value) => {
    this.setState({ tags: value })
  }

  handleCaptionChange = (value) => {
    this.setState({ caption: value })
  }

  submitHandler = () => {
    console.log("submitHandler hit")
  }

  grabCoords = (location) => {
    this.setState({ location })
  }


  render() {
    console.log(this.state)


    const { title, tags, caption, location } = this.state

    return (
      <ScrollView>

        <View style={styles.form}>
          <View style={styles.formControl}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={this.handleTitleChange}
              keyboardType="default"
              autoCapitalize="sentences"
              autoCorrect
              returnKeyType="next"
              onEndEditing={() => console.log('onEndEditing')}
              onSubmitEditing={() => console.log('onSubmitEditing')}
              required='true'
            />
            {/* {!formState.inputValidities.title && <Text>Please enter a valid title!</Text>} */}
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Write a caption...</Text>
            <TextInput
              style={styles.input}
              value={caption}
              onChangeText={this.handleCaptionChange}
              keyboardType="default"
              autoCapitalize="sentences"
              autoCorrect
              returnKeyType="next"
              required='true'

            />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Tags</Text>
            <View style={[styles.container, styles.input]}>
              <TagInput
                updateState={this.updateTagState}
                tags={this.state.tags}
                placeholder="add multiple tags with space key"


              />
            </View>
          </View>
          <View style={styles.label}>
            <LocationPicker grabCoords={this.grabCoords} />
          </View>
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  formControl: {
    width: '100%'
  },
  label: {
    // fontFamily: 'open-sans-bold',
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginTop: 8,
    borderRadius: 5,
    padding: 3,
  },
  tag: {
    backgroundColor: '#fff'
  },
  tagText: {
    color: mainColor
  },
});


{/* <View style={styles.container}>
              <TagInput
                updateState={this.updateTagState}
                tags={this.state.tags}
                placeholder="Tags..."
                label='Press comma & space to add a tag'
                labelStyle={{ color: '#fff' }}
                leftElement={<Icon name={'tag-multiple'} type={'material-community'} color={this.state.tagsText} />}
                leftElementContainerStyle={{ marginLeft: 3 }}
                containerStyle={{ width: (Dimensions.get('window').width - 40) }}
                inputContainerStyle={[styles.textInput, { backgroundColor: this.state.tagsColor }]}
                inputStyle={{ color: this.state.tagsText }}
                onFocus={() => this.setState({ tagsColor: '#fff', tagsText: mainColor })}
                onBlur={() => this.setState({ tagsColor: mainColor, tagsText: '#fff' })}
                autoCorrect={false}
                tagStyle={styles.tag}
                tagTextStyle={styles.tagText}
                keysForTag={', '} />
            </View> */}
