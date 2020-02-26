import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';
import Tags from "react-native-tags";
import { Icon } from 'react-native-elements';
import TagInput from 'react-native-tags-input';
import LocationPicker from '../components/LocationPicker'
import * as VideoThumbnails from 'expo-video-thumbnails'
import Colors from '../constants/Colors'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import API from '../adapters/API';



const mainColor = '#3ca897';


export default class SubmitPostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'yolo',
      caption: 'yolo2',
      latitude: null,
      longitude: null,
      tags: {
        tag: '',
        tagsArray: ['blood', 'floods', 'your', 'dungarees']
      },
      captures: {},
      preview: null,
      userId: 1,
      uri: ''
    };
  }

  static navigationOptions = ({ navigation }) => {
    const post = (navigation.getParam('state')) ? navigation.getParam('state') : {}
    const postFilled = obj => Object.values(obj).every(val => val !== "")
    const submitPost = navigation.getParam('submitHandler')
    return {
      headerRight: () => (
        <HeaderButtons>
          {postFilled(post) &&
            <Item
              title='Post'
              onPress={() => submitPost(post)}
              color={Colors.primary}
            />
          }
        </HeaderButtons>
      ),
      headerLeft: () => (
        <HeaderButtons>
          <Item
            title='Back'
            onPress={() => navigation.goBack()}
            color={Colors.primary}
          />
        </HeaderButtons>
      ),
      headerStyle: {
        backgroundColor: Colors.tertiary
      },
      headerTintColor: 'white'
    }
  }

  componentDidMount = () => {
    const { captures } = this.props.navigation.state.params

    if (captures.photoData) {
      this.setState({ uri: captures.photoData.uri })
    } else {
      this.setState({ uri: captures.videoData.uri })
    }

    this.setState({ captures })

    if (captures.type === "photo") {
      this.setState({ preview: captures.photoData })
    } else {
      this.generateThumbnail(captures.videoData.uri)
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState !== this.state) {
      // console.log(this.state)
      this.props.navigation.setParams({ state: this.state, submitHandler: this.submitHandler })

    }
  }

  generateThumbnail = async (uri) => {
    try {
      const preview = await VideoThumbnails.getThumbnailAsync(
        uri,
        { time: 1500 }
      )
      this.setState({ preview })
    } catch (e) {
      console.log('error: ', e)
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

  submitHandler = (post) => {
    let newPost = new FormData()
    let headers = new Headers()
    headers.append('Accept', 'application/json')
    // let uri = post.uri.replace("file://", "")
    let type = post.uri.split('.').pop()

    newPost.append('image', {
      uri: post.uri,
      name: post.title,
      type: `image/${type}`
    })

    newPost.append('title', post.title)
    newPost.append('description', post.caption)
    newPost.append('tags', JSON.stringify(post.tags.tagsArray))
    newPost.append('longitude', post.longitude)
    newPost.append('latitude', post.latitude)
    newPost.append('user_id', post.userId)

    let req = new Request('http://localhost:3000/posts', {
      method: 'POST',
      body: newPost,
      headers
    })

    fetch(req).then(res => res.json()).then(console.log)
  }

  grabCoords = (location) => {
    this.setState({ latitude: location.lat, longitude: location.lng })
  }


  render() {
    // console.log(this.state)
    const { title, tags, caption, location, preview } = this.state

    return (
      <ScrollView>
        <View style={styles.form}>
          <View style={[styles.formControl, styles.input, { flexDirection: 'row', flex: 6 }]} onSubmit={() => this.submitHandler()}>
            {preview && <View style={{ flex: 1 }}><Image style={{ height: 65, width: 65 }} source={{ uri: preview.uri }} /></View>}
            <View style={{ flex: 4 }}>
              <Text style={styles.label}>Title</Text>
              <TextInput
                // style={styles.input}
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
            </View>
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
    marginVertical: 8,
    color: 'grey',
    // textDecorationStyle: 'double'
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
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
