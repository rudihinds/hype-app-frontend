
// const apiEndpoint = 'https://bbc9d876.ngrok.io'
const apiEndpoint = 'http://localhost:3000'
const usersUrl = `${apiEndpoint}/users`
const loginUrl = `${apiEndpoint}/login`
const validateUrl = `${apiEndpoint}/validate`
const postsUrl = `${apiEndpoint}/posts`
const searchUrl = `${apiEndpoint}/searchposts`
const usersPostsUrl = `${apiEndpoint}/getUsersPosts` 

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

}

export default {
  getPosts,
  addNewComment,
  getPostData,
  createPost,
  getUsersPosts,
  getPostSearchResults
}