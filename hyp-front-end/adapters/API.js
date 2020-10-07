const apiEndpoint = "http://localhost:3000";
const usersUrl = `${apiEndpoint}/users`;
const postsUrl = `${apiEndpoint}/posts`;
const searchUrl = `${apiEndpoint}/posts/search`;
const setCurrentUserUrl = `${apiEndpoint}/set_current_user`;
const googleSignInUrl = `${usersUrl}/googleSignIn`;
const commentsUrl = `${apiEndpoint}/comments`;
import { AsyncStorage } from "react-native";

const jsonify = (res) => res.json();

const handleErrors = (response) => {
  if (!response.ok) {
    const commentsUrl = `${apiEndpoint}/comments`;
    throw Error(response.statusText);
  } else {
    return response;
  }
};

const constructHeaders = async (moreHeaders = {}) => {
  const token = await AsyncStorage.getItem("token");
  return {
    ...moreHeaders,
    Authorization: `Bearer ${token}`,
  };
};

const getAllPosts = () => {
  return fetch(postsUrl).then(jsonify);
};

const createPost = (post, url, id) => {
  return fetch("http://localhost:3000/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      post: post,
      url: url,
      id: id,
    }),
  }).then(jsonify);
};

const getPostData = (postId) => {
  return fetch(`${postsUrl}/${postId}`).then(jsonify);
};

const followUser = async (user_id, followedUser) => {
  const user = await fetch("http://localhost:3000/users/follow-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: user_id,
      followedUser: followedUser,
    }),
  }).then(jsonify);
  return user;
};

const unFollowUser = async (user_id, followedUser) => {
  const user = await fetch("http://localhost:3000/users/unfollow-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: user_id,
      followedUser: followedUser,
    }),
  }).then(jsonify);
  return user;
};

const getUsersPosts = async (userId) => {
  const posts = await fetch(`http://localhost:3000/posts/user/${userId}`).then(
    jsonify
  );
  return posts;
};

const getPostSearchResults = (tag) => {
  return fetch(searchUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tag }),
    redirect: "manual",
  }).then(jsonify);
};

const getGeoSearchResults = (input, location) => {
  return fetch("http://localhost:3000/posts/search/geo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input, location }),
    redirect: "manual",
  }).then(jsonify);
};

const addNewComment = (comment, postId, user_id) => {
  return fetch(commentsUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      comment: comment,
      post_id: postId,
      user_id: user_id,
    }),
  }).then(jsonify);
};

const signInWithGoogle = async (idToken) => {
  let headers = await constructHeaders({ "Content-Type": "application/json" });
  return fetch(googleSignInUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({ idToken }),
  })
    .then(jsonify)
    .catch((e) => console.log("error :", e));
};

const getUsers = async () => {
  let headers = await constructHeaders();
  return fetch(usersUrl, { headers })
    .then(handleErrors)
    .then(jsonify)
    .catch((e) => console.log("error in get users on client: ", e));
};

const setCurrentUser = (token) => {
  return fetch(setCurrentUserUrl, {
    method: "POST",
    headers: constructHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(token),
  }).then(jsonify);
};

const getOneUser = (user) => {
  return fetch(`http://localhost:3000/users/${user._id}`, {
    method: "GET",
  }).then(jsonify);
};

const getCurrentUser = () => {
  return fetch("http://localhost:3000/users/5f1592e9760fe0473fec1fe0", {
    method: "GET",
  }).then(jsonify);
};

const findusers = (input) => {
  return fetch("http://localhost:3000/users/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      searchInput: input,
    }),
  }).then(jsonify);
};

export default {
  getCurrentUser,
  getAllPosts,
  getPostData,
  createPost,
  getUsersPosts,
  setCurrentUser,
  addNewComment,
  getPostSearchResults,
  signInWithGoogle,
  getUsers,
  followUser,
  unFollowUser,
  getOneUser,
  findusers,
  getGeoSearchResults,
};
