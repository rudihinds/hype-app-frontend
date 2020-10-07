import {
  FETCH_ALL_POSTS,
  NEW_POST,
  HANDLE_SEARCH,
  HANDLE_SEARCHED_POSTS,
  COMMENT_HANDLER,
  HANDLE_CHOSEN_POST,
  HANDLE_GEO_SEARCH,
} from "../actions/types";

const initialState = {
  allPosts: [],
  item: {},
  searchInput: "",
  geoSearchInput: "",
  commentInput: "",
  searchedPosts: [],
  shownUser: {},
  friendsDisplay: "followers",
  chosenPost: {},
  post: {
    title: "yolo",
    caption: "yolo2",
    latitude: null,
    longitude: null,
    tags: {
      tag: "",
      tagsArray: ["blood", "floods", "your", "dungarees"],
    },
    captures: {},
    preview: null,
    userId: 1,
    uri: "",
  },
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
    case COMMENT_HANDLER:
      return {
        ...state,
        commentInput: action.payload,
      };
    case HANDLE_SEARCHED_POSTS:
      return {
        ...state,
        searchedPosts: action.payload,
      };
    case HANDLE_CHOSEN_POST:
      return {
        ...state,
        chosenPost: action.payload,
      };
    case HANDLE_GEO_SEARCH:
      return {
        ...state,
        geoSearchInput: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
