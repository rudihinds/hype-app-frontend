import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Colors from '../constants/Colors'
import { ListItem, Card, Button, Icon, Avatar } from 'react-native-elements'
// import Comments from '../components/Comments'
// import { ScrollView } from 'react-native-gesture-handler';
// import sampleComments from '../db/sampleComments'
import styles from "../stylesheets/CommentsStyles";
import Comment from "../components/Comment";
import Comments from "react-native-comments";
import * as commentActions from "../helpers/ExampleActions";
import moment from "moment";


export default class PostScreenCopy extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.actions = commentActions;
    this.state = {
      comments: [],
      loadingComments: true,
      lastCommentUpdate: null,
      review: props.review ? props.review : null,
      login: null,
      id: props.id
    };
    this.scrollIndex = 0;
  }

  static navigatorStyle = {};

  componentWillMount() {
    const c = this.actions.getComments();
    console.log(c)
    this.setState({
      comments: c,
      loadingComments: false,
      lastCommentUpdate: new Date().getTime()
    });
  }

  extractUsername(c) {
    try {
      return c.email !== "" ? c.email : null;
    } catch (e) {
      console.log(e);
    }
  }

  extractBody(c) {
    try {
      return c.body && c.body !== "" ? c.body : null;
    } catch (e) {
      console.log(e);
    }
  }

  extractImage(c) {
    try {
      return c.image_id && c.user.image_id !== "" ? c.user.image_id : "";
    } catch (e) {
      console.log(e);
    }
  }

  extractChildrenCount(c) {
    try {
      return c.childrenCount || 0;
    } catch (e) {
      console.log(e);
    }
  }

  extractEditTime(item) {
    try {
      return item.updated_at;
    } catch (e) {
      console.log(e);
    }
  }

  extractCreatedTime(item) {
    try {
      return item.created_at;
    } catch (e) {
      console.log(e);
    }
  }

  likeExtractor(item) {
    return item.liked;
  }

  reportedExtractor(item) {
    return item.reported;
  }

  likesExtractor(item) {
    return item.likes.map(like => {
      return {
        image: like.image,
        name: like.username,
        user_id: like.user_id,
        tap: username => {
          console.log("Taped: " + username);
        }
      };
    });
  }

  isCommentChild(item) {
    return item.parentId !== null;
  }

  render() {
    const review = this.state.review;
    const data = this.state.comments;
    //  const item = props.navigation.getParam('itemData')

    return (

      /*
       * They should add scroll to end on save action
       *They should not update comments if there are modals opened
       *
       * */
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="always"
        onScroll={event => {
          this.scrollIndex = event.nativeEvent.contentOffset.y;
        }}
        ref={"scrollView"}
        scrollEventThrottle={16}
      >
        <Image
          style={{ height: 200 }}
          source={{
            uri:
              "https://pbs.twimg.com/profile_images/447374371917922304/P4BzupWu_400x400.jpeg"
          }}
        />

        {/* {this.state.comments.length ? this.state.comments.map(data => ( */}
        {this.state.comments.length ? (

     
          <Comment
            data={data}
            //To compare is user the owner
            viewingUserName={"Pearline@veda.ca"}
            // is the current user an admin
            userIsAdmin={true}
            // Styles to pass. Search for getStyles to find out what can be overwritten
            styles={{}}
            //how many comments to display on init
            initialDisplayCount={5}
            //How many minutes to pass before locking for editing
            editMinuteLimit={0}
            //What happens when user taps on username or photo
            usernameTapAction={username => {
              console.log("Taped user: " + username);
            }}
            //Where can we find the children within item.
            //Children must be prepared before for pagination sake
            childPropName={"children"}
            isChild={item => this.isCommentChild(item)}
            //We use this for key prop on flat list (i.e. its comment_id)
            keyExtractor={item => item.commentId}
            //Extract the key indicating comments parent
            parentIdExtractor={item => item.parentId}
            //what prop holds the comment owners username
            usernameExtractor={item => this.extractUsername(item)}
            //when was the comment last time edited
            editTimeExtractor={item => this.extractEditTime(item)}
            //When was the comment created
            createdTimeExtractor={item => this.extractCreatedTime(item)}
            //where is the body
            bodyExtractor={item => this.extractBody(item)}
            //where is the user image
            imageExtractor={item => this.extractImage(item)}
            //Where to look to see if user liked comment
            likeExtractor={item => this.likeExtractor(item)}
            //Where to look to see if user reported comment
            reportedExtractor={item => this.reportedExtractor(item)}
            //Where to find array with user likes
            likesExtractor={item => this.likesExtractor(item)}
            //Where to get nr of replies
            childrenCountExtractor={item => this.extractChildrenCount(item)}
            //what to do when user clicks reply. Usually its header height + position (b/c scroll list heights are relative)
            replyAction={offset => {
              this.refs.scrollView.scrollTo({
                x: null,
                y: this.scrollIndex + offset - 300,
                animated: true
              });
            }}
            //what to do when user clicks submits edited comment
            saveAction={(text, parentCommentId) => {
              let date = moment().format("YYYY-MM-DD H:mm:ss");
              let comments = this.actions.save(
                this.state.comments,
                text,
                parentCommentId,
                date,
                "testUser"
              );
              this.setState({
                comments: comments
              });

              if (!parentCommentId) {
                this.refs.scrollView.scrollToEnd();
              }
            }}
            //what to do when user clicks submits edited comment
            editAction={(text, comment) => {
              let comments = this.actions.edit(
                this.state.comments,
                comment,
                text
              );
              this.setState({
                comments: comments
              });
            }}
            //what to do when user clicks report submit
            reportAction={comment => {
              let comments = this.actions.report(this.state.comments, comment);
              this.setState({
                comments: comments
              });
            }}
            //what to do when user clicks like
            likeAction={comment => {
              let comments = this.actions.like(this.state.comments, comment);
              this.setState({
                comments: comments
              });
            }}
            //what to do when user clicks like
            deleteAction={comment => {
              let comments = this.actions.deleteComment(
                this.state.comments,
                comment
              );
              this.setState({
                comments: comments
              });
            }}
            //Must return promise
            paginateAction={(from_comment_id, direction, parent_comment_id) => {
              //Must return array of new comments after pagination

              let newComments = this.actions.paginateComments(
                this.state.comments,
                from_comment_id,
                direction,
                parent_comment_id
              );

              this.setState({
                comments: newComments
              });
              let self = this;
              setTimeout(function() {
                if (direction == "up") {
                  self.refs.scrollView.scrollTo({
                    x: 0,
                    y: 500,
                    animated: true
                  });
                } else {
                  self.refs.scrollView.scrollTo({ x: 0, y: 0, animated: true });
                }
              }, 3000);
            }}
          />
        ) : null}
      </ScrollView>
    );
  }
}

      // <View>
          {/* <View>
            <Image source={{uri: "https://picsum.photos/300"}} style={{
              width: '100%',
              height: '80%'
            }} />
            <View style={{margin: 7, flexDirection: 'row', justifyContent: 'space-around'}}>
              <View style={{flex: 1}}>
                <Avatar
                  rounded
                  source={{uri:'https://i.pravatar.cc/'}}
                  size='medium'
                />
              </View>
              <View style={{flex: 5}}>
               <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-end'}}><Text >Title</Text></View> 
               <View style={{flex: 1, flexDirection: 'column' , justifyContent: 'flex-start'}}><Text>Tags</Text></View>
              </View>
            </View>
          </View> */}
          {/* <View style={{marginTop: 100, marginRight: 20}} >
        <Comments likesNr={6} data={samplComments} />
        </View> */}

        {/* <Button
              type='outline'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              title='Back To Results' 
              onPress={() => props.navigation.goBack()}
        /> */}
      
      // </View>
      // </ScrollView>
    // ); 
// }

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// })

// PostScreenCopy.navigationOptions = navigationData => {
// const item = navigationData.navigation.getParam('itemData')

//   return {
//     headerTitle: item.item,
//     headerStyle: {
//       backgroundColor: Colors.tertiary
//     },
//     headerTintColor: Colors.primary,
//     // mode: 'modal'
//   }

// }


