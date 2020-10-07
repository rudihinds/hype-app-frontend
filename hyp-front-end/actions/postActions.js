import API from "../adapters/API";
import {
  FETCH_ALL_POSTS,
  NEW_POST,
  HANDLE_SEARCH,
  HANDLE_GEO_SEARCH,
  COMMENT_HANDLER,
  HANDLE_SEARCHED_POSTS,
  HANDLE_CHOSEN_POST,
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

export const geoSearchHandler = (input) => {
  return {
    type: HANDLE_GEO_SEARCH,
    payload: input,
  };
};

export const commentHandler = (input) => {
  console.log(input);
  return {
    type: COMMENT_HANDLER,
    payload: input,
  };
};

export const searchResultsHandler = (posts) => {
  return {
    type: HANDLE_SEARCHED_POSTS,
    payload: posts,
  };
};

export const storePost = (post) => {
  return {
    type: HANDLE_CHOSEN_POST,
    payload: post,
  };
};
