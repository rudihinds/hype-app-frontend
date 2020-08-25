// src/camera.page.js file
import React from "react";
import { View, Text } from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import { StyleSheet, Dimensions, Image, Button } from "react-native";
import Toolbar from "../components/toolbar.component";
import Gallery from "../components/gallery.component";
import { Video } from "expo-av";
import VideoPlayer from "expo-video-player";
import ImageStillScreen from "../screens/ImageStillScreen";
import * as VideoThumbnails from "expo-video-thumbnails";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Colors from "../constants/Colors";
// import { Header } from 'react-native/Libraries/NewAppScreen'

const { width: winWidth, height: winHeight } = Dimensions.get("window");

// import styles from './styles';

export default class VideoScreen extends React.Component {
  camera = null;

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: () => (
        <HeaderButtons>
          <Item
            title="Next"
            onPress={navigation.getParam("goToSubmitPostScreen")}
            color={Colors.primary}
          />
        </HeaderButtons>
      ),
      headerLeft: () => (
        <HeaderButtons>
          <Item
            title="Back"
            onPress={() => navigation.goBack()}
            color={Colors.primary}
          />
        </HeaderButtons>
      ),
      headerStyle: {
        backgroundColor: Colors.tertiary,
      },
      headerTintColor: "white",
    };
  };

  state = {
    captures: {},
    // setting flash to be turned off by default
    flashMode: Camera.Constants.FlashMode.off,
    capturing: null,
    // start the back camera by default
    cameraType: Camera.Constants.Type.back,
    hasCameraPermission: null,
  };

  async componentDidMount() {
    console.log(this.state);
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    const hasCameraPermission =
      camera.status === "granted" && audio.status === "granted";
    this.setState({ hasCameraPermission });

    this.props.navigation.setParams({
      goToSubmitPostScreen: this._goToSubmitPostScreen,
      captures: this.state.captures,
    });
  }

  componentWillUnmount() {
    console.log(this.state);
  }

  setFlashMode = (flashMode) => this.setState({ flashMode });

  setCameraType = (cameraType) => this.setState({ cameraType });

  handleCaptureIn = () => this.setState({ capturing: true });

  handleCaptureOut = () => {
    if (this.state.capturing) this.camera.stopRecording();
  };

  handleShortCapture = async () => {
    const photoData = await this.camera.takePictureAsync();
    this.setState({ capturing: false, captures: { type: "photo", photoData } });
  };

  handleLongCapture = async () => {
    const videoData = await this.camera.recordAsync();
    this.setState({ capturing: false, captures: { type: "video", videoData } });
  };

  _goToSubmitPostScreen = () => {
    const captures = this.state.captures;
    if (Object.entries(this.state.captures).length === 0) {
      return null;
    } else {
      this.props.navigation.navigate("SubmitPostScreen", { captures });
    }
  };

  render() {
    const {
      hasCameraPermission,
      flashMode,
      cameraType,
      capturing,
      captures,
    } = this.state;
    // console.log(captures);

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    }

    return (
      <React.Fragment>
        <View>
          <Camera
            type={cameraType}
            flashMode={flashMode}
            style={styles.preview}
            ref={(camera) => (this.camera = camera)}
          />
        </View>
        {captures.type === "video" && (
          //short fix: need a ratake button on the below video review screen to remount this component so can take pic of vid again
          //and one on image view screen
          //long fix: need MediaReviewScreen which contains either the video player or image still screen data to put in
          //navigation stack so BACK button can go back to this media capture screen (VideoScreen)

          <VideoPlayer
            videoProps={{
              shouldPlay: true,
              resizeMode: Video.RESIZE_MODE_CONTAIN,
              source: {
                uri: captures["videoData"]["uri"],
              },
            }}
            inFullscreen={true}
            showControlsOnLoad={true}
            showFullscreenButton={false}
            style={styles.video}
          />
        )}

        {captures.type === "photo" && <ImageStillScreen captures={captures} />}

        {Object.entries(captures).length === 0 && (
          <Toolbar
            capturing={capturing}
            flashMode={flashMode}
            cameraType={cameraType}
            setFlashMode={this.setFlashMode}
            setCameraType={this.setCameraType}
            onCaptureIn={this.handleCaptureIn}
            onCaptureOut={this.handleCaptureOut}
            onLongCapture={this.handleLongCapture}
            onShortCapture={this.handleShortCapture}
          />
        )}
      </React.Fragment>
    );
  }
}

// VideoScreen.navigationOptions = navigationData => {

//   console.log(navigationData.navigation)
//   return {
//     headerTitle: "New Post",
//     headerRight: (
//       <HeaderButtons>
//         <Item
//           title='Next'
//         // onPress={}
//         />
//       </HeaderButtons>
//     ),
//     headerLeft: (
//       <HeaderButtons>
//         <Item
//           title='Back'
//           onPress={() => navigationData.navigation.goBack()}
//         />
//       </HeaderButtons>
//     )
//   }
// }

const styles = StyleSheet.create({
  preview: {
    height: winHeight,
    width: winWidth,
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  image: {
    width: winWidth,
    height: winHeight,
  },
  video: {
    width: winWidth,
    height: winHeight,
  },
  nextButton: {
    flexDirection: "row-reverse",
  },
});
