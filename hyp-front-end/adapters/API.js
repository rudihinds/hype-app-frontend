

// const apiEndpoint = 'https://bbc9d876.ngrok.io'
const apiEndpoint = 'http://localhost:3000'
const usersUrl = `${apiEndpoint}/users`
const loginUrl = `${apiEndpoint}/login`
const validateUrl = `${apiEndpoint}/validate`
const postsUrl = `${apiEndpoint}/posts`
<<<<<<< HEAD
const searchUrl = `${apiEndpoint}/search`
const setCurrentUserUrl = `${apiEndpoint}/set_current_user`
// const token = firebase.auth().currentUser.getIdToken(true).then(token => token)

=======
const searchUrl = `${apiEndpoint}/searchposts`
const usersPostsUrl = `${apiEndpoint}/getUsersPosts` 
>>>>>>> 5897cde72d38aefba8c59dfcfe73b26ed1c415c5

const jsonify = res => {
  return res.json()
}

const handleServerError = response => {
  console.log('handle error: ', response)
  return { errors: response.errors }
}

const constructHeaders = (moreHeaders = {}) => (
  {
    ...moreHeaders
  }
)

const getPosts = () => {
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

const addNewComment = (comment, postId) => {
  return fetch(`${postsUrl}/${postId}`, {
    method: 'PATCH',
    headers: constructHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ comment }),
    redirect: 'manual'
  }).then(jsonify)
}

<<<<<<< HEAD
const setCurrentUser = token => {

  return fetch(setCurrentUserUrl, {
    method: 'POST',
    headers: constructHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(token)
  }).then(jsonify)
=======
const getUsersPosts = userId => {
  return fetch(`${usersPostsUrl}/${userId}`).then(jsonify)
}

const getPostSearchResults = tag => {
  return fetch(searchUrl, {
    method: 'POST',
    headers: constructHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ tag }),
    redirect: 'manual'
  }).then(jsonify)

>>>>>>> 5897cde72d38aefba8c59dfcfe73b26ed1c415c5
}

export default {
  getPosts,
  addNewComment,
  getPostData,
  createPost,
<<<<<<< HEAD
  setCurrentUser
=======
  getUsersPosts,
  getPostSearchResults
>>>>>>> 5897cde72d38aefba8c59dfcfe73b26ed1c415c5
}