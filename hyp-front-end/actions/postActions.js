import API from '../adapters/API'
import { FETCH_ALL_POSTS, NEW_POST } from './types'

export const getAllPosts = () => async dispatch => {
  console.log('get all posts action hit');

  const allPosts = await API.getAllPosts()
  dispatch({ type: FETCH_ALL_POSTS, payload: allPosts })
}

export const createPost = post => dispatch => {
  fetch('http://localhost:3000/posts', {
    method: 'POST',
    body: JSON.stringify(post),
    headers: { 'Content-type': "Application/json" }
  })
    .then(res => res.json())
    .then(data => dispatch({ type: NEW_POST, payload: data }))

  // .then(post => dispatch({
  //   type: NEW_POST,
  //   payload: post
  // }))
}


