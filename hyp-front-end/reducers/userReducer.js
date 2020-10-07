import {
  HANDLE_LOGGED_USER,
  HANDLE_USER_SEARCH,
  HANDLE_SHOW_FOLLOWERS,
  HANDLE_SHOW_FOLLOWED,
  HANDLE_FOLLOW_ACTION,
  HANDLE_UNFOLLOW_ACTION,
  HANDLE_USER_SEARCH_INPUT,
  HANDLE_FOLLOW_SWITCH,
} from "../actions/types";

const initialState = {
  user: {},
  shownUser: {},
  searchedUsers: {},
  searchUserInput: "",
  friendsDisplay: "followers",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_LOGGED_USER:
      return {
        ...state,
        user: action.payload,
      };
    case HANDLE_USER_SEARCH:
      return {
        ...state,
        searchedUsers: action.payload,
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
    case HANDLE_USER_SEARCH_INPUT:
      return {
        ...state,
        searchUserInput: action.payload,
      };
    case HANDLE_FOLLOW_SWITCH:
      return {
        ...state,
        showFollowers: !state.showFollowers,
      };
    default:
      return {
        ...state,
      };
  }
};
