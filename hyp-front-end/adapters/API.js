const apiEndpoint = 'http://localhost:3000'
const usersUrl = `${apiEndpoint}/users`
const loginUrl = `${apiEndpoint}/login`
const validateUrl = `${apiEndpoint}/validate`
const postsUrl = `${apiEndpoint}/posts`
const searchUrl = `${apiEndpoint}/search`


const jsonify = res => {
  return res.json()     
}

const handleServerError = response => {
  console.log('handle error: ', response)
  return {errors: response.errors}
}

const constructHeaders = (moreHeaders = {}) => (
  {
      ...moreHeaders
  }
)

const getPosts = () => {
  return fetch(postsUrl).then(jsonify)
}

const getPostData = postId => {
  return fetch(`${postsUrl}/${postId}`).then(jsonify)
}

const addNewComment = (comment, postId) => {
  return fetch(`${postsUrl}/${postId}`, {
    method: 'PATCH',
    headers: constructHeaders({'Content-Type': 'application/json'}),
    body: JSON.stringify({ comment }),
    redirect: 'manual'
  }).then(jsonify)
}

export default {
  getPosts,
  addNewComment,
  getPostData
}