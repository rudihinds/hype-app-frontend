

// const apiEndpoint = 'https://bbc9d876.ngrok.io'
const apiEndpoint = 'http://localhost:3000'
const usersUrl = `${apiEndpoint}/users`
const loginUrl = `${apiEndpoint}/login`
const validateUrl = `${apiEndpoint}/validate`
const postsUrl = `${apiEndpoint}/posts`
// const searchUrl = `${apiEndpoint}/search`
const setCurrentUserUrl = `${apiEndpoint}/set_current_user`
const searchUrl = `${apiEndpoint}/searchposts`
const usersPostsUrl = `${apiEndpoint}/getUsersPosts`
const googleSignInUrl = `${usersUrl}/googleSignIn`
import { AsyncStorage } from 'react-native'


const jsonify = res => res.json()

const handleErrors = response => {
  if (!response.ok) {
    throw Error(response.statusText)
  } else {
    return response
  }
}

const constructHeaders = async (moreHeaders = {}) => {
  const token = await AsyncStorage.getItem('token')
  return {
    ...moreHeaders,
    Authorization: `Bearer ${token}`
  }
}

const getAllPosts = () => {
  return fetch(postsUrl).then(jsonify)
}

const createPost = post => {
  let headers = new Headers()
  headers.append('Accept', 'application/json')
  let request = new Request(postsUrl, {
    method: 'POST',
    headers: headers,
    body: post
  })
  fetch(request)
    .then(jsonify)
}

const getPostData = postId => {
  return fetch(`${postsUrl}/${postId}`).then(jsonify)
}

const getUsersPosts = userId => {
  return fetch(`${usersPostsUrl}/${userId}`).then(jsonify)
}

const getPostSearchResults = tag => {
  console.log(tag)
  return fetch(searchUrl, {
    method: 'POST',
    headers: constructHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ tag }),
    redirect: 'manual'
  }).then(jsonify)
}

const addNewComment = (comment, postId) => {
  return fetch(`${postsUrl}/${postId}`, {
    method: 'PATCH',
    headers: constructHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ comment }),
    redirect: 'manual'
  }).then(jsonify)
}

const signInWithGoogle = async (idToken) => {
  let headers = await constructHeaders({ 'Content-Type': 'application/json' })
  return fetch(googleSignInUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify({ idToken })
  }).then(jsonify)
    .catch(e => console.log('error :', e))
}

const getUsers = async () => {
  let headers = await constructHeaders()
  return fetch(usersUrl, { headers })
    .then(handleErrors)
    .then(jsonify)
    .catch(e => console.log('error in get users on client: ', e))
}

const setCurrentUser = token => {

  return fetch(setCurrentUserUrl, {
    method: 'POST',
    headers: constructHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(token)
  }).then(jsonify)
}

export default {
  getAllPosts,
  getPostData,
  createPost,
  getUsersPosts,
  setCurrentUser,
  addNewComment,
  getPostSearchResults,
  signInWithGoogle,
  getUsers
}