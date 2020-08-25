// const apiEndpoint = 'https://bbc9d876.ngrok.io'
const apiEndpoint = "http://localhost:3000";
const usersUrl = `${apiEndpoint}/users`;
const loginUrl = `${apiEndpoint}/login`;
const validateUrl = `${apiEndpoint}/validate`;
const postsUrl = `${apiEndpoint}/posts`;
const searchUrl = `${apiEndpoint}/posts/search`;
const setCurrentUserUrl = `${apiEndpoint}/set_current_user`;
const usersPostsUrl = `${apiEndpoint}/user`;
const googleSignInUrl = `${usersUrl}/googleSignIn`;
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

// const createPost = (post) => {
//   let headers = new Headers();
//   headers.append("Accept", "application/json");
//   let request = new Request(postsUrl, {
//     method: "POST",
//     headers: headers,
//     body: post,
//   });
//   fetch(request).then(jsonify);
// };

const createPost = (video_url) => {
  return fetch("http://localhost:3000/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      video_url: video_url,
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
  console.log(userId);
  // return fetch(`${usersPostsUrl}/${userId}`).then(jsonify);
  const posts = await fetch(`http://localhost:3000/posts/user/${userId}`).then(
    jsonify
  );
  return posts;
  // const thePosts = await posts.jsonify();
  // console.log(thePosts);
};

const getPostSearchResults = (tag) => {
  return fetch(searchUrl, {
    method: "POST",
    headers: constructHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ tag }),
    redirect: "manual",
  }).then(jsonify);
};

const addNewComment = (comment, postId) => {
  return fetch(commentsUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      comment: comment,
      post_id: postId,
      user_id: "5e861dd8acaac86fbd704cc1",
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
};
