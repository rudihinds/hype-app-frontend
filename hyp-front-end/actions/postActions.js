import API from "../adapters/API";
import {
  FETCH_ALL_POSTS,
  NEW_POST,
  HANDLE_SEARCH,
  HANDLE_COMMENT,
  HANDLE_SEARCHED_POSTS,
  HANDLE_LOGGED_USER,
  HANDLE_SHOW_FOLLOWERS,
  HANDLE_SHOW_FOLLOWED,
  HANDLE_FOLLOW_ACTION,
  HANDLE_UNFOLLOW_ACTION,
} from "./types";

export const getAllPosts = () => async (dispatch) => {
  console.log("get all posts action hit");

  const allPosts = await API.getAllPosts();
  dispatch({ type: FETCH_ALL_POSTS, payload: allPosts });
};

export const createPost = (post) => (dispatch) => {
  fetch("http://localhost:3000/posts", {
    method: "POST",
    body: JSON.stringify(post),
    headers: { "Content-type": "Application/json" },
  })
    .then((res) => res.json())
    .then((data) => dispatch({ type: NEW_POST, payload: data }));

  // .then(post => dispatch({
  //   type: NEW_POST,
  //   payload: post
  // }))
};
export const searchHandler = (input) => {
  return {
    type: HANDLE_SEARCH,
    payload: input,
  };
};

export const commentHandler = (input) => {
  return {
    type: HANDLE_COMMENT,
    payload: input,
  };
};

export const searchResultsHandler = (posts) => {
  return {
    type: HANDLE_SEARCHED_POSTS,
    payload: posts,
  };
};

export const saveUser = (user) => {
  return {
    type: HANDLE_LOGGED_USER,
    payload: user,
  };
};

export const showFollowers = () => {
  return {
    type: HANDLE_SHOW_FOLLOWERS,
  };
};

export const showFollowed = () => {
  return {
    type: HANDLE_SHOW_FOLLOWED,
  };
};

export const addFollowers = (user) => {
  return {
    type: HANDLE_FOLLOW_ACTION,
    payload: user,
  };
};

export const unFollow = (user) => {
  return {
    type: HANDLE_UNFOLLOW_ACTION,
    payload: user,
  };
};

export const follow = (user) => {
  return {
    type: HANDLE_FOLLOW_ACTION,
    payload: user,
  };
};

// export const swithFollowers = () => {
//   return {
//     type: HANDLE_FOLLOW_SWITCH,
//   };
// };
