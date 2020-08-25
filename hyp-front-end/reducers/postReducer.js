import {
  FETCH_ALL_POSTS,
  NEW_POST,
  HANDLE_SEARCH,
  HANDLE_SEARCHED_POSTS,
  COMMENT_HANDLER,
  HANDLE_LOGGED_USER,
  HANDLE_FOLLOW_SWITCH,
  HANDLE_SHOW_FOLLOWERS,
  HANDLE_SHOW_FOLLOWED,
  HANDLE_FOLLOW_ACTION,
  HANDLE_UNFOLLOW_ACTION,
} from "../actions/types";

const initialState = {
  allPosts: [],
  item: {},
  searchInput: "",
  commentInput: "",
  searchedPosts: [],
  user: {},
  shownUser: {},
  friendsDisplay: "followers",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_POSTS:
      return {
        ...state,
        allPosts: action.payload,
      };
    case NEW_POST:
      return {
        ...state,
        item: action.payload,
      };
    case HANDLE_SEARCH:
      return {
        ...state,
        searchInput: action.payload,
      };
    case HANDLE_SEARCHED_POSTS:
      return {
        ...state,
        searchedPosts: action.payload,
      };
    case COMMENT_HANDLER:
      return {
        ...state,
        commentInput: action.payload,
      };
    case HANDLE_LOGGED_USER:
      return {
        ...state,
        user: action.payload,
      };
    case HANDLE_FOLLOW_SWITCH:
      return {
        ...state,
        showFollowers: !state.showFollowers,
      };
    case HANDLE_SHOW_FOLLOWERS:
      return {
        ...state,
        friendsDisplay: "followers",
      };
    case HANDLE_SHOW_FOLLOWED:
      return {
        ...state,
        friendsDisplay: "followed",
      };
    case HANDLE_FOLLOW_ACTION:
      return {
        ...state,
        user: action.payload,
      };
    case HANDLE_UNFOLLOW_ACTION:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
